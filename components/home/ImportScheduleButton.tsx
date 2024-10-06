"use client"
import React from "react"
import Image from "next/image"
import UploadIcon from "../../public/upload.svg"
import { getAllCalendarEvents } from "@/utils/calActions"
import { Event } from "../../components/home/Scheduler"

type ImportScheduleButtonProps = {
    clerkId: string,
    events: Event[],
    setEvents: React.Dispatch<React.SetStateAction<any>>
}


export default function ImportScheduleButton({clerkId, events, setEvents}: ImportScheduleButtonProps) {
    return (
        <button className = "w-[262px] h-[66px] bg-[#F4F4F4] rounded-[50px] flex justify-center items-center border-2 border-[#141414] gap-x-3 hover:bg-[#D7F066] transition-transform duration-200 hover:scale-110 hover:cursor-pointer group"
            onClick = {() => {
                getAllCalendarEvents(clerkId).then((res) => {
                    if (res) {
                        setEvents([...events, ...res])
                    }
                }
                )
            }}
        >
            <div>
                <Image className="group-hover:animate-bounce" src={UploadIcon} alt="Upload Icon" width={20} height={20} />
            </div>
            <span className="text-[#141414] text-lg font-light">
                Import schedule
            </span>
        </button>
    )
}
