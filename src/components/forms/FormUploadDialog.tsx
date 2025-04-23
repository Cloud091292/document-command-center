
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, Save, FileUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FormUploadDialog: React.FC<FormUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn file để tải lên",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Thành công",
      description: "Biểu mẫu đã được tải lên thành công",
    });
    
    setIsUploading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Thêm biểu mẫu mới</DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-4"
        >
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="upload">Tải lên từ file</TabsTrigger>
            <TabsTrigger value="create">Tạo mới</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <div className="flex flex-col items-center">
                <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">
                  Kéo thả file vào đây hoặc nhấn để chọn file
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Hỗ trợ định dạng DOCX, PDF, JPG, PNG
                </p>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Chọn file
                  </label>
                </Button>
              </div>
              {file && (
                <div className="mt-4 p-3 bg-muted rounded-md text-left">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4 border p-4 rounded-md">
              <h3 className="font-medium">Thông tin biểu mẫu</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="form-name">Tên biểu mẫu</Label>
                  <Input id="form-name" placeholder="Nhập tên biểu mẫu" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="form-category">Nhóm biểu mẫu</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhóm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="legal">Pháp lý và Giấy phép</SelectItem>
                      <SelectItem value="corporate">Quản trị Doanh nghiệp</SelectItem>
                      <SelectItem value="finance">Tài chính - Kế toán</SelectItem>
                      <SelectItem value="hr">Nhân sự và Lao động</SelectItem>
                      <SelectItem value="customer">Khách hàng, đối tác và Hợp đồng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="effective-from">Ngày hiệu lực</Label>
                  <Input id="effective-from" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="effective-to">Ngày hết hạn</Label>
                  <Input id="effective-to" type="date" />
                </div>
                
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" placeholder="Mô tả ngắn về biểu mẫu" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="space-y-4 border p-4 rounded-md">
              <h3 className="font-medium">Thông tin biểu mẫu</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="create-form-name">Tên biểu mẫu</Label>
                  <Input id="create-form-name" placeholder="Nhập tên biểu mẫu" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="create-form-category">Nhóm biểu mẫu</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhóm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="legal">Pháp lý và Giấy phép</SelectItem>
                      <SelectItem value="corporate">Quản trị Doanh nghiệp</SelectItem>
                      <SelectItem value="finance">Tài chính - Kế toán</SelectItem>
                      <SelectItem value="hr">Nhân sự và Lao động</SelectItem>
                      <SelectItem value="customer">Khách hàng, đối tác và Hợp đồng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="create-effective-from">Ngày hiệu lực</Label>
                  <Input id="create-effective-from" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="create-effective-to">Ngày hết hạn</Label>
                  <Input id="create-effective-to" type="date" />
                </div>
                
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="create-description">Mô tả</Label>
                  <Textarea id="create-description" placeholder="Mô tả ngắn về biểu mẫu" />
                </div>
              </div>
            </div>
            
            <div className="border p-4 rounded-md">
              <h3 className="font-medium mb-4">Nội dung biểu mẫu</h3>
              <div className="min-h-[300px] border rounded-md p-4">
                <p className="text-center text-muted-foreground">
                  Trình soạn thảo văn bản
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? "Đang xử lý..." : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Lưu biểu mẫu
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
