
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Printer, Download, Bookmark, Share, Upload, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface DocumentVersion {
  version: string;
  date: Date;
  uploadedBy: string;
  notes?: string;
}

interface DocumentHistory {
  action: string;
  user: string;
  date: Date;
  comment?: string;
}

interface DocumentDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: {
    id: string;
    title: string;
    description: string;
    fileType: string;
    createdAt: Date;
    createdBy: string;
    status: string;
    category: string;
    department?: string;
    tags?: string[];
    contractNumber?: string;
    subscriberId?: string;
    customerId?: string;
    validFrom?: Date;
    validTo?: Date;
    fileUrl: string;
  } | null;
}

export const DocumentDetailDialog: React.FC<DocumentDetailProps> = ({
  open,
  onOpenChange,
  document
}) => {
  const [activeTab, setActiveTab] = useState('preview');
  
  if (!document) return null;

  // Mock versions history
  const versions: DocumentVersion[] = [
    { version: "1.0", date: new Date(2023, 10, 15), uploadedBy: "Nguyễn Văn A" },
    { version: "1.1", date: new Date(2024, 0, 5), uploadedBy: "Trần Thị B", notes: "Cập nhật thông tin pháp lý" },
    { version: "1.2", date: new Date(2024, 2, 20), uploadedBy: "Lê Văn C", notes: "Bổ sung phụ lục" },
  ];

  // Mock approval history
  const approvalHistory: DocumentHistory[] = [
    { action: "Đã tạo tài liệu", user: "Nguyễn Văn A", date: new Date(2023, 10, 15) },
    { action: "Chuyển phê duyệt", user: "Nguyễn Văn A", date: new Date(2023, 10, 16) },
    { action: "Phê duyệt cấp 1", user: "Trần Thị B", date: new Date(2023, 10, 18), comment: "Đã xem xét và phê duyệt" },
    { action: "Phê duyệt cuối cùng", user: "Lê Văn C", date: new Date(2023, 10, 20), comment: "Đã phê duyệt" },
  ];

  // Mock access history
  const accessHistory: DocumentHistory[] = [
    { action: "Xem", user: "Nguyễn Văn A", date: new Date(2023, 11, 5) },
    { action: "Tải xuống", user: "Trần Thị B", date: new Date(2023, 12, 10) },
    { action: "Xem", user: "Phạm Thị D", date: new Date(2024, 1, 15) },
    { action: "In", user: "Lê Văn C", date: new Date(2024, 2, 20) },
  ];

  // Render history timeline
  const renderTimeline = (items: DocumentHistory[]) => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            {index < items.length - 1 && <div className="h-full w-0.5 bg-border mt-2"></div>}
          </div>
          <div className="space-y-1 pb-6">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{item.action}</p>
              <Badge variant="outline" className="text-xs">
                {format(item.date, 'dd/MM/yyyy HH:mm')}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground">{item.user}</p>
            </div>
            {item.comment && <p className="text-sm text-muted-foreground mt-1">{item.comment}</p>}
          </div>
        </div>
      ))}
    </div>
  );

  const getDocumentTypeIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <div className="bg-red-100 text-red-800 p-1 rounded">PDF</div>;
      case 'docx':
      case 'doc':
        return <div className="bg-blue-100 text-blue-800 p-1 rounded">DOC</div>;
      case 'xlsx':
      case 'xls':
        return <div className="bg-green-100 text-green-800 p-1 rounded">XLS</div>;
      case 'pptx':
      case 'ppt':
        return <div className="bg-orange-100 text-orange-800 p-1 rounded">PPT</div>;
      case 'jpg':
      case 'png':
        return <div className="bg-purple-100 text-purple-800 p-1 rounded">IMG</div>;
      default:
        return <div className="bg-gray-100 text-gray-800 p-1 rounded">FILE</div>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl">{document.title}</DialogTitle>
              <DialogDescription className="mt-1 flex items-center gap-2">
                {getDocumentTypeIcon(document.fileType)}
                <span>{document.department || document.category}</span>
                <span>•</span>
                <span>Cập nhật: {format(document.createdAt, 'dd/MM/yyyy')}</span>
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Printer className="h-4 w-4 mr-1" />
                In
              </Button>
              <Button size="sm" variant="outline">
                <Bookmark className="h-4 w-4 mr-1" />
                Lưu
              </Button>
              <Button size="sm" variant="outline">
                <Share className="h-4 w-4 mr-1" />
                Chia sẻ
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-1" />
                Tải xuống
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="preview">Xem trước</TabsTrigger>
            <TabsTrigger value="details">Thông tin chi tiết</TabsTrigger>
            <TabsTrigger value="history">Lịch sử</TabsTrigger>
            <TabsTrigger value="comments">Bình luận</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-4">
            <div className="border rounded-lg p-4 h-[400px] flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="font-medium">Xem trước tài liệu</p>
                <p className="text-sm text-muted-foreground mt-1">{document.title}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-4">
            <div className="border rounded-lg p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Thông tin tài liệu</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Mã tài liệu:</dt>
                      <dd className="font-medium">{document.id}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Danh mục:</dt>
                      <dd className="font-medium">{document.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Tình trạng:</dt>
                      <dd>
                        <Badge variant={document.status === 'Hiệu lực' ? 'default' : 'secondary'}>
                          {document.status}
                        </Badge>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Thời hạn hiệu lực:</dt>
                      <dd className="font-medium">
                        {document.validFrom && document.validTo
                          ? `${format(document.validFrom, 'dd/MM/yyyy')} - ${format(document.validTo, 'dd/MM/yyyy')}`
                          : 'Không thời hạn'}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Người tạo:</dt>
                      <dd className="font-medium">{document.createdBy}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Ngày tạo:</dt>
                      <dd className="font-medium">{format(document.createdAt, 'dd/MM/yyyy')}</dd>
                    </div>
                  </dl>
                  
                  {document.tags && document.tags.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {document.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-primary/5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Thông tin liên kết</h3>
                  {(document.contractNumber || document.subscriberId || document.customerId) ? (
                    <dl className="space-y-2">
                      {document.contractNumber && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Số hợp đồng:</dt>
                          <dd className="font-medium">{document.contractNumber}</dd>
                        </div>
                      )}
                      {document.subscriberId && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">ID thuê bao:</dt>
                          <dd className="font-medium">{document.subscriberId}</dd>
                        </div>
                      )}
                      {document.customerId && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Mã khách hàng:</dt>
                          <dd className="font-medium">{document.customerId}</dd>
                        </div>
                      )}
                    </dl>
                  ) : (
                    <p className="text-muted-foreground text-sm">Không có thông tin liên kết</p>
                  )}
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Mô tả</h4>
                    <p className="text-sm text-muted-foreground">
                      {document.description || "Không có mô tả"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <div className="border rounded-lg p-6">
              <Tabs defaultValue="approval">
                <TabsList className="mb-4">
                  <TabsTrigger value="approval">Phê duyệt</TabsTrigger>
                  <TabsTrigger value="versions">Phiên bản</TabsTrigger>
                  <TabsTrigger value="access">Truy cập</TabsTrigger>
                </TabsList>
                
                <TabsContent value="approval">
                  {renderTimeline(approvalHistory)}
                </TabsContent>
                
                <TabsContent value="versions">
                  <div className="space-y-4">
                    {versions.map((version, index) => (
                      <div key={index} className="flex border-b pb-4 last:border-0">
                        <div className="mr-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium">{version.version}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">Phiên bản {version.version}</p>
                            <Badge variant="outline" className="text-xs">
                              {format(version.date, 'dd/MM/yyyy')}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{version.uploadedBy.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="text-xs text-muted-foreground">{version.uploadedBy}</p>
                          </div>
                          {version.notes && <p className="text-sm text-muted-foreground mt-1">{version.notes}</p>}
                          <div className="mt-2">
                            <Button size="sm" variant="outline">Xem phiên bản</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="access">
                  {renderTimeline(accessHistory)}
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="mt-4">
            <div className="border rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center">
                        <h4 className="font-medium text-sm">Nguyễn Văn A</h4>
                        <span className="text-xs text-muted-foreground ml-2">1 ngày trước</span>
                      </div>
                      <p className="text-sm mt-1">Tài liệu này cần cập nhật thông tin chi tiết hơn ở phần mô tả kỹ thuật.</p>
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <button>Trả lời</button>
                      <button>Chỉnh sửa</button>
                      <button>Xóa</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>TB</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center">
                        <h4 className="font-medium text-sm">Trần Thị B</h4>
                        <span className="text-xs text-muted-foreground ml-2">5 giờ trước</span>
                      </div>
                      <p className="text-sm mt-1">Đã ghi nhận, sẽ cập nhật trong phiên bản kế tiếp.</p>
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <button>Trả lời</button>
                      <button>Chỉnh sửa</button>
                      <button>Xóa</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 mt-6">
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <textarea 
                      className="w-full min-h-[80px] rounded-lg border border-input bg-background px-3 py-2" 
                      placeholder="Thêm bình luận..."
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                      <Button size="sm">Gửi bình luận</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Tải lên phiên bản mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
