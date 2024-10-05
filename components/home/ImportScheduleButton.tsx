"use client"
import React from "react"
import Image from "next/image"
import UploadIcon from "../../public/upload.svg"

export default function ImportScheduleButton(){
    return (
        <button className = "w-[262px] h-[66px] bg-[#F4F4F4] rounded-[50px] flex justify-center items-center border-2 border-[#141414] gap-x-3 hover:bg-[#dbdbdb] cursor-pointer">
            <div>
                <Image src = {UploadIcon} alt = "Upload Icon" width = {20} height = {20}/>
            </div>
            <span className = "text-[#141414] text-lg font-light">
                Import schedule
            </span>
        </button>
    )
}