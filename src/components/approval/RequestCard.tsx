
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Eye } from "lucide-react";
import { MyRequest } from "@/hooks/useMyRequests";
import { Avatar } from "@/components/ui/avatar";

interface RequestCardProps {
  request: MyRequest;
  onSelect: (request: MyRequest) => void;
}

export const RequestCard = ({ request, onSelect }: RequestCardProps) => {
  const {
    title,
    documentType,
    fileType,
    requestGroup,
    processingUnit,
    status,
    requestDate,
    dueDate,
    approvers,
    sla
  } = request;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500 hover:bg-green-600";
      case "Rejected":
        return "bg-red-500 hover:bg-red-600";
      case "Pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "InProgress":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Format date to display in a more readable format
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>{fileType} • {requestGroup}</span>
            </div>
          </div>
          <Badge 
            className={`${getStatusColor(status)} text-white whitespace-nowrap`}
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Document Type</p>
              <p className="font-medium">{documentType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Processing Unit</p>
              <p className="font-medium">{processingUnit}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Requested</p>
              <p className="font-medium">{formatDate(requestDate)}</p>
            </div>
            <div className="flex items-start gap-1">
              <p className="text-muted-foreground mr-1">SLA:</p>
              <span className={`font-medium flex items-center ${sla.isOverdue ? 'text-red-500' : sla.daysLeft <= 2 ? 'text-yellow-500' : 'text-green-500'}`}>
                <Clock className="h-3.5 w-3.5 mr-1" />
                {sla.isOverdue 
                  ? `${Math.abs(sla.daysLeft)} days overdue` 
                  : `${sla.daysLeft} days left`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="px-6 py-2 border-t">
        <p className="text-sm text-muted-foreground mb-1">Approvers:</p>
        <div className="flex items-center gap-3">
          {approvers.map((approver, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-8 w-8 border-2 border-background relative">
                {approver.avatarUrl ? (
                  <img src={approver.avatarUrl} alt={approver.name} className="object-cover" />
                ) : (
                  <div className="bg-muted h-full w-full flex items-center justify-center text-xs font-medium uppercase">
                    {approver.name.charAt(0)}
                  </div>
                )}
                <span 
                  className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-1 ring-white
                    ${approver.status === 'Approved' ? 'bg-green-500' : 
                      approver.status === 'Rejected' ? 'bg-red-500' : 
                      approver.status === 'InProgress' ? 'bg-blue-500' : 
                      'bg-yellow-500'}`}
                />
              </Avatar>
            </div>
          ))}
        </div>
      </div>
      <CardFooter className="pt-2 pb-4 flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center" 
          onClick={() => onSelect(request)}
        >
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
