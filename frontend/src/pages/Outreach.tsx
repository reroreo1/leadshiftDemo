import React from "react";
import { DashboardLayout } from "components/DashboardLayout";

export default function Outreach() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Outreach</h1>
        <p className="text-muted-foreground">
          Create personalized email templates and manage your outreach campaigns.
        </p>
      </div>
    </DashboardLayout>
  );
}
