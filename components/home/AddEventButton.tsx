'use client'
import React from "react";
import { createCalendarEvent, getFreeTimeSlots } from "@/utils/calActions";

type AddEventButtonProps = {
    clerkId: string
}

export default function AddEventButton({clerkId}: AddEventButtonProps) {
  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick = {() =>{
        // createCalendarEvent({
        //   event: {
        //     summary: "Test Event",
        //     description: "This is a test event",
        //     start: new Date(),
        //     end: new Date("2024-10-05T23:24:00"),
        //   },
        //   clerkUserId: clerkId
        // })
        getFreeTimeSlots({
          clerkUserId: clerkId,
          timeMin: new Date(),
          timeMax: new Date("2024-10-10T23:24:00")
        })

      }}
      >
        Button
      </button>
    </div>
  );
}