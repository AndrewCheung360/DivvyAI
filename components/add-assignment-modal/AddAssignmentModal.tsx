
import React, { useState } from 'react';

export default function AddAssignmentModal() {
  
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Low');

  const handlePriorityChange = (level: 'Low' | 'Medium' | 'High' | 'Critical') => {
    setPriority(level);
  };

  return (
    <div>Hello World</div>
  );
};

