import React, { useState } from 'react';
import Image from "next/image";
import FileIcon from "/public/file_icon.svg"
import FileBadge from "../ui/filebadge";

export default function UploadReference() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Only allow PDF files
    const pdfFiles = files.filter(file => file.type === "application/pdf");
    setSelectedFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
  }


  return (
    <div className="mt-4">
      <label className="text-[#141414] font-[400] text-[16px]">
        Upload relevant material (PDF files only)
      </label>
      <div className="flex items-center w-[580px] mt-[16px] ">
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
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
      {selectedFiles && (
        selectedFiles.map((file, idx) => (
        <FileBadge key={idx} name={file.name} />
      )))}
    </div>
  );
}
