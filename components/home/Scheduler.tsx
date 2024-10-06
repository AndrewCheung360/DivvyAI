import React, { useState, useEffect } from "react";

// Modal Component
interface ModalProps {
  show: boolean;
  onClose: () => void;
  event: Event | null;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, event }) => {
  if (!show || !event) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-2">{event.title}</h2>
        <p>
          {event.startTime} - {event.endTime}
        </p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Helper function to get the current week and month
const getCurrentWeek = (): Date[] => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek); // Start of current week (Sunday)
  
  const weekDays = Array.from({ length: 7 }, (_, idx) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + idx);
    return day;
  });

  return weekDays;
};

// Helper function to format the date and month
const formatDate = (date: Date) => {
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dayOfMonth = date.getDate();
  return { weekday, dayOfMonth };
};

export interface Event {
  title: string;
  startTime: string;
  endTime: string;
  day: Date; // Date object representing the exact day
  color: string;
}

type SchedulerType = {
  events: Event[];
}

export default function Scheduler({events = []} : SchedulerType) {
  // const [events, setEvents] = useState<Event[]>([
  //   { title: "CS: 4780", startTime: "09:00 AM", endTime: "10:30 AM", day: new Date('2024-10-07'), color: "bg-[#FFD8D8]" },
  //   { title: "Question #1", startTime: "11:00 AM", endTime: "01:30 PM", day: new Date('2024-10-07'), color: "bg-[#FEFE91]" },
  //   { title: "INFO: 4125", startTime: "10:00 AM", endTime: "12:40 PM", day: new Date('2024-10-08'), color: "bg-[#D8FFD9]" },
  //   { title: "INFO: 2040", startTime: "10:00 AM", endTime: "12:40 PM", day: new Date('2024-10-09'), color: "bg-[#D8F9FF]" },
  // ]);


  const [week, setWeek] = useState(getCurrentWeek());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Ensure events is always an array
  const safeEvents = Array.isArray(events) ? events : [];

  // Times from 9 AM to 11 PM, properly switching from AM to PM
  const hours = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 8;
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour} ${ampm}`;
  });

  const handleNextWeek = () => {
    setWeek(week.map((day) => new Date(day.setDate(day.getDate() + 7))));
  };

  const handlePreviousWeek = () => {
    setWeek(week.map((day) => new Date(day.setDate(day.getDate() - 7))));
  };

  const isSameDay = (eventDate: Date, day: Date) =>
    eventDate.getDate() === day.getDate() &&
    eventDate.getMonth() === day.getMonth() &&
    eventDate.getFullYear() === day.getFullYear();

  const isToday = (day: Date) =>
    currentTime.getDate() === day.getDate() &&
    currentTime.getMonth() === day.getMonth() &&
    currentTime.getFullYear() === day.getFullYear();

  // Update the current time every minute
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentTimeOffset = (): number => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const totalMinutes = currentHour * 60 + currentMinute;
    return ((totalMinutes - 9 * 60) / (15 * 60)) * 100; // assuming calendar starts at 9 AM
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleGoToCurrentWeek = () => {
    setWeek(getCurrentWeek());
  };
  

  return (
    <div className="max-w-7xl mx-auto p-14 rounded-3xl shadow-2xl ">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row gap-x-6 items-center">
          <div className="transition-transform duration-200 hover:scale-125 hover:cursor-pointer" onClick={handleGoToCurrentWeek}><svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-calendar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M11 15h1" /><path d="M12 15v3" /></svg></div>
          <h2 className="text-3xl font-bold tracking-wider">My schedule</h2>
        </div>
        <div className="flex items-center">
          <h3 className="text-2xl font-thin tracking-wider mr-4">{week[0].toLocaleString('default', { month: 'long' })} {week[0].getFullYear()}</h3>
          <button className="transition-transform duration-200 hover:scale-125 hover:cursor-pointer" onClick={handlePreviousWeek}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>          
          </button>
          <button className="transition-transform duration-200 hover:scale-125 hover:cursor-pointer" onClick={handleNextWeek}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
          </button>
        </div>
      </div>

      {/* Days of the Week with Dates */}
      <div className="grid grid-cols-8 mt-10 text-center rounded-t-2xl bg-[#D7F066] border border-black"
      style={{ gridTemplateColumns: '0.4fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}
      >
        <div className="bg-transparent"></div>
        {week.map((day, idx) => {
        const { weekday, dayOfMonth } = formatDate(day);

        return (
          <div key={idx} className="pt-4 pb-5 flex flex-row justify-center items-center gap-x-1 font-semibold border-r-2 border-[#F4F4F4]">
            <div className="font-thin text-lg">{weekday}</div> {/* Weekday class */}
            <div className="text-lg">{dayOfMonth}</div> {/* Date class */}
          </div>
        );
      })}
      </div>

      {/* Calendar Body with Hours */}
      <div className="grid grid-cols-8 h-[60vh] overflow-auto"
            style={{ gridTemplateColumns: '0.4fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}
>
        {/* Times on the Left Side */}
        <div className="border-r border-[#F4F4F4]">
          {hours.map((hour, idx) => (
              <div key={idx} className="flex border-l justify-center border-[#F4F4F4]  h-32 text-sm "
              style={{ visibility: idx === 0 ? "hidden" : "visible", transform: 'translateY(-7px)' }}>
                {hour}
              </div>
          ))}
        </div>

        {/* Days and Events */}
        {week.map((day, dayIdx) => (
          <div key={dayIdx} className="border-r border-[#F4F4F4] relative">
            {Array.from({ length: 15 }).map((_, idx) => (
              <div key={idx} className="h-32 border-t border-[#F4F4F4]"></div>
            ))}

            {/* Render Events */}
            {safeEvents
              .filter(event => isSameDay(event.day, day))
              .map((event, eventIdx) => (
                <div
                  key={eventIdx}
                  className={`absolute left-1 right-1 ${event.color} p-2 text-sm rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105`}
                  style={{
                    top: `${getTimeOffset(event.startTime)}%`,
                    height: `${getEventHeight(event.startTime, event.endTime)}%`,
                  }}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="font-bold">{event.title}</div>
                  <div className="text-xs mt-2">{event.startTime} - {event.endTime}</div>
                </div>
              ))}

            {/* Current Time Line (only for today) */}
            {isToday(day) && (
              <div
                className="absolute left-0 right-0 h-[2px] bg-red-500"
                style={{ top: `${getCurrentTimeOffset()}%` }}
              >
                <div className="absolute left-0 -top-[4px] h-3 w-3 bg-red-500 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Event Details */}
      <Modal show={showModal} onClose={() => setShowModal(false)} event={selectedEvent} />
    </div>
  );
}

// Helper function to calculate event top offset based on start time
function getTimeOffset(time: string): number {
  const [hour, minute, ampm] = time.split(/[: ]/);
  let hourNum = parseInt(hour, 10);
  if (ampm === 'PM' && hourNum < 12) hourNum += 12;
  const totalMinutes = hourNum * 60 + parseInt(minute, 10);
  return ((totalMinutes - 8 * 60) / (15 * 60)) * 100; // assuming calendar starts at 9 AM
}

// Helper function to calculate event height based on duration
function getEventHeight(startTime: string, endTime: string): number {
  const [startHour, startMinute, startAmpm] = startTime.split(/[: ]/);
  const [endHour, endMinute, endAmpm] = endTime.split(/[: ]/);

  let startHourNum = parseInt(startHour, 10);
  let endHourNum = parseInt(endHour, 10);

  if (startAmpm === 'PM' && startHourNum < 12) startHourNum += 12;
  if (endAmpm === 'PM' && endHourNum < 12) endHourNum += 12;

  const startTotalMinutes = startHourNum * 60 + parseInt(startMinute, 10);
  const endTotalMinutes = endHourNum * 60 + parseInt(endMinute, 10);

  const durationMinutes = endTotalMinutes - startTotalMinutes;
  return (durationMinutes / (15 * 60)) * 100; // assuming calendar covers 15 hours
}
