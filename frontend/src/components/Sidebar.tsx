import React from "react";
import { useTransition } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "utils/cn";
import { LeadShiftLogo } from "components/LeadShiftLogo";
import {
  LayoutDashboard,
  Users,
  Send,
  BarChart3,
  LineChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";

export function Sidebar() {
  const navigate = useNavigate();
  const Location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const [isPending, startTransition] = useTransition();
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Leads", icon: <Users size={20} />, path: "/leads" },
    { name: "Outreach", icon: <Send size={20} />, path: "/outreach" },
    { name: "Engagement Tracking", icon: <BarChart3 size={20} />, path: "/engagement-tracking" },
    { name: "Reports & Analytics", icon: <LineChart size={20} />, path: "/reports" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  const handleNavigation = (path: string, name: string) => {
    setActiveItem(name);
    startTransition(() => {
      navigate(path);
    });
  };

  const handleSignOut = () => {
    setActiveItem("Sign Out");
    startTransition(() => {
      navigate("/");
    });
  };

  return (
    <div
      className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        {!collapsed && <LeadShiftLogo className="text-2xl" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full hover:bg-muted transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = Location.pathname === item.path;
            const isPendingItem = isPending && activeItem === item.name;
            
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path, item.name)}
                disabled={isPending}
                className={cn(
                  "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-[#17206d] text-white dark:bg-[#17206d]/80 shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isPendingItem && "opacity-70 cursor-wait"
                )}
              >
                <span className="flex-shrink-0">
                  {isPendingItem ? (
                    <span className="animate-pulse">{item.icon}</span>
                  ) : (
                    item.icon
                  )}
                </span>
                {!collapsed && (
                  <span 
                    className={cn(
                      "ml-3", 
                      isActive ? "font-semibold" : "",
                      isPendingItem && "animate-pulse"
                    )}
                  >
                    {item.name}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sign Out Button */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleSignOut}
          disabled={isPending}
          className={cn(
            "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
            "text-red-500 hover:bg-red-500/10",
            isPending && activeItem === "Sign Out" && "opacity-70 cursor-wait"
          )}
        >
          <span className="flex-shrink-0">
            {isPending && activeItem === "Sign Out" ? (
              <span className="animate-pulse"><LogOut size={20} /></span>
            ) : (
              <LogOut size={20} />
            )}
          </span>
          {!collapsed && (
            <span 
              className={cn(
                "ml-3",
                isPending && activeItem === "Sign Out" && "animate-pulse"
              )}
            >
              Sign Out
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
