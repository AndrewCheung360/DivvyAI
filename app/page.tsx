'use client'
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import SignInForm from "@/components/auth/SignInForm";
import AddButton from "@/components/home/AddButton";
import ImportScheduleButton from "@/components/home/ImportScheduleButton";
import SideBar from "@/components/home/SideBar";

export default function Index() {
  return (
      <div className = "w-[100vw] bg-[#F4f4f4] h-[100vh] flex justify-center items-center">
        <SideBar/>
      </div>
  );
}
