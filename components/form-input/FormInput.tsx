"use client"
import React, { useRef, useState } from "react"
import Image from "next/image"

interface FormInputProps {
  icon: string;
  alt: string;
  placeholder: string;
  type: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}


export default function FormInput(props: FormInputProps) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };

  return (
    <div className="flex gap-2 px-[18px] py-[18px] w-[580px] h-[52px] bg-[#F4F4F4]">
      <Image src={props.icon} alt={props.alt} width={15} height={15} />
      <input 
        type={props.type}
        placeholder={props.placeholder}
        onChange={handleChange}
        />
    </div>
  )
}