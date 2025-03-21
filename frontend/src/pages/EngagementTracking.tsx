import React, { useState } from "react";
import { DashboardLayout } from "components/DashboardLayout";
import { BarChart2, PieChart, TrendingUp, Mail, Phone, ArrowRight, Clock, CalendarCheck, ArrowUp, ArrowDown, Filter } from "lucide-react";
import { generateFakeEngagementData } from "utils/fakeData";

// Get fake engagement data
const engagementData = generateFakeEngagementData();

export default function EngagementTracking() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter" | "year">("month");
  const [engagementType, setEngagementType] = useState<"all" | "email" | "call">("all");
  
  // Filter data based on selected time range and type
  const filteredData = {
    ...engagementData,
    // In a real app, we would filter data based on the timeRange and engagementType
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Engagement Tracking</h1>
          
          <div className="flex space-x-2">
            <div className="bg-card border border-border rounded-md p-0.5 flex">
              {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-xs font-medium rounded ${timeRange === range ? 'bg-[#17206d] text-white' : 'text-muted-foreground hover:bg-muted'}`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="bg-card border border-border rounded-md p-0.5 flex">
              {(['all', 'email', 'call'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setEngagementType(type)}
                  className={`px-3 py-1.5 text-xs font-medium rounded ${engagementType === type ? 'bg-[#17206d] text-white' : 'text-muted-foreground hover:bg-muted'}`}
                >
                  {type === 'all' ? 'All' : type === 'email' ? 'Emails' : 'Calls'}
                </button>
              ))}
            </div>
            
            <button className="flex items-center px-3 py-1.5 text-xs bg-muted rounded-md border border-border">
              <Filter size={14} className="mr-1" />
              More Filters
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <h3 className="text-2xl font-bold mt-1">{filteredData.summary.responseRate}%</h3>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${filteredData.summary.responseRateChange > 0 ? 'text-emerald-500' : 'text-red-500'} flex items-center`}>
                    {filteredData.summary.responseRateChange > 0 ? <ArrowUp size={12} className="mr-0.5" /> : <ArrowDown size={12} className="mr-0.5" />}
                    {Math.abs(filteredData.summary.responseRateChange)}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs previous {timeRange}</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#27b99c]/10 flex items-center justify-center text-[#27b99c]">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground">Based on {filteredData.summary.totalInteractions} interactions</div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Call Score</p>
                <h3 className="text-2xl font-bold mt-1">{filteredData.summary.avgCallScore}/10</h3>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${filteredData.summary.avgCallScoreChange > 0 ? 'text-emerald-500' : 'text-red-500'} flex items-center`}>
                    {filteredData.summary.avgCallScoreChange > 0 ? <ArrowUp size={12} className="mr-0.5" /> : <ArrowDown size={12} className="mr-0.5" />}
                    {Math.abs(filteredData.summary.avgCallScoreChange)}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs previous {timeRange}</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#17206d]/10 flex items-center justify-center text-[#17206d]">
                <Phone size={20} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground">Based on {filteredData.summary.totalCalls} calls</div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Email Open Rate</p>
                <h3 className="text-2xl font-bold mt-1">{filteredData.summary.emailOpenRate}%</h3>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${filteredData.summary.emailOpenRateChange > 0 ? 'text-emerald-500' : 'text-red-500'} flex items-center`}>
                    {filteredData.summary.emailOpenRateChange > 0 ? <ArrowUp size={12} className="mr-0.5" /> : <ArrowDown size={12} className="mr-0.5" />}
                    {Math.abs(filteredData.summary.emailOpenRateChange)}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs previous {timeRange}</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#27b99c]/10 flex items-center justify-center text-[#27b99c]">
                <Mail size={20} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground">Based on {filteredData.summary.totalEmails} emails</div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                <h3 className="text-2xl font-bold mt-1">{filteredData.summary.avgResponseTime} hrs</h3>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${filteredData.summary.avgResponseTimeChange < 0 ? 'text-emerald-500' : 'text-red-500'} flex items-center`}>
                    {filteredData.summary.avgResponseTimeChange < 0 ? <ArrowDown size={12} className="mr-0.5" /> : <ArrowUp size={12} className="mr-0.5" />}
                    {Math.abs(filteredData.summary.avgResponseTimeChange)} hrs
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs previous {timeRange}</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#17206d]/10 flex items-center justify-center text-[#17206d]">
                <Clock size={20} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground">Based on {filteredData.summary.responsesReceived} responses</div>
            </div>
          </div>
        </div>

        {/* Email Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email Metrics */}
          <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <Mail size={18} className="mr-2 text-[#27b99c]" />
                Email Engagement Metrics
              </h2>
              <button className="text-xs text-[#27b99c] hover:underline flex items-center">
                View Details
                <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
            
            {/* Email Stats with fake chart */}
            <div className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-1">Delivered vs. Bounced</div>
                    <div className="flex items-center">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-[#27b99c] h-2 rounded-full" 
                          style={{ width: `${filteredData.emailMetrics.delivered}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{filteredData.emailMetrics.delivered}%</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Delivered: {filteredData.emailMetrics.delivered}%</span>
                      <span>Bounced: {100 - filteredData.emailMetrics.delivered}%</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-1">Opened</div>
                    <div className="flex items-center">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-[#17206d] h-2 rounded-full" 
                          style={{ width: `${filteredData.emailMetrics.opened}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{filteredData.emailMetrics.opened}%</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-1">Clicked Links</div>
                    <div className="flex items-center">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full" 
                          style={{ width: `${filteredData.emailMetrics.clicked}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{filteredData.emailMetrics.clicked}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-1">Replied</div>
                    <div className="flex items-center">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-sky-500 h-2 rounded-full" 
                          style={{ width: `${filteredData.emailMetrics.replied}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{filteredData.emailMetrics.replied}%</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-1">Forwarded</div>
                    <div className="flex items-center">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${filteredData.emailMetrics.forwarded}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{filteredData.emailMetrics.forwarded}%</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-1">Marked as Spam</div>
                    <div className="flex items-center">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${filteredData.emailMetrics.spam}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{filteredData.emailMetrics.spam}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fake email engagement chart */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-sm font-medium mb-4">Engagement Over Time</div>
                <div className="h-64 flex items-end justify-between relative">
                  <div className="absolute inset-0 grid grid-rows-5 w-full h-full">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="border-t border-border"></div>
                    ))}
                  </div>
                  
                  {/* Fake bars for the chart */}
                  {filteredData.emailChartData.map((item, index) => (
                    <div key={index} className="relative z-10 w-6 mx-1 flex flex-col items-center" style={{ height: '100%' }}>
                      <div className="flex flex-col items-center justify-end h-full w-full">
                        <div 
                          className="w-full bg-[#27b99c]/20 rounded-t" 
                          style={{ height: `${item.opens}%` }}
                        ></div>
                        <div 
                          className="w-full bg-[#27b99c] rounded-b" 
                          style={{ height: `${item.replies}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{item.date}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-[#27b99c]/20 mr-1"></div>
                    <span className="text-xs text-muted-foreground">Opens</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-[#27b99c] mr-1"></div>
                    <span className="text-xs text-muted-foreground">Replies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Top Performing Email Templates */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart2 size={18} className="mr-2 text-[#17206d]" />
              Top Performing Templates
            </h2>
            
            <div className="space-y-4">
              {filteredData.topEmailTemplates.map((template, index) => (
                <div key={index} className="p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">{template.name}</h3>
                    <span className="text-xs py-0.5 px-2 bg-[#27b99c]/10 text-[#27b99c] rounded-full">
                      {template.responseRate}% Response
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{template.preview}</p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Sent: {template.sent}</span>
                    <span>Open: {template.openRate}%</span>
                    <span>Click: {template.clickRate}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-sm text-[#17206d] hover:underline flex items-center justify-center">
              View All Templates
              <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
        
        {/* Call Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Call Sentiment Analysis */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <PieChart size={18} className="mr-2 text-[#17206d]" />
              Call Sentiment Analysis
            </h2>
            
            {/* Fake donut chart for sentiment */}
            <div className="relative h-48 w-48 mx-auto my-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">{filteredData.callMetrics.totalCalls}</div>
                  <div className="text-xs text-muted-foreground">Total Calls</div>
                </div>
              </div>
              <svg viewBox="0 0 100 100" className="transform -rotate-90 h-full w-full">
                {/* Positive sentiment slice */}
                <circle 
                  cx="50" cy="50" r="45" fill="transparent"
                  stroke="#10b981" strokeWidth="10"
                  strokeDasharray={`${filteredData.callMetrics.sentimentDistribution.positive * 283} 283`}
                  strokeLinecap="round"
                />
                {/* Neutral sentiment slice - stack on top of positive */}
                <circle 
                  cx="50" cy="50" r="45" fill="transparent"
                  stroke="#6b7280" strokeWidth="10"
                  strokeDasharray={`${filteredData.callMetrics.sentimentDistribution.neutral * 283} 283`}
                  strokeDashoffset={`${-filteredData.callMetrics.sentimentDistribution.positive * 283}`}
                  strokeLinecap="round"
                />
                {/* Negative sentiment slice - stack on top of positive + neutral */}
                <circle 
                  cx="50" cy="50" r="45" fill="transparent"
                  stroke="#ef4444" strokeWidth="10"
                  strokeDasharray={`${filteredData.callMetrics.sentimentDistribution.negative * 283} 283`}
                  strokeDashoffset={`${-(filteredData.callMetrics.sentimentDistribution.positive + filteredData.callMetrics.sentimentDistribution.neutral) * 283}`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            <div className="flex justify-around text-center">
              <div>
                <div className="flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 mr-1"></div>
                  <span className="text-sm">Positive</span>
                </div>
                <div className="text-lg font-semibold mt-1">
                  {Math.round(filteredData.callMetrics.sentimentDistribution.positive * 100)}%
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-gray-500 mr-1"></div>
                  <span className="text-sm">Neutral</span>
                </div>
                <div className="text-lg font-semibold mt-1">
                  {Math.round(filteredData.callMetrics.sentimentDistribution.neutral * 100)}%
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                  <span className="text-sm">Negative</span>
                </div>
                <div className="text-lg font-semibold mt-1">
                  {Math.round(filteredData.callMetrics.sentimentDistribution.negative * 100)}%
                </div>
              </div>
            </div>
          </div>
          
          {/* Call Duration & Topics */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Clock size={18} className="mr-2 text-[#17206d]" />
              Call Duration & Topics
            </h2>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Average Duration</span>
                <span className="text-sm font-medium">{filteredData.callMetrics.avgDuration} min</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-[#17206d] h-2 rounded-full" 
                  style={{ width: `${(filteredData.callMetrics.avgDuration / 15) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0 min</span>
                <span>15 min</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Most Discussed Topics</h3>
              <div className="space-y-3">
                {filteredData.callMetrics.topTopics.map((topic, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-6 w-6 rounded-full flex items-center justify-center bg-[#17206d]/10 text-[#17206d] text-xs mr-2">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <div className="text-sm">{topic.name}</div>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-[#27b99c] h-1.5 rounded-full" 
                          style={{ width: `${topic.frequency}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm font-medium ml-2">{topic.frequency}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Upcoming Follow-ups */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <CalendarCheck size={18} className="mr-2 text-[#17206d]" />
              Upcoming Follow-ups
            </h2>
            
            <div className="space-y-3">
              {filteredData.upcomingFollowups.map((followup, index) => (
                <div key={index} className="p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">{followup.company}</h3>
                    <span className={`text-xs py-0.5 px-2 rounded-full ${
                      followup.daysRemaining <= 1 
                        ? 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500' 
                        : followup.daysRemaining <= 3
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400'
                    }`}>
                      {followup.daysRemaining <= 0 
                        ? 'Today' 
                        : followup.daysRemaining === 1
                          ? 'Tomorrow'
                          : `In ${followup.daysRemaining} days`}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{followup.task}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <div className="mr-4 flex items-center">
                      <Mail size={12} className="mr-1" />
                      {followup.channel === "email" ? "Email Follow-up" : "AI Call"}
                    </div>
                    <div className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {followup.scheduledTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-sm text-[#17206d] hover:underline flex items-center justify-center">
              View All Scheduled Follow-ups
              <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
