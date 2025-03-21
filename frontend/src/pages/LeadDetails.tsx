import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "components/DashboardLayout";
import { ArrowLeft, Building, Mail, Phone, Globe, MapPin, DollarSign, BarChart, CheckCircle, XCircle, Clock, MessageSquare, MailCheck, PhoneOutgoing, ChevronRight } from "lucide-react";
import { generateFakeLeadDetails } from "utils/fakeData";

export default function LeadDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get("id");
  
  // Get fake lead details using the ID from the query parameter
  const leadDetails = generateFakeLeadDetails(leadId || "unknown");
  
  // Function to render sentiment badge
  const renderSentimentBadge = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-500">
            <CheckCircle size={12} className="mr-1" />
            Positive
          </span>
        );
      case "negative":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">
            <XCircle size={12} className="mr-1" />
            Negative
          </span>
        );
      case "neutral":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400">
            <Clock size={12} className="mr-1" />
            Neutral
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400">
            {sentiment}
          </span>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Back button and header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate("/Leads")} 
            className="mr-4 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{leadDetails.company.name}</h1>
            <p className="text-muted-foreground">{leadDetails.company.industry} • {leadDetails.company.location}</p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <button className="px-4 py-2 text-sm bg-[#27b99c] text-white rounded-md hover:bg-[#27b99c]/90">
              <MailCheck size={16} className="mr-2 inline" />
              Send Email
            </button>
            <button className="px-4 py-2 text-sm bg-[#17206d] text-white rounded-md hover:bg-[#17206d]/90">
              <PhoneOutgoing size={16} className="mr-2 inline" />
              AI Call
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company Details */}
          <div className="bg-card rounded-lg border border-border p-6 lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Building size={18} className="mr-2 text-[#17206d]" />
              Company Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="w-32 text-muted-foreground">Website</div>
                <div>
                  <a 
                    href={`https://${leadDetails.company.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#17206d] hover:underline flex items-center"
                  >
                    {leadDetails.company.website}
                    <Globe size={14} className="ml-1 inline" />
                  </a>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-32 text-muted-foreground">Email</div>
                <div>{leadDetails.company.email}</div>
              </div>
              
              <div className="flex">
                <div className="w-32 text-muted-foreground">Phone</div>
                <div>{leadDetails.company.phone}</div>
              </div>
              
              <div className="flex">
                <div className="w-32 text-muted-foreground">Location</div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1 text-muted-foreground" />
                  {leadDetails.company.location}
                </div>
              </div>
              
              <div className="flex">
                <div className="w-32 text-muted-foreground">Industry</div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400">
                    {leadDetails.company.industry}
                  </span>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-32 text-muted-foreground">Capital</div>
                <div className="flex items-center">
                  <DollarSign size={14} className="mr-1 text-muted-foreground" />
                  {leadDetails.company.capital}
                </div>
              </div>
              
              <div className="flex">
                <div className="w-32 text-muted-foreground">Lead Score</div>
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${
                    leadDetails.company.score >= 80 ? "bg-emerald-500" :
                    leadDetails.company.score >= 60 ? "bg-[#17206d]" :
                    leadDetails.company.score >= 40 ? "bg-yellow-500" :
                    leadDetails.company.score >= 20 ? "bg-orange-500" :
                    "bg-red-500"
                  } mr-2`}></div>
                  <span>{leadDetails.company.score}/100</span>
                  <BarChart size={14} className="ml-2 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-md font-medium mb-2">Key Contacts</h3>
              <div className="space-y-4">
                {leadDetails.contacts.map((contact, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-[#17206d]/10 flex items-center justify-center text-[#17206d] font-medium mr-3">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.title}</div>
                      <div className="flex space-x-3 mt-1">
                        <a href={`mailto:${contact.email}`} className="text-xs text-[#17206d] hover:underline">
                          <Mail size={12} className="inline mr-1" />
                          {contact.email}
                        </a>
                        <a href={`tel:${contact.phone}`} className="text-xs text-[#17206d] hover:underline">
                          <Phone size={12} className="inline mr-1" />
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call History and Emails */}
          <div className="lg:col-span-2 space-y-6">
            {/* Call History */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Phone size={18} className="mr-2 text-[#17206d]" />
                Call History
              </h2>
              
              <div className="space-y-6">
                {leadDetails.calls.map((call, index) => (
                  <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{call.title}</div>
                      <div className="text-sm text-muted-foreground">{call.date}</div>
                    </div>
                    
                    <div className="flex items-center mb-3 space-x-3">
                      {renderSentimentBadge(call.sentiment)}
                      <span className="text-sm text-muted-foreground">{call.duration} minutes</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-1">Call Summary</div>
                      <p className="text-sm text-muted-foreground">{call.summary}</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-1">Key Points</div>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {call.keyPoints.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-sm font-medium mb-1">Action Items</div>
                    <div className="space-y-2">
                      {call.actionItems.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-start">
                          <div className={`h-5 w-5 rounded-full ${action.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-yellow-100 text-yellow-600'} flex items-center justify-center text-xs mr-2 flex-shrink-0`}>
                            {action.completed ? '✓' : '!'}
                          </div>
                          <div>
                            <div className="text-sm">{action.text}</div>
                            {action.completed && (
                              <div className="text-xs text-muted-foreground">
                                Completed on {action.completedDate}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Communication */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Mail size={18} className="mr-2 text-[#17206d]" />
                Email Communication
              </h2>
              
              <div className="space-y-4">
                {leadDetails.emails.map((email, index) => (
                  <div key={index} className="flex items-start p-3 rounded-md border border-border hover:bg-muted/40 transition-colors group cursor-pointer">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white mr-3 ${email.type === 'sent' ? 'bg-[#27b99c]' : 'bg-[#17206d]'}`}>
                      {email.type === 'sent' ? (
                        <Mail size={14} />
                      ) : (
                        <MessageSquare size={14} />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div className="font-medium">{email.subject}</div>
                        <div className="text-sm text-muted-foreground">{email.date}</div>
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-2 mt-1">{email.preview}</div>
                      <div className="mt-2 space-x-2 flex items-center">
                        {email.status && (
                          <span className="text-xs px-2 py-0.5 bg-muted rounded">
                            {email.status}
                          </span>
                        )}
                        {email.metrics && Object.entries(email.metrics).map(([key, value], i) => (
                          <span key={i} className="text-xs text-muted-foreground">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-sm text-[#17206d] hover:underline">
                  View All Communication History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}