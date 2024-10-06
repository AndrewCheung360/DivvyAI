import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
 createViewDay,
 createViewMonthAgenda,
 createViewMonthGrid,
 createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import '../../app/globals.css'
import {useEffect} from 'react'

export default function CalendarApp() {
 const plugins = [createEventsServicePlugin()]
 const calendar = useCalendarApp({
   views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
   events: [
     {
       id: '1',
       title: 'Event 1',
       start: '2024-10-05 20:00',
       end: '2024-10-05 22:00',
     },
   ],
 }, plugins)
 useEffect(() => {
   // get all events
   calendar.eventsService.getAll()
 }, [])
 return (
   <div>
     <ScheduleXCalendar calendarApp={calendar} />
   </div>
 )
}
