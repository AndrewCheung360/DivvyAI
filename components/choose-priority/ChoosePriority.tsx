import { useState } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for conditional classNames


const priorities = ["Low", "Medium", "High", "Critical"];

export default function PrioritySelector() {
  const [selectedPriority, setSelectedPriority] = useState("Low");

  return (
    <div>
      <label className="text-[#141414] font-[400] text-[16px] mb-2">Priority</label>
      <div className="flex space-x-2">
        {priorities.map((priority) => (
          <button
            key={priority}
            onClick={() => setSelectedPriority(priority)}
            className={cn(
              "py-2 px-4 h-[48px] w-[140px] rounded-[30px] border transition-colors text-[14px]",
              selectedPriority === priority
                ? "bg-[#D7F066] border-black"
                : "bg-[#EBF7B6] border-gray-300"
            )}
          >
            {priority}
          </button>
        ))}
      </div>
    </div>
  );
}
