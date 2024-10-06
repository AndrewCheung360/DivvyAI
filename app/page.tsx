'use client'
import { useState } from "react";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import SignInForm from "@/components/auth/SignInForm";
import AddButton from "@/components/home/AddButton";
import ImportScheduleButton from "@/components/home/ImportScheduleButton";
import SideBar from "@/components/home/SideBar";
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
import TaskModal from "@/components/task-modal/TaskModal";
import Scheduler from "@/components/home/Scheduler";


export default function Index() {
  const [assignment, setAssignment] = useState<string>("");
  const [corseName, setCourseName] = useState<string>("");
  return (
    <>
    <div className = "grid grid-cols-5 w-screen h-screen">
      <div className="col-span-1 z-0">
        <SideBar/>
      </div>

      <div className="col-span-4 h-screen z-40">
        <div className="flex flex-row justify-end pt-4 gap-x-4 pr-10">
          <AddButton/>
          <ImportScheduleButton/>
        </div>

        <div className="pt-4 px-8">
          <Scheduler />
        </div>
        
      </div>
    </div>
    </>
  )
}
