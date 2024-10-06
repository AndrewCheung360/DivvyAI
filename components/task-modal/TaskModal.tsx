import React from "react"
import pencilIcon from "../../public/pencil.svg"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import FileBadge from "../ui/filebadge"
import arrowIcon from "../../public/arrow.svg"

type TaskModalProps = {
    taskName : string;
    timeLeft : string;
    topicSummary : string;
    attachmentName : string;
    taskProgress : string;
    courseName : string;
    assignmentName : string;
    deadline : string;
    progress : number;
}

export default function TaskModal({taskName, timeLeft, topicSummary, attachmentName, taskProgress, courseName, assignmentName, deadline, progress} : TaskModalProps) {
    return(
        <div className = "w-[100%] h-[95%] relative flex justify-center flex-grow">
            <div className = "w-[78px] h-[88px] bg-white absolute left-[22%] rounded-l-[30px] flex items-center pl-4">
                <div>
                    <Image src = {arrowIcon} alt = "arrow icon" width = {11} height = {11}/>
                </div>
            </div>
            <div className = "w-[50%] h-full bg-white flex flex-col items-center pl-[30px] pr-[40px] pt-[39px] gap-y-[51px] rounded-bl-[30px]">
                <div className = "w-[80%] flex flex-row items-center justify-start gap-x-4">
                    <div>
                        <Image src = {pencilIcon} alt = "pencil icon" width = {27} height = {27}/>
                    </div>
                    <span className = "text-[#141414] text-[28px] font-semibold">
                        Task details
                    </span>
                </div>
                <div className = "w-[80%] flex flex-col gap-y-[72px]">
                    <div className = "w-full flex flex-col gap-y-[24px]">
                        <TaskInfo title = {"Task name"} info={taskName}/>
                        <TaskInfo title = {"Time left"} info={timeLeft}/>
                        <div className = "w-full flex flex-col gap-y-4">
                            <span className = "text-[#141414] font-light">
                                Relevant topic summary
                            </span>
                            <span className = "text-[#141414]">
                                {topicSummary}
                            </span>

                        </div>
                        <div className = "w-full flex flex-col gap-y-4">
                            <span className = "text-[#141414] font-light">
                                Referenced attachment
                            </span>
                            <FileBadge name = {attachmentName}/>
                        </div>
                        <div className = "w-full flex flex-col gap-y-4">
                            <span className = "text-[#141414] font-light">
                                Task progress
                            </span>
                            <RadioGroup defaultValue={taskProgress}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-one" id="option-one" />
                                    <Label htmlFor="option-one">Not started</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-two" id="option-two" />
                                    <Label htmlFor="option-two">In progress</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-three" id="option-three" />
                                    <Label htmlFor="option-three">More time</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-four" id="option-four" />
                                    <Label htmlFor="option-four">Complete</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className = "h-[1px] bg-[#F4F4F4]"/>
                        <span className = "text-xl font-light">
                            Assignment details
                        </span>
                        <TaskInfo title = {"Course name"} info={courseName}/>
                        <TaskInfo title = {"Assignment name"} info={assignmentName}/>
                        <TaskInfo title = {"Deadline"} info={deadline}/>
                        <ProgressComponent progress={progress}/>
                        
                    </div>
                    
                    <div className = "w-full flex flex-row justify-between items-center">
                        <CancelButton/>
                        <UpdateButton/>
                    </div>

                </div>
                
            </div>
        </div>
    )
}

type TaskInfoType = {
    title: string;
    info: string
}

const TaskInfo = ({title, info} : TaskInfoType) => {
    return(
        <div className = "w-full flex flex-row justify-between items-center">
            <span className = "text-[#141414] font-light">
                {title}
            </span>
            <span className = "text-[#141414]">
                {info}
            </span>
        </div>
    )

}

const CancelButton: React.FC = () => {
    return(
        <button className="h-[54px] w-[166px] rounded-[50px] border-2 border-[#141414] flex justify-center items-center">
            <span className = "text-[#141414] font-light text-lg">
                Cancel
            </span>
        </button>
    )
}

const UpdateButton: React.FC = () => {
    return(
        <button className="h-[54px] w-[185px] rounded-[50px] bg-[#141414] flex justify-center items-center">
            <span className = "text-white font-light text-lg">
                Update
            </span>
        </button>
    )
}

type ProgressType = {
    progress: number
}

const ProgressComponent = ({progress} : ProgressType) => {
    return(
        <div className = "w-full flex flex-col gap-y-6">
            <span className = "text-[#141414] font-light">
                Progress
            </span>
            <Progress value = {50}/>
        </div>

    )
}