import React, { useState } from 'react';
import { UploadAssignment } from '../upload-assignment/UploadAssignment';
import UploadReference from '../upload-reference/UploadReference';
import PrioritySelector from '../choose-priority/ChoosePriority';
import FormInput from '../form-input/FormInput';
import clipboardIcon from '../../public/clipboard.svg';
import whiteboardIcon from '../../public/whiteboard.svg';
import assignmentIcon from '../../public/assignment.svg';
import xIcon from '../../public/x.svg';
import SelectEstimatedTime from '../estimated-time/EstimatedTime';
import DeadlineButton from '../choose-deadline/ChooseDeadlineButton';
import Image from 'next/image';

export default function AddAssignmentModal() {
  const [assignmentName, setAssignmentName] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');

  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Low');

  const handlePriorityChange = (level: 'Low' | 'Medium' | 'High' | 'Critical') => {
    setPriority(level);
  };

  return (
    <div className="bg-white rounded-[30px] w-[686px] h-[875px] flex flex-col gap-y-[72px] px-[53px] pb-[43px] pt-9 overflow-y-scroll">
      <div className="w-full flex flex-col gap-y-8">
        <div className="w-full flex flex-col">
          <button className="w-full flex items-center justify-end">
            <Image src={xIcon} alt="close icon" width={30} height={30} />
          </button>
          <div className="w-full flex flex-row items-center gap-x-[18px]">
            <div>
              <Image src={assignmentIcon} alt="assignment icon" width={30} height={30} />
            </div>
            <span className="text-[#141414] text-[28px] font-semibold">Add assignment</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-[24px] ">
          <div className="w-full flex flex-col gap-y-3">
            <FormInput
              icon={clipboardIcon}
              alt="clipboard icon"
              placeholder="Name of the assignment"
              type="text"
              setValue={setAssignmentName}
            />
            <FormInput
              icon={whiteboardIcon}
              alt="whiteboard icon"
              placeholder="Name of the course"
              type="text"
              setValue={setCourseName}
            />
            <div className="w-full flex flex-row items-center justify-between">
              <DeadlineButton />
              <SelectEstimatedTime />
            </div>
          </div>
          <PrioritySelector />
          <UploadAssignment />
          <UploadReference />
        </div>
      </div>

      <div className="w-full flex flex-row items-center justify-between">
        <button className="w-[155px] h-[54px] flex justify-center items-center border-2 border-[#141414] rounded-[50px]">
          <span className="text-[#141414] font-light text-lg">Cancel</span>
        </button>
        <button className="w-[230px] h-[54px] bg-[#141414] flex justify-center items-center border-2 border-[#141414] rounded-[50px]">
          <span className="text-white font-light text-lg">Break down</span>
        </button>
      </div>
    </div>
  );
}
