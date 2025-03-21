import React from "react";
import { cn } from "utils/cn";

interface Props {
  className?: string;
  variant?: "light" | "dark";
}

export function LeadShiftLogo({ className, variant = "light" }: Props) {
  return (
    <div className={cn("font-bold text-3xl flex items-center", className)}>
      <span className="text-[#17206d] dark:text-white font-extrabold">Lead</span>
      <span className="text-[#17206d] dark:text-white font-extrabold">Shift</span>
      <span className="text-[#eb6810] font-extrabold ml-0.5">.</span>
      <span className="text-[#27b99c] ml-0.5 text-sm relative bottom-3 right-1">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#27b99c]"></span>
      </span>
    </div>
  );
}

