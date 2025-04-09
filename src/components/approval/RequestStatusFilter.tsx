
import React from "react";
import { cn } from "@/lib/utils";

interface RequestStatusFilterProps {
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  counts: Record<string, number>;
}

export const RequestStatusFilter = ({
  selectedStatus,
  onSelectStatus,
  counts,
}: RequestStatusFilterProps) => {
  const statuses = [
    { id: "all", label: "All Requests" },
    { id: "Pending", label: "Pending" },
    { id: "InProgress", label: "In Progress" },
    { id: "Approved", label: "Approved" },
    { id: "Rejected", label: "Rejected" },
  ];

  // Calculate total count for "All" filter
  const totalCount = Object.values(counts).reduce((acc, count) => acc + count, 0);

  return (
    <div className="border-b overflow-x-auto">
      <div className="flex min-w-max">
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => onSelectStatus(status.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap",
              "border-b-2 border-transparent hover:text-foreground transition-colors",
              selectedStatus === status.id
                ? "border-primary text-foreground"
                : "text-muted-foreground"
            )}
          >
            {status.label}
            <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs bg-muted">
              {status.id === "all" ? totalCount : counts[status.id] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
