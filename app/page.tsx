'use client'
import { useState, useEffect } from "react";
import AddButton from "@/components/home/AddButton";
import ImportScheduleButton from "@/components/home/ImportScheduleButton";
import SideBar from "@/components/home/SideBar";
import Scheduler, { Event } from "@/components/home/Scheduler";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Index() {

  const { isLoaded, userId, sessionId, getToken } = useAuth()

  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
      console.log("Use Effect Running")
      console.log(events)
  }, [events])

  return (
    <>
    <div className = "grid grid-cols-5 w-screen h-screen">
      <div className="col-span-1 z-0">
        <SideBar/>
      </div>

      <div className="col-span-4 h-screen z-40">
        <div className="flex flex-row justify-end pt-4 gap-x-4 pr-10">
          <AddButton events = {events} setEvents={setEvents}/>
          {/* Import Calendar Button */}
          <ImportScheduleButton clerkId={userId!} events={events} setEvents={setEvents}/>
          <UserButton />
        </div>

        <div className="pt-4 px-8">
          {/* Calendar */}
          <Scheduler events = {events} />
        </div>
        
      </div>
    </div>
    </>
  )
}
