'use server'
import { clerkClient } from '@clerk/nextjs/server'
import { google } from 'googleapis'
import { calculateDurationInMinutes } from './utils'


export type CalendarEvent = {
    summary: string,
    description: string,
    start: Date,
    end: Date,
}
export type CreateCalendarEventType = {
    event: CalendarEvent,
    clerkUserId: string
}

export type FreeTimeQueryType = {
    clerkUserId: string,
    timeMin: Date,
    timeMax: Date
}


async function getOAuthClient(clerkUserId: string) {
    const token = await clerkClient().users.getUserOauthAccessToken(
      clerkUserId,
      "oauth_google"
    )
  
    if (token.data.length === 0 || token.data[0].token == null) {
      return
    }
  
    const client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REDIRECT_URL
    )
  
    client.setCredentials({ access_token: token.data[0].token })
  
    return client
}

export async function createCalendarEvent(event : CreateCalendarEventType){
    const oAuthClient = await getOAuthClient(event.clerkUserId)
    if (!oAuthClient) {
        return
    }
    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const calendarEvent = await google.calendar("v3").events.insert({
        calendarId: "primary",
        requestBody: {
            summary: event.event.summary,
            description: event.event.description,
            start: {
                dateTime: event.event.start.toISOString(),
                timeZone: currentTimeZone,
            },
            end: {
                dateTime: event.event.end.toISOString(),
                timeZone: currentTimeZone,
            },
        },
        auth: oAuthClient,
    })
    console.log(calendarEvent.data)
    return calendarEvent.data
}

export async function getFreeTimeSlots(query: FreeTimeQueryType){
    const oAuthClient = await getOAuthClient(query.clerkUserId);
    if (!oAuthClient) {
        return null; // Return early if OAuth client is not available
    }

    const calendar = google.calendar({ version: 'v3', auth: oAuthClient });

    // Get list of all user calendars
    const calendarList = await calendar.calendarList.list();
    const calendars = calendarList.data.items || [];

    // Collect calendar IDs (including the primary calendar)
    const calendarIds = calendars.map(cal => cal.id);

    // Make a free/busy query for all calendars
    const response = await calendar.freebusy.query({
        requestBody: {
            timeMin: query.timeMin.toISOString(),
            timeMax: query.timeMax.toISOString(),
            items: calendarIds.map(id => ({ id }))
        }
    });

    // Collect busy times across all calendars
    const allBusyTimes: { start: string, end: string }[] = [];
    calendarIds.forEach(id => {
        const busyTimes = (id && response.data.calendars && response.data.calendars[id]?.busy) || [];
        allBusyTimes.push(...busyTimes.filter(busy => busy.start && busy.end && typeof busy.start === 'string' && typeof busy.end === 'string') as { start: string, end: string }[]);
    });

    // Sort busy times by start date
    allBusyTimes.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    const freeTimes: { start: Date, end: Date }[] = [];
    let currentTime = query.timeMin.getTime();
    const endTime = query.timeMax.getTime();

    // Merge busy times and calculate free slots
    for (const busySlot of allBusyTimes) {
        const busyStart = new Date(busySlot.start).getTime();
        const busyEnd = new Date(busySlot.end).getTime();

        // If there's a gap between current time and the start of the busy period, add a free time slot
        if (currentTime < busyStart) {
            freeTimes.push({
                start: new Date(currentTime),
                end: new Date(busyStart)
            });
        }

        // Update the current time to the end of the busy period
        currentTime = Math.max(currentTime, busyEnd);
    }

    // Add any remaining free time after the last busy period
    if (currentTime < endTime) {
        freeTimes.push({
            start: new Date(currentTime),
            end: new Date(endTime)
        });
    }
    return freeTimes;
}