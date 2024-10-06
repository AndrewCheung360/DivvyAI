import React from "react";
import Image from "next/image";
import PaperClip from "/public/paperclip.svg";

interface FileBadgeProps {
  name: string;
}

export default function FileBadge(props: FileBadgeProps) {
  return (
    <div className="flex items-center gap-2 mt-[10px] h-[35px] px-[20px] py-[10px] cursor:pointer bg-[#F4F4F4] border-[#141414] border-[1px] rounded-[15px]">
      <Image src={PaperClip} alt="Paperclip Icon" width={15} height={15} />
      <div className = "text-xs font-light">{props.name}</div>
    </div>

  )
}
