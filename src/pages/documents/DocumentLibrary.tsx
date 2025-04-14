
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Grid2X2,
  List,
  Search,
  Filter,
  FolderPlus,
  File,
  Folder,
  FileText,
  MoreHorizontal,
  ChevronDown,
} from 'lucide-react';
import { OperationalDocumentSection } from '@/components/documents/OperationalDocumentSection';
import { CustomerDocumentSection } from '@/components/documents/CustomerDocumentSection';

// Mock document categories with counts
const operationalCategories = [
  { name: 'Pháp lý & Cấp phép', count: 124, icon: FileText },
  { name: 'Quản trị doanh nghiệp', count: 87, icon: FileText },
  { name: 'Nhân sự & Lao động', count: 92, icon: FileText },
  { name: 'Sản phẩm & Dịch vụ', count: 145, icon: FileText },
  { name: 'Hành chính & Khác', count: 99, icon: FileText },
];

const customerCategories = [
  { name: 'Hợp đồng dịch vụ', count: 156, icon: FileText },
  { name: 'Hồ sơ thuê bao', count: 213, icon: FileText },
  { name: 'Biên bản nghiệm thu', count: 75, icon: FileText },
  { name: 'Phụ lục hợp đồng', count: 108, icon: FileText },
  { name: 'Tài liệu khách hàng khác', count: 67, icon: FileText },
];

// Define file types for filter
const fileTypes = [
  { id: 'pdf', name: 'PDF', count: 156 },
  { id: 'docx', name: 'DOCX', count: 98 },
  { id: 'xlsx', name: 'XLSX', count: 67 },
  { id: 'jpg', name: 'JPG/PNG', count: 42 },
  { id: 'other', name: 'Khác', count: 23 },
];

// Define document statuses
const documentStatuses = [
  { id: 'active', name: 'Hiệu lực', count: 284 },
  { id: 'expired', name: 'Hết hiệu lực', count: 102 },
];

// Define departments
const departments = [
  { id: 'legal', name: 'Pháp lý', count: 124 },
  { id: 'hr', name: 'Nhân sự', count: 92 },
  { id: 'finance', name: 'Tài chính', count: 87 },
  { id: 'sales', name: 'Kinh doanh', count: 145 },
];

const DocumentLibrary = () => {
  const [activeTab, setActiveTab] = useState<'operational' | 'customer'>('operational');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Customer document specific filters
  const [contractNumber, setContractNumber] = useState('');
  const [subscriberId, setSubscriberId] = useState('');
  const [fileStatus, setFileStatus] = useState<string | null>(null);
  const [fileCondition, setFileCondition] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Thư viện tài liệu</h1>
          <p className="text-muted-foreground">Duyệt và quản lý tài liệu của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-9">
                <FolderPlus className="mr-2 h-4 w-4" />
                Tạo thư mục
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo thư mục mới</DialogTitle>
                <DialogDescription>
                  Tạo một thư mục mới để tổ chức tài liệu của bạn.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="folder-name" className="text-right">
                    Tên
                  </Label>
                  <Input id="folder-name" className="col-span-3" placeholder="Nhập tên thư mục" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="folder-category" className="text-right">
                    Danh mục
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full col-span-3">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="legal">Pháp lý & Cấp phép</SelectItem>
                      <SelectItem value="corporate">Quản trị doanh nghiệp</SelectItem>
                      <SelectItem value="hr">Nhân sự & Lao động</SelectItem>
                      <SelectItem value="products">Sản phẩm & Dịch vụ</SelectItem>
                      <SelectItem value="admin">Hành chính & Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Quyền hạn</Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm-admin" />
                      <Label htmlFor="perm-admin">Quản trị viên</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm-editor" />
                      <Label htmlFor="perm-editor">Biên tập viên</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm-viewer" defaultChecked />
                      <Label htmlFor="perm-viewer">Người xem</Label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="folder-password" className="text-right">
                    Mật khẩu
                  </Label>
                  <Input id="folder-password" type="password" className="col-span-3" placeholder="Mật khẩu tùy chọn" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Hủy</Button>
                <Button>Tạo thư mục</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="h-9">
            <File className="mr-2 h-4 w-4" />
            Tải lên tập tin
          </Button>
        </div>
      </div>
      
      <div className="w-full">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'operational' | 'customer')}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="operational" className="text-base py-3">
              Tài liệu vận hành
            </TabsTrigger>
            <TabsTrigger value="customer" className="text-base py-3">
              Tài liệu khách hàng
            </TabsTrigger>
          </TabsList>
          <TabsContent value="operational">
            <OperationalDocumentSection 
              categories={operationalCategories} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
            />
          </TabsContent>
          <TabsContent value="customer">
            <CustomerDocumentSection 
              categories={customerCategories}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentLibrary;
