
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Flag, Eye, Clock } from "lucide-react";
import { format } from "date-fns";
import { ApprovalDocument } from "@/hooks/useApprovalDocuments";

interface ApprovalDocumentCardProps {
  document: ApprovalDocument;
  onSelect: (document: ApprovalDocument) => void;
}

export const ApprovalDocumentCard: React.FC<ApprovalDocumentCardProps> = ({
  document,
  onSelect,
}) => {
  // Helper function to determine badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return "bg-green-100 text-green-800";
      case 'Rejected':
        return "bg-red-100 text-red-800";
      case 'Pending':
        return "bg-yellow-100 text-yellow-800";
      case 'InProgress':
        return "bg-blue-100 text-blue-800";
      case 'Returned':
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to determine priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return "text-red-600";
      case 'High':
        return "text-orange-500";
      case 'Medium':
        return "text-yellow-500";
      case 'Low':
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  // Calculate days remaining until due date
  const daysRemaining = Math.ceil((document.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <h3 className="font-medium line-clamp-1" title={document.title}>
                {document.title}
              </h3>
            </div>
            <div className="text-sm text-muted-foreground">
              {document.requester} • {document.requesterUnit}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline">{document.type}</Badge>
              <Badge className={getStatusColor(document.status)}>
                {document.status}
              </Badge>
            </div>
          </div>
          <div>
            <Flag className={`h-5 w-5 ${getPriorityColor(document.priority)}`} />
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{format(document.requestDate, "MMM dd, yyyy")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className={daysRemaining < 3 ? "text-red-500 font-medium" : ""}>
                {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
              </span>
            </div>
          </div>
          <Button size="sm" variant="ghost" onClick={() => onSelect(document)}>
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
