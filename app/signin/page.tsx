'use client'
import SignInForm from "@/components/auth/SignInForm";

export default function Index() {
  return (
    <>
    <div className = "relative w-[100vw] bg-[#F4f4f4] h-[100vh] flex justify-center items-center">
      <SignInForm />
      <div className = "absolute bg-[#D7F066] rounded-full w-[274px] h-[276px] right-[196px] bottom-[282px]"/>
      <div className = "absolute bg-[#141414] rounded-full w-[196px] h-[196px] right-0 bottom-[319px]"/>
      <div className = "absolute bg-[#FFFF91] rounded-full w-[327px] h-[327px] right-0 bottom-0"/>
      <div className = "absolute bg-[#D7F066] rounded-full w-[200px] h-[200px] left-0 bottom-0"/>
      <div className = "absolute bg-[#141414] rounded-full w-[200px] h-[200px] left-[200px] bottom-0"/>
      <div className = "absolute bg-[#FFFF91] rounded-full w-[171px] h-[171px] left-[300px] bottom-[178px]"/>
    </div>
    
    </>
  );
}
