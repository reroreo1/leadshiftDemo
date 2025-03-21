import React from "react";
import { DashboardLayout } from "components/DashboardLayout";
import { ThemeToggle } from "components/ThemeToggle";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        
        <div className="max-w-lg bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
            </div>
            <ThemeToggle />
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <p className="text-muted-foreground">Account settings and preferences will appear here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
