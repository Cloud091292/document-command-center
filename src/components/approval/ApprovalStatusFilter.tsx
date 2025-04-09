
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApprovalStatus } from "@/hooks/useApprovalDocuments";

interface ApprovalStatusFilterProps {
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  counts: Record<string, number>;
}

export const ApprovalStatusFilter: React.FC<ApprovalStatusFilterProps> = ({
  selectedStatus,
  onSelectStatus,
  counts,
}) => {
  return (
    <Tabs value={selectedStatus} onValueChange={onSelectStatus} className="w-full">
      <TabsList className="w-full justify-start overflow-auto">
        <TabsTrigger value="all">
          All ({Object.values(counts).reduce((a, b) => a + b, 0)})
        </TabsTrigger>
        <TabsTrigger value="Pending">
          Pending ({counts.Pending || 0})
        </TabsTrigger>
        <TabsTrigger value="InProgress">
          In Progress ({counts.InProgress || 0})
        </TabsTrigger>
        <TabsTrigger value="Approved">
          Approved ({counts.Approved || 0})
        </TabsTrigger>
        <TabsTrigger value="Rejected">
          Rejected ({counts.Rejected || 0})
        </TabsTrigger>
        <TabsTrigger value="Returned">
          Returned ({counts.Returned || 0})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
