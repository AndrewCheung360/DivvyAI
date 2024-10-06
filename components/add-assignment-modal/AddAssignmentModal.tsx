import React, { useState } from 'react';
import { UploadAssignment } from '../upload-assignment/UploadAssignment';
import UploadReference from '../upload-reference/UploadReference';
import PrioritySelector from '../choose-priority/ChoosePriority';
import FormInput from '../form-input/FormInput';
import clipboardIcon from '../../public/clipboard.svg';
import whiteboardIcon from '../../public/whiteboard.svg';
import xIcon from '../../public/x.svg';
import assignmentIcon from '../../public/Assignment.svg'
import SelectEstimatedTime from '../estimated-time/EstimatedTime';
import DeadlineButton from '../choose-deadline/ChooseDeadlineButton';
import Image from 'next/image';
import { packQuestionsIntoFreeSlots } from '@/utils/calActions';
import { useAuth } from '@clerk/nextjs';
import { Dayjs } from 'dayjs';

type AddAssignmentModalProps = {
  onClose: () => void;
  setEvents: React.Dispatch<React.SetStateAction<any>>;
}

export default function AddAssignmentModal({ onClose, setEvents }: AddAssignmentModalProps) {
  const { userId } = useAuth();
  const [assignmentName, setAssignmentName] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Low');
  const [deadline, setDeadline] = useState<Date>();
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null)
  const [deadlineTime, setDeadlineTime] = useState<Dayjs | null>(null)
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [referenceFiles, setReferenceFiles] = useState<File[] | null>(null);

  console.log("AssignmentFile", assignmentFile)
  console.log("ReferenceFile", referenceFiles)
  const handlePriorityChange = (level: 'Low' | 'Medium' | 'High' | 'Critical') => {
    setPriority(level);
  };

  const combineDeadline = () => {
    if (deadlineDate && deadlineTime) {
      const deadline = new Date(deadlineDate);
      deadline.setHours(deadlineTime.hour());
      deadline.setMinutes(deadlineTime.minute());
      setDeadline(deadline);
    }
  }

  // Handle change for the assignment file
  const handleAssignmentFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("in assingment file change")
    const files = event.target.files;
    if (files && files.length > 0) {
      setAssignmentFile(files[0]); // Only allow one assignment file
    }
  };

  // Handle change for reference files (multiple files allowed)
  const handleReferenceFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("in reference file change")
    const files = event.target.files;
    if (files && files.length > 0) {
      setReferenceFiles(prevFiles => {
        const newFiles = Array.from(files); // Convert FileList to Array
        return prevFiles ? [...prevFiles, ...newFiles] : newFiles; // Append new files
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[30px] w-[686px] h-[875px] flex flex-col gap-y-[72px] px-[53px] pb-[43px] pt-9 overflow-y-scroll relative">
        <div className="w-full flex flex-col gap-y-8">
          <div className="w-full flex flex-col">
            <button className="w-full flex items-center justify-end" onClick={onClose}>
              <Image className='transition-transform duration-200 hover:scale-125' src={xIcon} alt="close icon" width={30} height={30} />
            </button>
            <div className="w-full flex flex-row items-center gap-x-[18px]">
              <div>
                <Image src={assignmentIcon} alt="assignment icon" width={30} height={30} />
              </div>
              <span className="text-[#141414] text-[28px] font-semibold">Add assignment</span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-[24px]">
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
                <DeadlineButton deadlineDate={deadlineDate} deadlineTime={deadlineTime} setDeadlineDate={setDeadlineDate} setDeadlineTime={setDeadlineTime}/>
                <SelectEstimatedTime />
              </div>
            </div>
            <PrioritySelector />
            <UploadAssignment
              assignmentFile={assignmentFile}
              setAssignmentFile={setAssignmentFile}
              onChange={handleAssignmentFileChange}
            />
            <UploadReference
              referenceFiles={referenceFiles}
              setReferenceFiles={setReferenceFiles}
              onChange={handleReferenceFileChange}
            />
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-between">
          <button className="w-[155px] h-[54px] flex justify-center items-center border-2 border-[#141414] rounded-[50px] transition-transform duration-200 hover:scale-110" onClick={onClose}>
            <span className="text-[#141414] font-light text-lg ">Cancel</span>
          </button>
          <button className="w-[230px] h-[54px] bg-[#141414] flex justify-center items-center border-2 border-[#141414] rounded-[50px] transition-transform duration-200 hover:scale-110"
            onClick = {
              () => {
                const questions: [string, number][] = [["q1", 60], ["q2", 30], ["q3", 45], ["q4", 50]];
                combineDeadline();
                if (!questions || !userId || !deadline || !assignmentName) return;

                const scheduledEvents = packQuestionsIntoFreeSlots(questions, userId, new Date(), deadline, assignmentName, "28", "HELLO WORLD")
                  .then((events) => {
                    setEvents(events)
                  })
                
                console.log("Scheduled events: ", scheduledEvents);
                
                onClose();
              }
            }
          >
            <span className="text-white font-light text-lg">Break down</span>
          </button>
        </div>
      </div>
    </div>
  );
}
