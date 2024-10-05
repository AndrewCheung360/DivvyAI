'use client'
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import SignInForm from "@/components/auth/SignInForm";
import { Sign } from "crypto";

export default function Index() {
  return (
    <>
    <div className = "w-[100vw] bg-[#F4f4f4] h-[100vh] flex justify-center items-center">
      <SignInForm />
    </div>
    </>
  );
}
