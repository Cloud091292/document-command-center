
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, FileText, Download, Eye, CheckCircle, XCircle, Calendar } from "lucide-react";
import { MyRequest } from "@/hooks/useMyRequests";

interface RequestDetailProps {
  request: MyRequest;
  onClose: () => void;
}

export const RequestDetail = ({ request, onClose }: RequestDetailProps) => {
  const {
    title,
    documentType,
    fileType,
    fileName,
    fileSize,
    requestGroup,
    processingUnit,
    requestType,
    status,
    requestDate,
    dueDate,
    description,
    approvers,
    approvalHistory,
    sla
  } = request;

  // Format date to display in a more readable format
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Badge className={`${getStatusColor(status)} text-white`}>
              {status}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {fileType} • {fileSize}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Requested: {formatDate(requestDate)}
            </span>
            <span className={`flex items-center gap-1 font-medium ${sla.isOverdue ? 'text-red-500' : sla.daysLeft <= 2 ? 'text-yellow-500' : 'text-green-500'}`}>
              <Clock className="h-4 w-4" />
              {sla.isOverdue 
                ? `${Math.abs(sla.daysLeft)} days overdue` 
                : `${sla.daysLeft} days left`}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-md p-4 bg-muted/30">
          <h3 className="text-sm font-medium text-muted-foreground">Document Type</h3>
          <p className="font-medium">{documentType}</p>
        </div>
        <div className="border rounded-md p-4 bg-muted/30">
          <h3 className="text-sm font-medium text-muted-foreground">Processing Unit</h3>
          <p className="font-medium">{processingUnit}</p>
        </div>
        <div className="border rounded-md p-4 bg-muted/30">
          <h3 className="text-sm font-medium text-muted-foreground">Request Type</h3>
          <p className="font-medium">{requestType}</p>
        </div>
      </div>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="history">Approval History</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-4 border rounded-md min-h-[400px]">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          <div className="p-6 border rounded-lg flex flex-col items-center justify-center bg-muted/30">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium mb-2">{fileName}</h4>
            <p className="text-sm text-muted-foreground mb-4">{fileSize} • {fileType}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" /> Preview
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history" className="p-4 border rounded-md">
          <div className="relative">
            {approvalHistory.map((step, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getStatusColor(step.status)}`}>
                      {step.status === 'Approved' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : step.status === 'Rejected' ? (
                        <XCircle className="h-5 w-5" />
                      ) : (
                        step.step
                      )}
                    </div>
                    {index < approvalHistory.length - 1 && (
                      <div className="h-16 w-0.5 bg-gray-200 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted/30 p-4 rounded-md">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{step.unit}</h4>
                          <p className="text-sm text-muted-foreground">Handler: {step.handler}</p>
                        </div>
                        <Badge className={`${getStatusColor(step.status)} text-white`}>
                          {step.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{formatDate(step.date)}</p>
                      {step.comments && (
                        <div className="bg-background p-3 rounded border text-sm mt-2">
                          <p>{step.comments}</p>
                        </div>
                      )}
                      {step.attachments && step.attachments.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-1">Attachments:</p>
                          <div className="space-y-2">
                            {step.attachments.map((attachment, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm bg-background p-2 rounded border">
                                <FileText className="h-4 w-4" />
                                <span>{attachment.name}</span>
                                <span className="text-muted-foreground text-xs ml-auto">{attachment.size}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Download className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="comments" className="p-4 border rounded-md">
          <div className="text-center p-8">
            <p className="text-muted-foreground">No comments available for this request.</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Approvers</h3>
        <div className="space-y-3">
          {approvers.map((approver, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  {approver.avatarUrl ? (
                    <img src={approver.avatarUrl} alt={approver.name} className="object-cover" />
                  ) : (
                    <div className="bg-muted h-full w-full flex items-center justify-center text-xs font-medium uppercase">
                      {approver.name.charAt(0)}
                    </div>
                  )}
                </Avatar>
                <span className="font-medium">{approver.name}</span>
              </div>
              <Badge className={`${getStatusColor(approver.status)} text-white`}>
                {approver.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};
