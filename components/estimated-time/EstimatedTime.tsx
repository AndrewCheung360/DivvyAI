import React, { useState } from 'react';
import ClockIcon from "/public/clock.svg";
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectEstimatedTime() {
  const [time, setTime] = useState<number | null>(null);
  return (
    <SelectScrollable time={time} setTime={setTime}/>
  );
}

interface SelectScrollableProps {
  time: number | null;
  setTime: React.Dispatch<React.SetStateAction<number | null>>;
}

export function SelectScrollable(props: SelectScrollableProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i + 1);
  return (
    <Select onValueChange={(value) => props.setTime(Number(value))}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={
          <div className="flex gap-2 justify-center items-center">
            {/* <div>
              <img src = {ClockIcon} alt = "ClockIcon" width = {10} height = {15}/>
            </div> */}
            <span>Estimated Time Needed</span>
          </div>
          } />
      </SelectTrigger>
      <SelectContent>
        {hours.map(hour => (
            <SelectItem key={hour} value={hour.toString()}>{hour} hour{hour > 1 ? 's' : ''}</SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}

