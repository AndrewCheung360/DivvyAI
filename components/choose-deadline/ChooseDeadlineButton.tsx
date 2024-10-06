import React, { useState } from 'react';
import { DatePickerDemo } from '../ui/datepicker';

export default function DeadlineButton() {
  const [deadline, setDeadline] = useState<Date | null>(null);

  return (
    <DatePickerDemo />
  );
};