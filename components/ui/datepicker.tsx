"use client"

import * as React from "react"
import { format, set } from "date-fns"
import  HourglassIcon from "/public/hourglass.svg"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"

import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()
  const [time, setTime] = React.useState<Dayjs | null>()
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClearCalender = () => {
    setDate(undefined)
    setTime(null)
  }

  const handleCloseCalender = () => {
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="mr-2">
            <Image src = {HourglassIcon} alt = "Hourglass Icon" width = {10} height = {15}/>
          </div>
          <div className="flex gap-1">
            <div>{date ? format(date, "PPP") : <span>Choose a Deadline Date</span>}</div>
            <div>{`${date && time ? "at " + format(time.toISOString(), "p") : ""}`}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex-col justify-center items-center w-auto p-0 ">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker
              label="Select Deadline"
              value={time}
              onChange={(newValue) => setTime(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <div className="flex justify-center gap-8">
          <Button
            className={cn(
              "w-[100px] bg-accent justify-start text-left font-normal text-black",
              !date && "text-muted-foreground"
            )}
            onClick={handleClearCalender}
          >Clear
          </Button>
          <Button
            className={cn(
              "w-[100px] bg-[#D7F066] justify-start text-left font-normal text-black",
              !date && "text-muted-foreground"
            )}
            onClick={handleCloseCalender}
          >
          Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}