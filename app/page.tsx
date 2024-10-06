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
import TaskModal from "@/components/task-modal/TaskModal";

export default function Index() {
  const [assignment, setAssignment] = useState<string>("");
  const [corseName, setCourseName] = useState<string>("");
  return (
    <>

    <div className = "w-[100vw] bg-[#F4f4f4] h-[150vh] flex justify-center items-center">
    <div className = "w-[100vw] bg-[#F4f4f4] h-[150vh] pt-10 flex flex-col justify-start items-center">
      <TaskModal
        taskName = "Question 1"
        timeLeft = "03:02:00"
        topicSummary = "Self-training is a semi-supervised learning technique where a model is initially trained on a small labeled dataset, and then it uses its own confident predictions on the unlabeled data to iteratively retrain itself. This approach can help leverage large amounts of unlabeled data to improve model performance."
        attachmentName = "ML_HW4.pdf"
        taskProgress = "option-one"
        courseName = "Machine Learning"
        assignmentName = "ML A4"
        deadline = "October 5th, 2024"
        progress = {50}
      />
    </div>
    </>
  );
}
