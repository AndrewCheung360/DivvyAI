"use client"
import React from "react"

export default function AddButton(){
    return (
        <button className = "w-[262px] h-[66px] bg-[#141414] rounded-[50px] flex justify-center items-center border-2 border-[#141414] gap-x-3 hover:bg-[#2b2b2b] cursor-pointer">
            <span className = "text-white text-2xl font-light">
                +
            </span>
            <span className = "text-white text-lg font-light">
                Add assignment
            </span>
        </button>
    )
}