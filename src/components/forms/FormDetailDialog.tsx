
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Form } from './types';
import {
  Calendar,
  Download,
  FileEdit,
  History,
  Star,
  StarOff,
  User,
  Users,
  Clock,
  FileText,
  Settings,
} from 'lucide-react';

interface FormDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: Form;
}

export const FormDetailDialog: React.FC<FormDetailDialogProps> = ({
  open,
  onOpenChange,
  form,
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [isFavorite, setIsFavorite] = useState(form.isFavorite);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đang sử dụng':
        return 'bg-green-100 text-green-800';
      case 'Sắp hết hạn':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hết hiệu lực':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-xl">{form.name}</DialogTitle>
                <Badge className={`${getStatusColor(form.status)} border-0`}>
                  {form.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {form.description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
            >
              {isFavorite ? (
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-5 w-5" />
              )}
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-4 items-center mt-2">
          <div className="flex items-center gap-1 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Hiệu lực: {form.effectiveFrom} - {form.effectiveTo}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Tạo bởi: {form.author}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Cập nhật: {form.updatedAt}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>Phiên bản: {form.version}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Tải xuống
          </Button>
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-2" />
            Lịch sử phiên bản
          </Button>
          <Button size="sm">
            <FileEdit className="h-4 w-4 mr-2" />
            Soạn từ mẫu
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-6"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="content">Nội dung</TabsTrigger>
            <TabsTrigger value="versions">Phiên bản</TabsTrigger>
            <TabsTrigger value="access">Quyền truy cập</TabsTrigger>
            <TabsTrigger value="usage">Thống kê sử dụng</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="p-4 border rounded-md min-h-[400px]">
            <div className="space-y-4">
              <div className="p-4 border bg-muted/20 rounded">
                <h4 className="font-medium mb-2">Xem trước nội dung</h4>
                <div className="aspect-[3/4] bg-white border rounded-md p-6">
                  {/* Form content preview would go here */}
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Nội dung biểu mẫu "{form.name}"
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="versions" className="p-4 border rounded-md min-h-[400px]">
            <h3 className="font-medium mb-4">Lịch sử phiên bản</h3>
            <div className="space-y-3">
              {[
                { version: "3.0", date: "15/04/2025", author: "Nguyễn Văn A", note: "Cập nhật theo quy định mới" },
                { version: "2.5", date: "10/01/2025", author: "Trần Thị B", note: "Chỉnh sửa định dạng" },
                { version: "2.0", date: "05/11/2024", author: "Lê Văn C", note: "Thêm trường chữ ký điện tử" },
                { version: "1.0", date: "20/06/2024", author: "Phạm Thị D", note: "Phiên bản đầu tiên" },
              ].map((v) => (
                <div key={v.version} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">Phiên bản {v.version}</div>
                    <div className="text-sm text-muted-foreground">{v.note}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Cập nhật bởi {v.author} vào ngày {v.date}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Khôi phục</Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="access" className="p-4 border rounded-md min-h-[400px]">
            <h3 className="font-medium mb-4">Quyền truy cập</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5" />
                  <h4 className="font-medium">Nhóm người dùng</h4>
                </div>
                <div className="space-y-2">
                  {["Quản trị viên", "Nhân viên pháp lý", "Nhân viên tài chính", "Nhân viên nhân sự"].map((group) => (
                    <div key={group} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                      <span>{group}</span>
                      <Badge>Đầy đủ</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-5 w-5" />
                  <h4 className="font-medium">Cài đặt phê duyệt</h4>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2 p-2 rounded-md bg-muted/30">
                    <div className="font-medium">Cấp phê duyệt</div>
                    <div className="font-medium">Người phê duyệt</div>
                    <div className="font-medium">Thời hạn</div>
                  </div>
                  {[
                    { level: "Cấp 1", approver: "Trưởng phòng", deadline: "24 giờ" },
                    { level: "Cấp 2", approver: "Giám đốc khối", deadline: "48 giờ" },
                  ].map((level) => (
                    <div key={level.level} className="grid grid-cols-3 gap-2 p-2 hover:bg-muted/50 rounded-md">
                      <div>{level.level}</div>
                      <div>{level.approver}</div>
                      <div>{level.deadline}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="p-4 border rounded-md min-h-[400px]">
            <h3 className="font-medium mb-4">Thống kê sử dụng</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-3">Số lần sử dụng</h4>
                <div className="h-40 flex items-center justify-center bg-muted/20 rounded-md">
                  Biểu đồ thống kê sử dụng
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-3">Người dùng gần đây</h4>
                <div className="space-y-2">
                  {[
                    { user: "Nguyễn Văn A", date: "15/04/2025", status: "Hoàn thành" },
                    { user: "Trần Thị B", date: "14/04/2025", status: "Đang xử lý" },
                    { user: "Lê Văn C", date: "10/04/2025", status: "Hoàn thành" },
                    { user: "Phạm Thị D", date: "05/04/2025", status: "Từ chối" },
                  ].map((usage) => (
                    <div key={usage.user + usage.date} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                      <div>
                        <div className="font-medium">{usage.user}</div>
                        <div className="text-xs text-muted-foreground">{usage.date}</div>
                      </div>
                      <Badge variant={usage.status === "Hoàn thành" ? "default" : usage.status === "Đang xử lý" ? "secondary" : "destructive"}>
                        {usage.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
