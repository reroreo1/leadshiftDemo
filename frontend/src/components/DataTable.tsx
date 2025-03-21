import React from "react";
import { cn } from "utils/cn";
import { Check, CheckCircle2, Circle } from "lucide-react";

type SortDirection = "asc" | "desc" | null;

interface Column<T> {
  key: string;
  header: string;
  cell: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  keyExtractor: (item: T) => string | number;
  selectable?: boolean;
  selectedItems?: (string | number)[];
  onSelectionChange?: (selectedKeys: (string | number)[]) => void;
}

export function DataTable<T>({ 
  data, 
  columns, 
  className,
  emptyMessage = "No data available",
  isLoading = false,
  keyExtractor,
  selectable = false,
  selectedItems = [],
  onSelectionChange
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);

  const handleSort = (key: string) => {
    // Find if the column is sortable
    const column = columns.find(col => col.key === key);
    if (!column?.sortable) return;

    // Toggle sort direction or set new sort key
    if (sortKey === key) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortKey(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (key: string) => {
    if (sortKey !== key) return null;
    
    if (sortDirection === "asc") {
      return <span className="ml-1">↑</span>;
    } else if (sortDirection === "desc") {
      return <span className="ml-1">↓</span>;
    }
    
    return null;
  };

  // Apply sorting if needed
  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDirection) return data;
    
    return [...data].sort((a: any, b: any) => {
      if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  // Handle selection
  const handleToggleSelect = (key: string | number) => {
    if (!onSelectionChange) return;
    
    const newSelectedItems = [...selectedItems];
    const index = newSelectedItems.indexOf(key);
    
    if (index === -1) {
      newSelectedItems.push(key);
    } else {
      newSelectedItems.splice(index, 1);
    }
    
    onSelectionChange(newSelectedItems);
  };
  
  // Handle select all
  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    
    if (selectedItems.length === sortedData.length) {
      onSelectionChange([]);
    } else {
      const allKeys = sortedData.map(item => keyExtractor(item));
      onSelectionChange(allKeys);
    }
  };

  // Get selection status
  const allSelected = data.length > 0 && selectedItems.length === data.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < data.length;

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-muted">
          <tr>
            {selectable && (
              <th className="w-10 px-4 py-3">
                <div 
                  className="flex items-center justify-center cursor-pointer"
                  onClick={handleSelectAll}
                >
                  {allSelected ? (
                    <CheckCircle2 size={18} className="text-[#27b99c]" />
                  ) : someSelected ? (
                    <div className="relative">
                      <Circle size={18} className="text-[#27b99c]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#27b99c] rounded-full" />
                      </div>
                    </div>
                  ) : (
                    <Circle size={18} className="text-muted-foreground" />
                  )}
                </div>
              </th>
            )}
            {columns.map((column) => (
              <th 
                key={column.key} 
                className={cn(
                  "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap",
                  column.sortable && "cursor-pointer hover:bg-muted-foreground/10",
                )}
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && getSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={selectable ? columns.length + 1 : columns.length} className="px-4 py-8 text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-[#17206d] animate-spin" />
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={selectable ? columns.length + 1 : columns.length} className="px-4 py-8 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((item) => {
              const itemKey = keyExtractor(item);
              const isSelected = selectedItems.includes(itemKey);
              
              return (
                <tr key={itemKey} className={cn(
                  "border-b border-border hover:bg-muted/30",
                  isSelected && "bg-[#17206d]/5"
                )}>
                  {selectable && (
                    <td className="w-10 px-4 py-3">
                      <div 
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() => handleToggleSelect(itemKey)}
                      >
                        {isSelected ? (
                          <CheckCircle2 size={18} className="text-[#27b99c]" />
                        ) : (
                          <Circle size={18} className="text-muted-foreground hover:text-[#27b99c]" />
                        )}
                      </div>
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm">
                      {column.cell(item)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
