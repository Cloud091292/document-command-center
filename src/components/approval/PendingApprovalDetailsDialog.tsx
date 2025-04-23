
import React, { useState } from "react";
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
  CheckCircle2,
  User,
  Calendar,
  AlertCircle,
  FileText,
  Download,
  MessageSquare,
  Paperclip,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { PendingApproval } from "@/hooks/usePendingApprovals";

interface PendingApprovalDetailsDialogProps {
  approval: PendingApproval | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (id: string, comment: string) => void;
  onReject: (id: string, comment: string) => void;
}

export const PendingApprovalDetailsDialog: React.FC<PendingApprovalDetailsDialogProps> = ({
  approval,
  open,
  onOpenChange,
  onApprove,
  onReject,
}) => {
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("document");
  const [showCommentField, setShowCommentField] = useState(false);

  if (!approval) return null;

  const { 
    id,
    title, 
    documentType, 
    fileType, 
    fileUrl, 
    fileName, 
    fileSize,
    sender,
    description, 
    requestDate, 
    dueDate, 
    priority,
    comments,
    attachments,
    references,
    approvalStep,
    sla 
  } = approval;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Low":
        return <Badge className="bg-gray-500">Thấp</Badge>;
      case "Medium":
        return <Badge className="bg-blue-500">Trung bình</Badge>;
      case "High":
        return <Badge className="bg-orange-500">Cao</Badge>;
      case "Urgent":
        return <Badge className="bg-red-500">Khẩn cấp</Badge>;
      default:
        return <Badge className="bg-gray-500">{priority}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3">
            <FileText className="h-5 w-5" />
            {title} {getPriorityBadge(priority)}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList>
            <TabsTrigger value="document">Tài liệu</TabsTrigger>
            <TabsTrigger value="info">Thông tin</TabsTrigger>
            <TabsTrigger value="comments">
              Bình luận ({comments.length})
            </TabsTrigger>
            {attachments.length > 0 && (
              <TabsTrigger value="attachments">
                Đính kèm ({attachments.length})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="document" className="pt-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-3/4 h-[500px] border rounded-md flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                <div className="text-center">
                  <File className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 font-medium">{fileName}</p>
                  <p className="text-sm text-muted-foreground">{fileSize}</p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Tải xuống
                    </Button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/4">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Bước phê duyệt hiện tại</p>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">Tiến độ</p>
                        <p className="text-sm">{approvalStep.current}/{approvalStep.total}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(approvalStep.current / approvalStep.total) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs">{approvalStep.name}</p>
                    </div>
                  </div>

                  {references && references.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Tài liệu tham chiếu</p>
                      <div className="space-y-2">
                        {references.map((ref, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <LinkIcon className="h-4 w-4 text-blue-500" />
                            <a href={ref.url} className="text-blue-500 hover:underline">
                              {ref.title}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium mb-2">Thời hạn xử lý</p>
                    <div className={`text-sm flex items-center gap-2 ${sla.isOverdue ? 'text-red-500' : sla.daysLeft <= 2 ? 'text-yellow-500' : 'text-green-500'}`}>
                      <Clock className="h-4 w-4" />
                      {sla.isOverdue 
                        ? `Quá hạn ${Math.abs(sla.daysLeft)} ngày` 
                        : `Còn ${sla.daysLeft} ngày`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="info" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 md:col-span-2">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {sender.avatar ? (
                          <img src={sender.avatar} alt={sender.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="bg-muted h-full w-full flex items-center justify-center text-sm font-medium uppercase">
                            {sender.name.charAt(0)}
                          </div>
                        )}
                      </Avatar>
                      <div>
                        <p className="font-medium">{sender.name}</p>
                        <p className="text-sm text-muted-foreground">{sender.department}</p>
                      </div>
                    </div>

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
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      <Download className="h-4 w-4 mr-2" />
                      Tải xuống
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="pt-4">
            <div className="mb-4">
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 mt-1">
                            {comment.avatar ? (
                              <img src={comment.avatar} alt={comment.user} className="h-full w-full object-cover" />
                            ) : (
                              <div className="bg-muted h-full w-full flex items-center justify-center text-xs font-medium uppercase">
                                {comment.user.charAt(0)}
                              </div>
                            )}
                          </Avatar>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{comment.user}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(comment.date)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm">{comment.text}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 font-medium">Chưa có bình luận</p>
                  <p className="text-sm text-muted-foreground">
                    Hãy để lại bình luận của bạn để người khác có thể xem
                  </p>
                </div>
              )}
            </div>

            {!showCommentField ? (
              <Button 
                variant="outline" 
                onClick={() => setShowCommentField(true)}
                className="w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Thêm bình luận
              </Button>
            ) : (
              <div className="space-y-2">
                <Textarea 
                  placeholder="Nhập bình luận của bạn..." 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowCommentField(false)}
                  >
                    Huỷ
                  </Button>
                  <Button 
                    size="sm"
                  >
                    Gửi bình luận
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {attachments.length > 0 && (
            <TabsContent value="attachments" className="pt-4">
              <div className="space-y-2">
                {attachments.map((attachment, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-blue-500" />
                        <div>
                          <p className="font-medium">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{attachment.size}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Tải xuống
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <div className="flex-grow">
            {!showCommentField && (
              <Button variant="outline" onClick={() => setActiveTab("comments")}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Thêm ý kiến
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="destructive" 
              onClick={() => onReject(id, comment)}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Từ chối
            </Button>
            <Button 
              variant="default" 
              onClick={() => onApprove(id, comment)}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Phê duyệt
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
