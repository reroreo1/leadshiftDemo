import React, { useState, useEffect } from "react";
import { DashboardLayout } from "components/DashboardLayout";
import { BarChart3, Phone, Send, Users, Star, ArrowUpRight, Calendar } from "lucide-react";
import { generateCallHistory, generateEmailAnalytics, generateTopLeads } from "utils/fakeData";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";

export default function Dashboard() {
  const [callHistory, setCallHistory] = useState(generateCallHistory());
  const [emailAnalytics, setEmailAnalytics] = useState(generateEmailAnalytics());
  const [topLeads, setTopLeads] = useState(generateTopLeads());
  
  // Sample statistics data
  const statistics = [
    { id: 1, name: "Active Leads", value: "243", change: "+12%", icon: <Users className="text-[#17206d]" size={24} /> },
    { id: 2, name: "Emails Sent", value: "1,842", change: "+24%", icon: <Send className="text-[#eb6810]" size={24} /> },
    { id: 3, name: "Call Success Rate", value: "68%", change: "+7%", icon: <Phone className="text-[#27b99c]" size={24} /> },
    { id: 4, name: "Lead Score Avg", value: "72", change: "+5%", icon: <BarChart3 className="text-[#17206d]" size={24} /> },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="text-sm text-muted-foreground">Last updated: Today at 14:32</div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statistics.map((stat) => (
            <div key={stat.id} className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.name}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span className="text-xs font-medium text-[#27b99c]">{stat.change} from last month</span>
                </div>
                <div className="bg-muted p-2 rounded-full">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Call History Chart */}
          <div className="lg:col-span-2 bg-card p-6 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Call History</h3>
              <div className="text-sm text-muted-foreground">Last 30 days</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={callHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.toString()}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '6px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="successful" 
                    name="Successful Calls"
                    stackId="1"
                    stroke="#27b99c" 
                    fill="#27b99c" 
                    fillOpacity={0.6} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="unsuccessful" 
                    name="Unsuccessful Calls"
                    stackId="1"
                    stroke="#eb6810" 
                    fill="#eb6810" 
                    fillOpacity={0.6} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Top Leads */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Top Performing Leads</h3>
              <button className="text-xs text-[#17206d] hover:underline">View All</button>
            </div>
            <div className="space-y-4 h-64 overflow-y-auto">
              {topLeads.map((lead) => (
                <div key={lead.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{lead.company_name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{lead.industry}</div>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-xs">
                        <Star size={12} className="text-yellow-500 mr-1" />
                        <span className="font-medium">Score: {lead.score}</span>
                      </div>
                      <div className="mx-2 w-px h-3 bg-muted-foreground/30"></div>
                      <div className="text-xs text-[#27b99c]">{lead.engagementRate} Engagement</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center text-xs bg-[#17206d]/10 text-[#17206d] font-medium rounded-full h-8 w-8">
                    {lead.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Engagement Analytics */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Email Engagement</h3>
              <div className="text-sm text-muted-foreground">Last 7 days</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Sent</div>
                <div className="text-2xl font-bold">{emailAnalytics.totalSent}</div>
                <div className="flex items-center text-xs mt-1 text-[#27b99c]">
                  <ArrowUpRight size={12} className="mr-1" />
                  <span>12%</span>
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Opened</div>
                <div className="text-2xl font-bold">{emailAnalytics.opened}</div>
                <div className="flex items-center text-xs mt-1 text-[#27b99c]">
                  <span>{emailAnalytics.openRate}%</span>
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Replied</div>
                <div className="text-2xl font-bold">{emailAnalytics.replied}</div>
                <div className="flex items-center text-xs mt-1 text-[#27b99c]">
                  <span>{emailAnalytics.replyRate}%</span>
                </div>
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emailAnalytics.weekly} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '6px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar name="Sent" dataKey="sent" fill="#17206d" radius={[4, 4, 0, 0]} barSize={10} />
                  <Bar name="Opened" dataKey="opened" fill="#27b99c" radius={[4, 4, 0, 0]} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Upcoming Tasks */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Upcoming Tasks</h3>
              <button className="text-xs text-[#17206d] hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-[#17206d]/10 flex items-center justify-center mr-3">
                      <Calendar size={16} className="text-[#17206d]" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{i === 1 ? 'Call Client XYZ' : i === 2 ? 'Follow-up Email' : i === 3 ? 'Prepare Proposal' : 'Client Meeting'}</div>
                      <div className="text-xs text-muted-foreground mt-1">{i === 1 ? 'Today, 2:30 PM' : i === 2 ? 'Tomorrow, 10:00 AM' : i === 3 ? 'Wed, 4:00 PM' : 'Thu, 1:30 PM'}</div>
                    </div>
                  </div>
                  <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${i === 1 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : i === 2 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                    {i === 1 ? 'Urgent' : i === 2 ? 'Medium' : 'Normal'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
