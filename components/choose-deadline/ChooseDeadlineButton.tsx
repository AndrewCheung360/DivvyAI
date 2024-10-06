import React, { useState } from 'react';
import { DatePickerDemo } from '../ui/datepicker';
import { Dayjs } from 'dayjs';

type DeadLineButtonProps = {
  deadlineDate: Date | null;
  deadlineTime: Dayjs | null;
  setDeadlineDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setDeadlineTime: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

export default function DeadlineButton({deadlineDate, deadlineTime, setDeadlineDate, setDeadlineTime} : DeadLineButtonProps) {

  return (
    <DatePickerDemo deadlineDate={deadlineDate} deadlineTime={deadlineTime} setDeadlineDate={setDeadlineDate} setDeadlineTime={setDeadlineTime}/>
  );
};