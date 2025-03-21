import React from "react";
import { ThemeToggle } from "components/ThemeToggle";
import { Bell, Search, UserCircle } from "lucide-react";

export function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex-1">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search leads, companies..."
              className="block w-full pl-10 pr-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-[#27b99c] focus:border-[#27b99c]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <button className="relative p-2 text-muted-foreground rounded-full hover:bg-muted hover:text-foreground">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#eb6810] rounded-full"></span>
          </button>
          
          <div className="flex items-center">
            <button className="flex items-center text-sm focus:outline-none">
              <UserCircle size={36} className="text-[#17206d] dark:text-[#27b99c]" />
              <div className="ml-2 text-left hidden md:block">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-muted-foreground">Sales Rep</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
