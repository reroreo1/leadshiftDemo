import React, { useState, useEffect } from "react";
import { DashboardLayout } from "components/DashboardLayout";
import { FileUpload } from "components/FileUpload";
import { DataTable } from "components/DataTable";
import brain from "brain";
import { toast, Toaster } from "sonner";
import { Filter, RefreshCw, SlidersHorizontal, Trash2, MailPlus, Phone, Mail, ChevronDown, CheckCircle2, X, Download, Upload, Search, XCircle, ArrowRight } from "lucide-react";
import { getApiUrl } from "utils/api";
import { generateFakeLeads } from "utils/fakeData";
import { useNavigate } from "react-router-dom";

interface Lead {
  id: string;
  company_name: string;
  email: string | null;
  phone: string | null;
  industry: string | null;
  location: string | null;
  capital: string | null;
  score: number | null;
  website: string | null;
  status: string;
  created_at: string;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<(string | number)[]>([]);
  const [bulkActionMenuOpen, setBulkActionMenuOpen] = useState(false);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [filterText, setFilterText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    scoreMin: 0,
    scoreMax: 100,
    industry: "all",
    location: "all",
    status: "all"
  });
  
  const navigate = useNavigate();

  const handleSendBulkEmail = () => {
    if (selectedLeads.length === 0) return;
    toast.success(`Preparing email campaign for ${selectedLeads.length} leads`);
    // Would implement actual email sending functionality here
  };

  const handleBulkAICall = () => {
    if (selectedLeads.length === 0) return;
    toast.success(`Preparing AI calls for ${selectedLeads.length} leads`);
    // Would implement actual AI call functionality here
  };

  const handleExportSelected = () => {
    if (selectedLeads.length === 0) return;
    toast.success(`Exporting ${selectedLeads.length} leads`);
    // Would implement actual export functionality here
  };
  
  const toggleBulkActionMenu = () => {
    setBulkActionMenuOpen(!bulkActionMenuOpen);
  };
  
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await brain.get_all_leads();
      const data = await response.json();
      
      // If no leads returned from API, use fake data for demonstration
      if (data.leads && data.leads.length === 0) {
        const fakeLeads = generateFakeLeads(15);
        setLeads(fakeLeads);
        setFilteredLeads(fakeLeads);
      } else {
        setLeads(data.leads);
        setFilteredLeads(data.leads);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Use fake data if API fails
      const fakeLeads = generateFakeLeads(15);
      setLeads(fakeLeads);
      setFilteredLeads(fakeLeads);
      toast.error("Using demo data - API connection failed");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to leads
  const applyFilters = () => {
    let result = [...leads];
    
    // Apply text search filter
    if (filterText) {
      const searchLower = filterText.toLowerCase();
      result = result.filter(lead => 
        (lead.company_name && lead.company_name.toLowerCase().includes(searchLower)) ||
        (lead.email && lead.email.toLowerCase().includes(searchLower)) ||
        (lead.phone && lead.phone.toLowerCase().includes(searchLower)) ||
        (lead.industry && lead.industry.toLowerCase().includes(searchLower)) ||
        (lead.location && lead.location.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply range filter for score
    result = result.filter(lead => {
      if (lead.score === null) return filters.status === "pending";
      return lead.score >= filters.scoreMin && lead.score <= filters.scoreMax;
    });
    
    // Apply industry filter
    if (filters.industry !== "all") {
      result = result.filter(lead => lead.industry === filters.industry);
    }
    
    // Apply location filter
    if (filters.location !== "all") {
      result = result.filter(lead => lead.location === filters.location);
    }
    
    // Apply status filter
    if (filters.status !== "all") {
      if (filters.status === "pending") {
        result = result.filter(lead => lead.score === null);
      } else {
        result = result.filter(lead => lead.status === filters.status);
      }
    }
    
    setFilteredLeads(result);
  };
  
  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      scoreMin: 0,
      scoreMax: 100,
      industry: "all",
      location: "all",
      status: "all"
    });
    setFilterText("");
  };
  
  // Apply filters whenever filters or leads change
  useEffect(() => {
    applyFilters();
  }, [filters, leads, filterText]);
  
  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);
  
  // Get unique industries and locations for filters
  const uniqueIndustries = Array.from(new Set(leads.map(lead => lead.industry).filter(Boolean)));
  const uniqueLocations = Array.from(new Set(leads.map(lead => lead.location).filter(Boolean)));

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a CSV file first");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(getApiUrl("api/leads/upload"), {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      toast.success(`Successfully uploaded ${data.count} leads`);
      fetchLeads();
      setSelectedFile(null);
      setShowUploadPanel(false);
    } catch (error) {
      console.error("Error uploading CSV:", error);
      toast.error("Failed to upload CSV file");
    } finally {
      setUploading(false);
    }
  };

  const columns = [
    {
      key: "company_name",
      header: "Company",
      cell: (lead: Lead) => (
        <div>
          <div className="font-medium">{lead.company_name}</div>
          {lead.website && (
            <a 
              href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline"
            >
              {lead.website}
            </a>
          )}
        </div>
      ),
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      cell: (lead: Lead) => lead.email || "—",
      sortable: true,
    },
    {
      key: "phone",
      header: "Phone",
      cell: (lead: Lead) => lead.phone || "—",
      sortable: true,
    },
    {
      key: "industry",
      header: "Industry",
      cell: (lead: Lead) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400">
          {lead.industry || "Unknown"}
        </span>
      ),
      sortable: true,
    },
    {
      key: "location",
      header: "Location",
      cell: (lead: Lead) => lead.location || "—",
      sortable: true,
    },
    {
      key: "score",
      header: "Lead Score",
      cell: (lead: Lead) => {
        if (lead.score === null) return "Pending";
        
        return (
          <div className="flex items-center">
            <div className={`h-2 w-2 rounded-full ${
              lead.score >= 80 ? "bg-emerald-500" :
              lead.score >= 60 ? "bg-[#17206d]" :
              lead.score >= 40 ? "bg-yellow-500" :
              lead.score >= 20 ? "bg-orange-500" :
              "bg-red-500"
            } mr-2`}></div>
            <span>{lead.score}</span>
          </div>
        );
      },
      sortable: true,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (lead: Lead) => (
        <div className="flex space-x-2">
          <button 
            className="p-1 text-muted-foreground hover:text-[#27b99c] hover:bg-[#27b99c]/10 rounded transition-colors" 
            title="Send Email"
            onClick={() => {
              toast.success(`Preparing email to ${lead.company_name}`);
            }}
          >
            <Mail size={16} />
          </button>
          <button 
            className="p-1 text-muted-foreground hover:text-[#17206d] hover:bg-[#17206d]/10 rounded transition-colors" 
            title="AI Call"
            onClick={() => {
              toast.success(`Initiating AI call to ${lead.company_name}`);
            }}
          >
            <Phone size={16} />
          </button>
          <button 
            className="p-1 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded transition-colors" 
            title="View Details"
            onClick={() => {
              navigate(`/LeadDetails?id=${lead.id}`);
            }}
          >
            <ArrowRight size={16} />
          </button>
          <button className="p-1 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Toaster position="top-right" richColors />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Leads Management</h1>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowUploadPanel(!showUploadPanel)}
              className="flex items-center px-3 py-2 text-sm bg-[#17206d] text-white rounded-md hover:bg-[#17206d]/90 focus:outline-none"
            >
              <Upload size={16} className="mr-2" />
              Upload Leads
            </button>
            
            <button 
              onClick={fetchLeads}
              className="flex items-center p-2 text-muted-foreground rounded hover:bg-muted transition-colors"
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Upload Panel */}
        {showUploadPanel && (
          <div className="mb-6 p-4 bg-card rounded-lg border border-border">
            <h2 className="text-lg font-medium mb-4">Upload Company List</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <FileUpload onFileSelect={handleFileSelect} />
              </div>
              <div className="flex flex-col justify-end space-y-4">
                <p className="text-sm text-muted-foreground">
                  Upload a CSV file with company details. The system will automatically extract relevant information.
                </p>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowUploadPanel(false)}
                    className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading}
                    className="px-4 py-2 text-sm bg-[#17206d] text-white rounded-md hover:bg-[#17206d]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <span className="mr-2">Uploading...</span>
                        <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin inline-block" />
                      </>
                    ) : (
                      "Upload and Process"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Actions Toolbar */}
        {selectedLeads.length > 0 && (
          <div className="mb-4 p-3 bg-[#17206d]/5 border border-[#17206d]/20 rounded-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CheckCircle2 size={18} className="text-[#27b99c]" />
              <span className="text-sm font-medium">{selectedLeads.length} {selectedLeads.length === 1 ? 'lead' : 'leads'} selected</span>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedLeads([])}
                className="flex items-center px-2 py-1 text-xs text-muted-foreground hover:text-foreground rounded"
              >
                <X size={14} className="mr-1" />
                Clear
              </button>
              
              <div className="relative">
                <button 
                  onClick={toggleBulkActionMenu}
                  className="flex items-center px-3 py-1.5 text-xs bg-white dark:bg-black rounded shadow-sm border border-border"
                >
                  <span>Bulk Actions</span>
                  <ChevronDown size={14} className="ml-1" />
                </button>
                
                {bulkActionMenuOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-card rounded-md shadow-lg border border-border z-10">
                    <div className="p-1">
                      <button 
                        onClick={handleSendBulkEmail}
                        className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-[#27b99c]/10 hover:text-[#27b99c] rounded-md"
                      >
                        <MailPlus size={16} className="mr-2" />
                        Send Bulk Email
                      </button>
                      <button 
                        onClick={handleBulkAICall}
                        className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-[#17206d]/10 hover:text-[#17206d] rounded-md"
                      >
                        <Phone size={16} className="mr-2" />
                        Bulk AI Call
                      </button>
                      <button 
                        onClick={handleExportSelected}
                        className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md"
                      >
                        <Download size={16} className="mr-2" />
                        Export Selected
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleSendBulkEmail}
                className="flex items-center px-3 py-1.5 text-xs bg-[#27b99c] text-white rounded shadow-sm hover:bg-[#27b99c]/90"
              >
                <MailPlus size={14} className="mr-1" />
                Send Bulk Email
              </button>
              
              <button 
                onClick={handleBulkAICall}
                className="flex items-center px-3 py-1.5 text-xs bg-[#17206d] text-white rounded shadow-sm hover:bg-[#17206d]/90"
              >
                <Phone size={14} className="mr-1" />
                Bulk AI Call
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-4 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{filteredLeads.length}</span> 
                {filteredLeads.length !== leads.length && (
                  <span> of <span className="font-medium">{leads.length}</span></span>
                )} leads
              </div>
              
              {/* Lead Quality Distribution Pills */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-muted-foreground">High: {leads.filter(l => l.score && l.score >= 80).length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-[#17206d]"></div>
                  <span className="text-xs text-muted-foreground">Good: {leads.filter(l => l.score && l.score >= 60 && l.score < 80).length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-muted-foreground">Medium: {leads.filter(l => l.score && l.score >= 40 && l.score < 60).length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <span className="text-xs text-muted-foreground">Poor: {leads.filter(l => l.score && l.score >= 20 && l.score < 40).length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span className="text-xs text-muted-foreground">Low: {leads.filter(l => l.score && l.score < 20).length}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <div className="relative max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search leads..."
                  className="block w-full pl-10 pr-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-[#27b99c] focus:border-[#27b99c]"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                {filterText && (
                  <button 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setFilterText("")}
                  >
                    <XCircle size={16} className="text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
              
              <button 
                className={`flex items-center p-2 text-muted-foreground ${showFilters ? 'bg-[#17206d]/10 text-[#17206d]' : 'bg-muted'} rounded hover:bg-muted/70 transition-colors`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={16} className="mr-2" />
                <span className="text-sm">Filters</span>
              </button>
            </div>
          </div>
          
          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Advanced Filters</h3>
                <button 
                  onClick={resetFilters}
                  className="text-xs text-muted-foreground hover:text-[#17206d] flex items-center"
                >
                  <X size={14} className="mr-1" />
                  Reset Filters
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Score Range Filter */}
                <div>
                  <label className="block text-xs font-medium mb-1">Lead Score</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Min</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="100" 
                        value={filters.scoreMin}
                        onChange={(e) => handleFilterChange('scoreMin', parseInt(e.target.value, 10))}
                        className="w-full border border-border bg-background px-2 py-1 text-xs rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Max</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="100" 
                        value={filters.scoreMax}
                        onChange={(e) => handleFilterChange('scoreMax', parseInt(e.target.value, 10))}
                        className="w-full border border-border bg-background px-2 py-1 text-xs rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Industry Filter */}
                <div>
                  <label className="block text-xs font-medium mb-1">Industry</label>
                  <select
                    value={filters.industry}
                    onChange={(e) => handleFilterChange('industry', e.target.value)}
                    className="w-full border border-border bg-background px-2 py-1 text-xs rounded-md"
                  >
                    <option value="all">All Industries</option>
                    {uniqueIndustries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                {/* Location Filter */}
                <div>
                  <label className="block text-xs font-medium mb-1">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full border border-border bg-background px-2 py-1 text-xs rounded-md"
                  >
                    <option value="all">All Locations</option>
                    {uniqueLocations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                {/* Status Filter */}
                <div>
                  <label className="block text-xs font-medium mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full border border-border bg-background px-2 py-1 text-xs rounded-md"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending Score</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="disqualified">Disqualified</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Leads Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <DataTable
            data={filteredLeads}
            columns={columns}
            isLoading={loading}
            emptyMessage="No leads found. Upload a CSV file to get started."
            keyExtractor={(lead) => lead.id}
            selectable={true}
            selectedItems={selectedLeads}
            onSelectionChange={setSelectedLeads}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}