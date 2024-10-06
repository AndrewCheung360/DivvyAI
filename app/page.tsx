'use client'
import { useState } from "react";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import SignInForm from "@/components/auth/SignInForm";
import AddButton from "@/components/home/AddButton";
import ImportScheduleButton from "@/components/home/ImportScheduleButton";
import FileUploadForm from "@/components/upload-assignment/UploadAssignment";
import GetAssignmentForm from "@/components/get-assignment-btn/GetAssignmentButton";
import AddAssignmentModal from "@/components/add-assignment-modal/AddAssignmentModal";
import DeadlineButton from "@/components/choose-deadline/ChooseDeadlineButton";
import SelectEstimatedTime from "@/components/estimated-time/EstimatedTime";
import PrioritySelector from "@/components/choose-priority/ChoosePriority";
import { UploadAssignment } from "@/components/upload-assignment/UploadAssignment";
import UploadReference from "@/components/upload-reference/UploadReference";
import FormInput from "@/components/form-input/FormInput";


import Clipboard from "/public/clipboard.svg";
import Whiteboard from "/public/whiteboard.svg";


export default function Index() {
  const [assignment, setAssignment] = useState<string>("");
  const [corseName, setCourseName] = useState<string>("");
  return (
    <>
    <div className = "w-[100vw] bg-[#F4f4f4] h-[150vh] flex justify-center items-center">
      {/* <ImportScheduleButton/>
      <AddButton/> */}
      {/* <FileUploadForm/>
      <GetAssignmentForm/>
      <AddAssignmentModal/> */}
      {/* <DeadlineButton/> */}
      {/* <SelectEstimatedTime/> */}
      {/* <PrioritySelector/> */}
      {/* <UploadAssignment/> */}
      {/* <UploadReference/> */}
      <FormInput 
        icon={Clipboard} 
        type={"text"}
        alt={"Clipboard Icon"} 
        placeholder={"Name of the assignment"} 
        setValue={setAssignment}
        />
      <FormInput 
        icon={Whiteboard}
        type={"text"}
        alt={"Whiteboard Icon"} 
        placeholder={"Name of the course"}
        setValue = {setCourseName}
        />
      {assignment}
      {corseName}
    </div>
    </>
  );
}
