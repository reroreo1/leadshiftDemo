import React from "react";
import { DashboardLayout } from "components/DashboardLayout";

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          View detailed reports, analytics, and AI-powered insights to improve your sales strategy.
        </p>
      </div>
    </DashboardLayout>
  );
}
