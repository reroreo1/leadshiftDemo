import React from "react";
import { cn } from "utils/cn";
import { Upload, X } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  className?: string;
  maxSize?: number; // in bytes
  label?: string;
}

export function FileUpload({
  onFileSelect,
  accept = ".csv",
  className,
  maxSize = 5 * 1024 * 1024, // 5MB default
  label = "Upload CSV"
}: FileUploadProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    const fileType = file.name.split(".").pop()?.toLowerCase();
    const acceptedTypes = accept.split(",").map(type => type.trim().replace(".", ""));
    
    if (!acceptedTypes.includes(fileType || "")) {
      setError(`Invalid file type. Please upload a ${accept} file.`);
      return false;
    }
    
    // Check file size
    if (file.size > maxSize) {
      const sizeMB = maxSize / (1024 * 1024);
      setError(`File is too large. Maximum size is ${sizeMB} MB.`);
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center space-y-2 transition-colors",
          dragActive ? "border-[#27b99c] bg-[#27b99c]/5" : "border-border",
          selectedFile ? "bg-muted" : "bg-background",
          error ? "border-red-500" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-md bg-[#17206d] flex items-center justify-center">
                <span className="text-white text-xs font-medium">CSV</span>
              </div>
              <div>
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted-foreground/10 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="h-12 w-12 rounded-full bg-[#17206d]/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-[#17206d]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Drag and drop your file here or click to browse
              </p>
            </div>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept={accept}
              onChange={handleFileSelect}
            />
          </>
        )}

        {!selectedFile && (
          <label
            htmlFor="file-upload"
            className="mt-2 inline-flex items-center px-4 py-2 bg-[#17206d] text-white text-sm font-medium rounded-md hover:bg-[#17206d]/90 focus:outline-none cursor-pointer"
          >
            Select File
          </label>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      
      {!error && selectedFile && (
        <p className="text-[#27b99c] text-xs mt-1">
          File selected successfully. Click Upload to process.
        </p>
      )}
    </div>
  );
}
