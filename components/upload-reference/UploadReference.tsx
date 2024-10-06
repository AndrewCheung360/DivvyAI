import React, { useState } from 'react';
import Image from "next/image";
import FileIcon from "/public/file_icon.svg"
import FileBadge from "../ui/filebadge";

export interface UploadAssignmentProps {
  referenceFiles: File[] | null;
  setReferenceFiles: React.Dispatch<React.SetStateAction<File[] | null>>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 

export default function UploadReference(props: UploadAssignmentProps) {
  // const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Only allow PDF files
    const pdfFiles = files.filter(file => file.type === "application/pdf");
    props.setReferenceFiles(prevFiles => [...prevFiles || [], ...pdfFiles || []]);
  }


  return (
    <div className="mt-4">
      <label className="text-[#141414] font-[400] text-[16px]">
        Upload relevant material (PDF files only)
      </label>
      <div className="flex items-center w-[580px] mt-[16px]  transition-transform duration-200 hover:scale-105 hover:cursor-pointer">
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={props.onChange}
          className="hidden size-full"
          id="referenceUpload"
        />
        <label
          htmlFor="referenceUpload"
          className="flex items-center size-full text-[14px] transition cursor:pointer px-[22px] py-[17px] bg-[#F4F4F4] border-[1px] border-[#141414] rounded-[15px]"
        >
            <div className="flex gap-2">
                <Image src={FileIcon} alt="File Icon" width={15} height={15} />
                <div>Select file(s) to upload</div>
            </div>
        </label>
      </div>
      {props.referenceFiles && (
        props.referenceFiles.map((file, idx) => (
        <FileBadge key={idx} name={file.name} />
      )))}
    </div>
  );
}
