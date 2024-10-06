"use client"
import React, { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import FileIcon from "/public/file_icon.svg"
import Image from "next/image"
import FileBadge from "../ui/filebadge"

/* Form for uploading assignment file */
export default function FileUploadForm() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected file:", file.name);
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedFile) {
            console.log("Submitting file:", selectedFile.name);
            // Handle form submission and file upload here
            const data = new FormData();
            data.append("name", selectedFile.name);
            data.append("deadline", "test deadline");
            data.append("estimated_time", "30");
            data.append("priority", "critical");
            data.append("file", selectedFile);
            
            const uploadFileRequest = await fetch("/api/assignment", {
                method: "POST",
                body: data,
            });
            const uploadFile = await uploadFileRequest.json();
            console.log(uploadFile);
        } else {
            console.log("No file selected");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <button
                    type="button"
                    className="w-[262px] h-[66px] bg-[#F4F4F4] rounded-[50px] flex justify-center items-center border-2 border-[#141414] gap-x-3 hover:bg-[#dbdbdb] cursor-pointer"
                    onClick={handleButtonClick}
                >
                    <span className="text-[#141414] text-lg font-light">
                        Choose File
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="submit"
                    className="mt-4 w-[262px] h-[66px] bg-[#4CAF50] rounded-[50px] flex justify-center items-center border-2 border-[#141414] gap-x-3 hover:bg-[#45a049] cursor-pointer"
                >
                    <span className="text-white text-lg font-light">
                        Submit
                    </span>
                </button>
            </div>
        </form>
    );
}

export interface UploadAssignmentProps {
    assignmentFile: File | null;
    setAssignmentFile: React.Dispatch<React.SetStateAction<File | null>>
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} 

export function UploadAssignment(props: UploadAssignmentProps) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    // Only allow a PDF file
    if (file && file.type === "application/pdf") {
        props.setAssignmentFile(file);
    } else {
        alert("Please select a PDF file.");
    }
  };

  return (
    <div className="mt-4">
      <label className="text-[#141414] font-[400] text-[16px]">
        Upload assignment (PDF files only)
      </label>
      <div className="flex items-center w-[580px] mt-[16px] transition-transform duration-200 hover:scale-105 hover:cursor-pointer">
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={props.onChange}
          className="hidden size-full"
          id="assignmentUpload"
        />
        <label
          htmlFor="assignmentUpload"
          className="flex items-center size-full text-[14px] transition cursor:pointer px-[22px] py-[17px] bg-[#F4F4F4] border-[1px] border-[#141414] rounded-[15px]"
        >
            <div className="flex gap-2">
                <Image src={FileIcon} alt="File Icon" width={15} height={15} />
                <div>Select file(s) to upload</div>
            </div>
        </label>
      </div>
      {props.assignmentFile && <FileBadge name={props.assignmentFile.name} />}
    </div>
  );
}
