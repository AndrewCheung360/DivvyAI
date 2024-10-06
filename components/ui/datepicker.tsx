'use client';

import * as React from 'react';
import { format, set } from 'date-fns';
import HourglassIcon from '/public/hourglass.svg';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';

import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

type DatePickerProps = {
  deadlineDate: Date | null;
  deadlineTime: Dayjs | null;
  setDeadlineDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setDeadlineTime: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

export function DatePickerDemo({deadlineDate, deadlineTime, setDeadlineDate, setDeadlineTime }: DatePickerProps) {
  // const [date, setDate] = React.useState<Date>();
  // const [time, setTime] = React.useState<Dayjs | null>();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClearCalender = () => {
    setDeadlineDate(null);
    setDeadlineTime(null);
  };

  const handleCloseCalender = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !deadlineDate && 'text-muted-foreground'
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="mr-2">
            <Image src={HourglassIcon} alt="Hourglass Icon" width={10} height={15} />
          </div>
          <div className="flex gap-1">
            <div>{deadlineDate ? format(deadlineDate, 'PPP') : <span>Choose a Deadline Date</span>}</div>
            <div>{`${deadlineDate && deadlineTime ? 'at ' + format(deadlineTime.toISOString(), 'p') : ''}`}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center w-auto p-0 h-[460px] gap-y-2">
        <Calendar mode="single" selected={deadlineDate || undefined} onSelect={(day) => setDeadlineDate(day || null)} initialFocus />
        <div className="w-auto flex flex-col items-center gap-y-5">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="Select Deadline"
                value={deadlineTime}
                onChange={(newValue) => setDeadlineTime(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div className="flex justify-center gap-8">
            <Button
              className={cn(
                'w-[100px] bg-accent hover:text-white justify-center text-left font-normal text-black',
                !deadlineDate && 'text-muted-foreground'
              )}
              onClick={handleClearCalender}
            >
              Clear
            </Button>
            <Button
              className={cn(
                'w-[100px] bg-[#D7F066] hover:bg-[#141414] hover:text-[#D7F066] text-[#141414] justify-center text-left font-normal',
                !deadlineDate && 'text-muted-foreground'
              )}
              onClick={handleCloseCalender}
            >
              <span className=" ">Done</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
