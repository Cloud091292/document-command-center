
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  File,
  Clock,
  AlertCircle,
  CheckCircle2,
  User,
  Calendar,
  FileText,
  Send,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MyRequest, ApprovalStep } from "@/hooks/useMyRequests";

interface RequestDetailsDialogProps {
  request: MyRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel?: (request: MyRequest) => void;
  onResend?: (request: MyRequest) => void;
}

export const RequestDetailsDialog: React.FC<RequestDetailsDialogProps> = ({
  request,
  open,
  onOpenChange,
  onCancel,
  onResend,
}) => {
  if (!request) return null;

  const { 
    title, 
    status, 
    requestDate, 
    dueDate, 
    documentType, 
    fileType, 
    fileUrl, 
    fileName, 
    fileSize,
    description, 
    approvers, 
    approvalHistory,
    sla 
  } = request;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-500">Đã phê duyệt</Badge>;
      case "Rejected":
        return <Badge className="bg-red-500">Từ chối</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500">Chờ xử lý</Badge>;
      case "InProgress":
        return <Badge className="bg-blue-500">Đang xử lý</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  const isPending = status === "Pending";
  const isRejected = status === "Rejected";

  const getStepIcon = (step: ApprovalStep) => {
    switch (step.status) {
      case "Approved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "Rejected":
        return <X className="h-5 w-5 text-red-500" />;
      case "InProgress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "Pending":
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3">
            <FileText className="h-5 w-5" />
            {title} {getStatusBadge(status)}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList>
            <TabsTrigger value="details">Chi tiết yêu cầu</TabsTrigger>
            <TabsTrigger value="document">Tài liệu</TabsTrigger>
            <TabsTrigger value="history">
              Lịch sử phê duyệt ({approvalHistory.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Thông tin yêu cầu</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Loại tài liệu</p>
                        <p className="font-medium">{documentType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Định dạng</p>
                        <p className="font-medium">{fileType}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Ngày yêu cầu</p>
                        <p className="font-medium flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(requestDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Hạn xử lý</p>
                        <p className={`font-medium flex items-center gap-1 ${sla.isOverdue ? 'text-red-500' : ''}`}>
                          <Clock className="h-4 w-4" />
                          {formatDate(dueDate)}
                          {sla.isOverdue && <span className="text-xs ml-2">(Quá hạn)</span>}
                        </p>
                      </div>
                    </div>

                    {description && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Mô tả</p>
                        <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          {description}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Người phê duyệt</h3>
                  <div className="space-y-3">
                    {approvers.map((approver, index) => (
                      <div key={index} className="flex items-center justify-between pb-2 border-b">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <div className="bg-muted h-full w-full flex items-center justify-center text-xs uppercase">
                              {approver.name.charAt(0)}
                            </div>
                          </Avatar>
                          <span className="text-sm">{approver.name}</span>
                        </div>
                        {getStatusBadge(approver.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="document" className="pt-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3 h-[500px] border rounded-md flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                <div className="text-center">
                  <File className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 font-medium">{fileName}</p>
                  <p className="text-sm text-muted-foreground">{fileSize}</p>
                  <Button size="sm" className="mt-4">
                    Tải xuống
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Thông tin tài liệu</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Tên tệp</p>
                        <p className="font-medium text-sm break-all">{fileName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Kích thước</p>
                        <p className="font-medium">{fileSize}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Định dạng</p>
                        <p className="font-medium">{fileType}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="pt-4">
            <div className="space-y-4">
              {approvalHistory.map((step, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStepIcon(step)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            Bước {step.step}: {step.unit}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <User className="h-3.5 w-3.5" /> {step.handler}
                            <span className="mx-1">•</span>
                            <Calendar className="h-3.5 w-3.5" /> {formatDate(step.date)}
                          </p>
                        </div>
                        {getStatusBadge(step.status)}
                      </div>

                      {step.comments && (
                        <div className="mt-2 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          {step.comments}
                        </div>
                      )}

                      {step.attachments && step.attachments.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-muted-foreground mb-2">Tệp đính kèm</p>
                          <div className="space-y-1">
                            {step.attachments.map((attachment, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <FileText className="h-4 w-4 text-blue-500" />
                                <span>{attachment.name}</span>
                                <span className="text-xs text-muted-foreground">({attachment.size})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-0">
          {isPending && onCancel && (
            <Button variant="destructive" onClick={() => onCancel(request)}>
              <X className="w-4 h-4 mr-2" />
              Huỷ yêu cầu
            </Button>
          )}
          {isRejected && onResend && (
            <Button onClick={() => onResend(request)}>
              <Send className="w-4 h-4 mr-2" />
              Gửi lại yêu cầu
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
