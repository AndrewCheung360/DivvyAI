'use server'
import { clerkClient } from '@clerk/nextjs/server'
import { google } from 'googleapis'
import { calculateDurationInMinutes } from './utils'
import { format } from 'date-fns'

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

function formatTo12HourTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
    
    return `${hours}:${minutesStr} ${ampm}`;
  }
  

export async function getAllCalendarEvents(clerkUserId: string, timeMin?: Date, timeMax?: Date) {
    const oAuthClient = await getOAuthClient(clerkUserId);
    if (!oAuthClient) {
        return null; // Return early if OAuth client is not available
    }

    const calendar = google.calendar({ version: 'v3', auth: oAuthClient });

    // Prepare the request parameters
    const params: any = {
        calendarId: 'primary',
        singleEvents: true, // Expands recurring events into individual instances
        orderBy: 'startTime', // Sort events by start time
    };

    // Set the time range if provided
    if (timeMin) {
        params.timeMin = timeMin.toISOString();
    }
    if (timeMax) {
        params.timeMax = timeMax.toISOString();
    }

    // Fetch all events
    const events = [];
    let pageToken: string | undefined;

    do {
        const response = await calendar.events.list({
            ...params,
            pageToken: pageToken, // Handle pagination
        });

        if (response.data.items) {
            // events.push(...response.data.items.map((event) => ({
            //     summary: event.summary || 'No Title',
            //     description: event.description || 'No Description',
            //     start: event.start?.dateTime || event.start?.date,
            //     end: event.end?.dateTime || event.end?.date,
            // })));
            events.push(...response.data.items.map((event) => ({
                title: event.summary || 'No Title',
                startTime: formatTo12HourTime(new Date(event.start?.dateTime ?? event.start?.date ?? '')),
                endTime: formatTo12HourTime(new Date(event.end?.dateTime ?? event.end?.date ?? '')),
                day: new Date(event.start?.dateTime ?? event.start?.date ?? ''),
                color: "bg-[#D8FFD9]"
            })));
        }

        pageToken = response.data.nextPageToken ?? undefined; // Check for the next page token
    } while (pageToken);

    console.log(events)
    return events;
}

export async function packQuestionsIntoFreeSlots(
    questions: [string, number][], // [question, duration in minutes]
    clerkUserId: string,
    timeMin: Date,
    timeMax: Date,
    assignmentName: string,
    assignmentId: string,
    description: string,
) {
    const freeTimes = await getFreeTimeSlots({ clerkUserId, timeMin, timeMax });
    if (!freeTimes || freeTimes.length === 0) {
        return;
    }

    let currentQuestionIndex = 0;

    const events = []

    for (const freeTime of freeTimes) {
        let freeDuration = calculateDurationInMinutes(freeTime.start, freeTime.end);

        while (freeDuration > 0 && currentQuestionIndex < questions.length) {
            const [question, questionDuration] = questions[currentQuestionIndex];

            // If the free time can fit the current question
            if (questionDuration <= freeDuration) {
                const eventStart = freeTime.start;
                const eventEnd = new Date(eventStart.getTime() + questionDuration * 60 * 1000);

                await createCalendarEvent({
                    event: {
                        summary: `${assignmentName} - ${question}`,
                        description: description,
                        start: eventStart,
                        end: eventEnd
                    },
                    clerkUserId: clerkUserId
                });

                const event = {
                    title: `${assignmentName} - ${question}`,
                    startTime: formatTo12HourTime(eventStart),
                    endTime: formatTo12HourTime(eventEnd),
                    day: eventStart,
                    color: "bg-[#D8FFD9]"
                }
                events.push(event)

                // Add the subtask to supabase
                // const subtask = await fetch(`/api/subtask?assignment_id=${assignmentId}`, {
                //     method: "POST",
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         name: `${assignmentName} - ${question}`,
                //         notes: description,
                //         start_time: eventStart.toISOString(),
                //         end_time: eventEnd.toISOString(),
                //         assignment_id: assignmentId
                //     })
                // });

                // Update freeDuration and move to next question
                freeDuration -= questionDuration;
                freeTime.start = eventEnd;
                currentQuestionIndex++;
            } else {
                break; // If the current free slot can't fit the question, move to next free time
            }
        }

        // If all questions are packed, exit early
        if (currentQuestionIndex >= questions.length) {
            break;
        }
    }

    // Return true if all questions were packed, false if some were left unassigned
    // return currentQuestionIndex === questions.length;
    return events
}