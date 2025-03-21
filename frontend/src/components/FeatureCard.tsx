import React from "react";
import { cn } from "utils/cn";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export function FeatureCard({ title, description, icon, className }: Props) {
  return (
    <div className={cn("bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-200", className)}>
      <div className="mb-4 text-[#27b99c]">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-[#17206d] dark:text-white">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
