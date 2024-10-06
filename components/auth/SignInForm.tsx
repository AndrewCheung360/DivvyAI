'use client';
import React from 'react';
import googleIcon from '../../public/google_icon.svg';
import loginIcon from '../../public/login.svg';
import eyeIcon from '../../public/eye-closed.svg';
import Image from 'next/image';
import { useState } from 'react';
import { SignInButton } from '@clerk/nextjs';

export default function SignInForm() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div className="w-[38%] h-[90%] rounded-[30px] bg-white flex flex-col items-center justify-center drop-shadow-md gap-y-6 z-10">
      <EmailForm isVisible={isVisible} setIsVisible={setIsVisible} />
      <span className="text-[#444444] font-extralight">Or sign in with</span>
      <GoogleSignInButton />
    </div>
  );
}

type EmailFormProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function EmailForm({ isVisible, setIsVisible }: EmailFormProps) {
  return (
    <div className="w-full flex flex-col items-center gap-y-[22px]">
      <div className="w-full flex flex-col items-center gap-y-[29px]">
        <Header />
        <div className="w-full flex flex-col items-center gap-y-[6px]">
          <div className="w-full flex flex-col items-center gap-y-4">
            <EmailInput />
            <PasswordInput isVisible={isVisible} setIsVisible={setIsVisible} />
          </div>
          <span className="w-full text-right pr-[93px]">
            <a href="#" className="text-[#444444] font-light text-sm">
              Forgot your password?
            </a>
          </span>
        </div>
      </div>
      <GetStartedButton />
    </div>
  );
}

function Header() {
  return (
    <div className="w-full flex flex-col items-center gap-y-[18px]">
      <Image src={loginIcon} alt="Login Icon" width={43} height={43} />
      <span className="text-[#444444] font-semibold text-2xl">Sign in with email</span>
      <span className="text-[#444444] text-lg font-extralight line-clamp-2 w-[50%] text-center">
        Automate your planning process for free with...
      </span>
    </div>
  );
}

function EmailInput() {
  return (
    <input
      type="email"
      placeholder="Email"
      className="w-[67%] h-[52px] rounded-[15px] bg-[#F4F4F4] px-6 focus:border-2 focus:border-[#444444] focus:outline-none text-[#141414] placeholder:text-[#141414] placeholder:font-light"
    />
  );
}

function PasswordInput({ isVisible, setIsVisible }: EmailFormProps) {
  return (
    <div className="relative w-full flex justify-center">
      <input
        type={isVisible ? 'text' : 'password'}
        placeholder="Password"
        className="w-[67%] h-[52px] rounded-[15px] bg-[#F4F4F4] px-6 focus:border-2 focus:border-[#444444] focus:outline-none text-[#141414] placeholder:text-[#141414] placeholder:font-light"
      />
      <button
        className="absolute right-0 pr-[110px] py-[18px]"
        onClick={() => setIsVisible(!isVisible)}
      >
        <Image src={eyeIcon} alt="Eye Icon" width={18} height={18} />
      </button>
    </div>
  );
}

function GetStartedButton() {
  return (
    <button className="w-[67%] h-[66px] rounded-[50px] bg-[#141414] flex justify-center items-center hover:bg-[#202020]">
      <span className="text-white font-light text-lg">Get Started</span>
    </button>
  );
}

function GoogleSignInButton() {
  return (
    <SignInButton forceRedirectUrl={'/'}>
      <button className="w-[67%] h-[66px] rounded-[50px] border-2 border-[#141414] flex justify-center items-center hover:bg-[#F4F4F4]">
        <Image src={googleIcon} alt="Google Icon" width={28} height={28} />
      </button>
    </SignInButton>
  );
}
