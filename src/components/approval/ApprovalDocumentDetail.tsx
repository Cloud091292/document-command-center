
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Download, FileText, PenLine, Stamp, CheckCircle2,
  XCircle, RotateCcw, File, Calendar, Clock, Flag 
} from "lucide-react";
import { format } from "date-fns";
import { ApprovalDocument, ApprovalStatus } from "@/hooks/useApprovalDocuments";

interface ApprovalDocumentDetailProps {
  document: ApprovalDocument;
  onClose: () => void;
  onUpdateStatus: (id: string, status: ApprovalStatus, comment?: string) => void;
}

export const ApprovalDocumentDetail: React.FC<ApprovalDocumentDetailProps> = ({
  document,
  onClose,
  onUpdateStatus,
}) => {
  const [comment, setComment] = React.useState('');
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);
  
  // Helper function to determine status badge color
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

  const handleAction = () => {
    if (!selectedAction) return;
    
    let status: ApprovalStatus;
    switch (selectedAction) {
      case 'sign-initial':
      case 'sign-final':
      case 'stamp':
      case 'approve':
        status = 'Approved';
        break;
      case 'reject':
        status = 'Rejected';
        break;
      case 'reset':
        status = 'Pending';
        break;
      default:
        return;
    }
    
    onUpdateStatus(document.id, status, comment);
    onClose();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">{document.title}</h2>
            <div className="mt-1 text-sm text-muted-foreground">
              {document.requester} • {document.requesterUnit}
            </div>
          </div>
          <Badge className={getStatusColor(document.status)}>
            {document.status}
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-muted-foreground">Document Type</div>
            <div className="font-medium">{document.type}</div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Request Date</div>
              <div className="font-medium">{format(document.requestDate, "MMM dd, yyyy")}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Due Date</div>
              <div className="font-medium">{format(document.dueDate, "MMM dd, yyyy")}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Flag className={`h-4 w-4 mt-0.5 ${getPriorityColor(document.priority)}`} />
            <div>
              <div className="text-xs text-muted-foreground">Priority</div>
              <div className="font-medium">{document.priority}</div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column - Document info */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{document.description}</p>
            </div>

            {/* Document Preview */}
            <div>
              <h3 className="text-lg font-medium mb-2">Document Preview</h3>
              <div className="border rounded-md p-8 flex flex-col items-center justify-center bg-muted/30">
                <FileText className="h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">{document.fileName}</p>
                <p className="text-xs text-muted-foreground">{document.fileSize}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
                      <File className="h-4 w-4 mr-2" /> View File
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={document.fileUrl} download>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Approval History */}
            <div>
              <h3 className="text-lg font-medium mb-4">Approval History</h3>
              <div className="space-y-4">
                {document.approvalHistory.map((step, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <Badge variant="outline">Step {step.step}</Badge>
                        <span className="font-medium">{step.unit}</span>
                      </div>
                      <Badge className={getStatusColor(step.status)}>
                        {step.status}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium">{step.handler}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {format(step.date, "MMM dd, yyyy")}
                        </span>
                      </div>
                      {step.comments && (
                        <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                          {step.comments}
                        </div>
                      )}
                      {step.attachments && step.attachments.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium mb-1">Attachments:</p>
                          <div className="flex gap-2 flex-wrap">
                            {step.attachments.map((attachment, idx) => (
                              <Button key={idx} variant="outline" size="sm" className="text-xs" asChild>
                                <a href={attachment.url} download>
                                  <File className="h-3 w-3 mr-1" /> 
                                  {attachment.name} ({attachment.size})
                                </a>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Approval actions */}
          <div className="lg:col-span-2">
            <div className="border rounded-md p-4 sticky top-0">
              <h3 className="text-lg font-medium mb-4">Approval Actions</h3>
              <RadioGroup className="gap-3" onValueChange={setSelectedAction}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sign-initial" id="sign-initial" />
                  <Label htmlFor="sign-initial" className="flex gap-2 items-center cursor-pointer">
                    <PenLine className="h-4 w-4" />
                    Initial Sign
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sign-final" id="sign-final" />
                  <Label htmlFor="sign-final" className="flex gap-2 items-center cursor-pointer">
                    <PenLine className="h-4 w-4" />
                    Final Sign
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stamp" id="stamp" />
                  <Label htmlFor="stamp" className="flex gap-2 items-center cursor-pointer">
                    <Stamp className="h-4 w-4" />
                    Stamp
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="approve" id="approve" />
                  <Label htmlFor="approve" className="flex gap-2 items-center cursor-pointer">
                    <CheckCircle2 className="h-4 w-4" />
                    Approve
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reject" id="reject" />
                  <Label htmlFor="reject" className="flex gap-2 items-center cursor-pointer">
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reset" id="reset" />
                  <Label htmlFor="reset" className="flex gap-2 items-center cursor-pointer">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Label>
                </div>
              </RadioGroup>

              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Comment</p>
                <Textarea 
                  placeholder="Add your comments here..." 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-none"
                  rows={4}
                />
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAction}
                  disabled={!selectedAction}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
