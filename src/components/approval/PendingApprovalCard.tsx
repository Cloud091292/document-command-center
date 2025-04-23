
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { FileText, Clock, Eye, AlertCircle, CheckCircle2 } from "lucide-react";
import { PendingApproval } from "@/hooks/usePendingApprovals";

interface PendingApprovalCardProps {
  approval: PendingApproval;
  onSelect: (approval: PendingApproval) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const PendingApprovalCard = ({
  approval,
  onSelect,
  onApprove,
  onReject,
}: PendingApprovalCardProps) => {
  const {
    id,
    title,
    documentType,
    fileType,
    sender,
    requestDate,
    dueDate,
    priority,
    sla,
    approvalStep
  } = approval;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-gray-500 hover:bg-gray-600";
      case "Medium":
        return "bg-blue-500 hover:bg-blue-600";
      case "High":
        return "bg-orange-500 hover:bg-orange-600";
      case "Urgent":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Format date to display in a more readable format
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Translate priority to Vietnamese
  const translatePriority = (priority: string) => {
    switch (priority) {
      case "Low": return "Thấp";
      case "Medium": return "Trung bình";
      case "High": return "Cao";
      case "Urgent": return "Khẩn cấp";
      default: return priority;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>{fileType} • {documentType}</span>
            </div>
          </div>
          <Badge 
            className={`${getPriorityColor(priority)} text-white whitespace-nowrap`}
          >
            {translatePriority(priority)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {sender.avatar ? (
                <img src={sender.avatar} alt={sender.name} className="h-full w-full object-cover" />
              ) : (
                <div className="bg-muted h-full w-full flex items-center justify-center text-xs font-medium uppercase">
                  {sender.name.charAt(0)}
                </div>
              )}
            </Avatar>
            <div>
              <p className="text-sm font-medium">{sender.name}</p>
              <p className="text-xs text-muted-foreground">{sender.department}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Ngày gửi</p>
              <p className="font-medium">{formatDate(requestDate)}</p>
            </div>
            <div className="flex items-start gap-1">
              <p className="text-muted-foreground mr-1">SLA:</p>
              <span className={`font-medium flex items-center ${sla.isOverdue ? 'text-red-500' : sla.daysLeft <= 2 ? 'text-yellow-500' : 'text-green-500'}`}>
                <Clock className="h-3.5 w-3.5 mr-1" />
                {sla.isOverdue 
                  ? `Quá hạn ${Math.abs(sla.daysLeft)} ngày` 
                  : `Còn ${sla.daysLeft} ngày`}
              </span>
            </div>
          </div>

          <div className="bg-muted/50 p-2 rounded-md">
            <p className="text-xs text-muted-foreground mb-1">Bước phê duyệt</p>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(approvalStep.current / approvalStep.total) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs whitespace-nowrap">{approvalStep.current}/{approvalStep.total}</span>
            </div>
            <p className="text-xs mt-1 font-medium">{approvalStep.name}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onSelect(approval)}
        >
          <Eye className="h-4 w-4 mr-1" />
          Xem chi tiết
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => onReject(id)}
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            Từ chối
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-green-500 hover:text-green-600 hover:bg-green-50"
            onClick={() => onApprove(id)}
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Phê duyệt
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
