import React, { useState } from 'react';
import { DocumentUploadDialog } from '@/components/documents/DocumentUploadDialog';
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const operationalCategories = [
  { name: 'Pháp lý và Giấy phép', count: 124, icon: FileText },
  { name: 'Quản trị Doanh nghiệp', count: 87, icon: FileText },
  { name: 'Tài chính - Kế toán', count: 92, icon: FileText },
  { name: 'Nhân sự và Lao động', count: 105, icon: FileText },
  { name: 'Vận hành – Giám sát – Bảo trì hệ thống', count: 76, icon: FileText },
  { name: 'Kiểm tra – Thanh tra – Báo cáo', count: 58, icon: FileText },
  { name: 'Sản phẩm và Dịch vụ', count: 145, icon: FileText },
  { name: 'Hành chính và Khác', count: 99, icon: FileText },
];

const customerCategories = [
  { name: 'Hồ sơ khiếu nại/tranh chấp', count: 56, icon: FileText },
  { name: 'Phiếu yêu cầu triển khai dịch vụ', count: 89, icon: FileText },
  { name: 'Quy trình/quy định nội bộ về hợp đồng', count: 45, icon: FileText },
  { name: 'Tờ trình phê duyệt', count: 78, icon: FileText },
  { name: 'Công văn trao đổi', count: 112, icon: FileText },
  { name: 'Báo giá gửi khách', count: 97, icon: FileText },
  { name: 'Hồ sơ pháp lý của khách hàng/đối tác', count: 126, icon: FileText },
  { name: 'NDA', count: 64, icon: FileText },
  { name: 'Hợp đồng/Phụ lục/Đính kèm', count: 213, icon: FileText },
  { name: 'Dữ liệu thông tin khách hàng', count: 167, icon: FileText },
];

const fileTypes = [
  { id: 'pdf', name: 'PDF', count: 156 },
  { id: 'docx', name: 'DOCX/DOC', count: 98 },
  { id: 'xlsx', name: 'XLSX/XLS', count: 67 },
  { id: 'jpg', name: 'JPG/PNG', count: 42 },
  { id: 'pptx', name: 'PPTX/PPT', count: 35 },
  { id: 'other', name: 'Khác', count: 23 },
];

const documentStatuses = [
  { id: 'active', name: 'Hiệu lực', count: 284 },
  { id: 'expiring', name: 'Sắp hết hạn', count: 45 },
  { id: 'expired', name: 'Hết hiệu lực', count: 102 },
];

const departments = [
  { id: 'legal', name: 'Pháp lý', count: 124 },
  { id: 'hr', name: 'Nhân sự', count: 92 },
  { id: 'finance', name: 'Tài chính', count: 87 },
  { id: 'sales', name: 'Kinh doanh', count: 145 },
  { id: 'operations', name: 'Vận hành', count: 76 },
  { id: 'it', name: 'CNTT', count: 58 },
  { id: 'admin', name: 'Hành chính', count: 42 },
];

type FolderFormValues = {
  name: string;
  category: string;
  permissions: {
    admin: boolean;
    editor: boolean;
    viewer: boolean;
  };
  password?: string;
  allUsers: boolean;
};

const DocumentLibrary = () => {
  const [activeTab, setActiveTab] = useState<'operational' | 'customer'>('operational');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  const [contractNumber, setContractNumber] = useState('');
  const [subscriberId, setSubscriberId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [fileStatus, setFileStatus] = useState<string | null>(null);
  const [fileCondition, setFileCondition] = useState<string | null>(null);

  const folderForm = useForm<FolderFormValues>({
    defaultValues: {
      name: '',
      category: '',
      permissions: {
        admin: false,
        editor: false,
        viewer: true,
      },
      password: '',
      allUsers: true,
    },
  });

  const handleCreateFolder = (values: FolderFormValues) => {
    console.log('Creating folder:', values);
    toast.success(`Đã tạo thư mục: ${values.name}`);
    setIsCreateFolderOpen(false);
    folderForm.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Thư viện tài liệu</h1>
          <p className="text-muted-foreground">Duyệt và quản lý tài liệu của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          <DocumentUploadDialog />
          <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
            <DialogTrigger asChild>
              <Button className="h-9">
                <FolderPlus className="mr-2 h-4 w-4" />
                Tạo thư mục
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Tạo thư mục mới</DialogTitle>
                <DialogDescription>
                  Tạo một thư mục mới để tổ chức tài liệu của bạn.
                </DialogDescription>
              </DialogHeader>
              <Form {...folderForm}>
                <form onSubmit={folderForm.handleSubmit(handleCreateFolder)} className="space-y-4">
                  <FormField
                    control={folderForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên thư mục</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tên thư mục" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={folderForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Danh mục</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="legal">Pháp lý & Cấp phép</SelectItem>
                            <SelectItem value="corporate">Quản trị doanh nghiệp</SelectItem>
                            <SelectItem value="finance">Tài chính - Kế toán</SelectItem>
                            <SelectItem value="hr">Nhân sự & Lao động</SelectItem>
                            <SelectItem value="operations">Vận hành & Giám sát</SelectItem>
                            <SelectItem value="inspection">Kiểm tra & Thanh tra</SelectItem>
                            <SelectItem value="products">Sản phẩm & Dịch vụ</SelectItem>
                            <SelectItem value="admin">Hành chính & Khác</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormItem>
                    <FormLabel>Phân quyền</FormLabel>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="all-users"
                          checked={folderForm.watch("allUsers")}
                          onCheckedChange={(checked) => {
                            folderForm.setValue("allUsers", checked as boolean);
                          }}
                        />
                        <Label htmlFor="all-users">Tất cả người dùng</Label>
                      </div>
                      
                      {!folderForm.watch("allUsers") && (
                        <div className="ml-6 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="perm-admin"
                              checked={folderForm.watch("permissions.admin")}
                              onCheckedChange={(checked) => {
                                folderForm.setValue("permissions.admin", checked as boolean);
                              }}
                            />
                            <Label htmlFor="perm-admin">Quản trị viên</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="perm-editor"
                              checked={folderForm.watch("permissions.editor")}
                              onCheckedChange={(checked) => {
                                folderForm.setValue("permissions.editor", checked as boolean);
                              }}
                            />
                            <Label htmlFor="perm-editor">Biên tập viên</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="perm-viewer"
                              checked={folderForm.watch("permissions.viewer")}
                              onCheckedChange={(checked) => {
                                folderForm.setValue("permissions.viewer", checked as boolean);
                              }}
                            />
                            <Label htmlFor="perm-viewer">Người xem</Label>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormItem>
                  
                  <FormField
                    control={folderForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu (tùy chọn)</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Nhập mật khẩu bảo vệ thư mục" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter className="mt-6">
                    <Button type="button" variant="outline" onClick={() => setIsCreateFolderOpen(false)}>Hủy</Button>
                    <Button type="submit">Tạo thư mục</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-9">
                <File className="mr-2 h-4 w-4" />
                Tải lên tài liệu
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Thêm tài liệu mới</DialogTitle>
                <DialogDescription>
                  Tải lên tài liệu mới vào thư viện hoặc tạo từ template có sẵn.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="upload" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload file</TabsTrigger>
                  <TabsTrigger value="template">Tạo từ template</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-4 mt-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <File className="h-10 w-10 text-gray-400" />
                      <h3 className="font-medium">Kéo thả file vào đây hoặc</h3>
                      <Button size="sm">Chọn file</Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Hỗ trợ: PDF, DOCX, XLSX, JPG, PNG (tối đa 50MB)
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="doc-name">Tên tài liệu</Label>
                        <Input id="doc-name" placeholder="Nhập tên tài liệu" />
                      </div>
                      <div>
                        <Label htmlFor="doc-category">Danh mục</Label>
                        <Select>
                          <SelectTrigger id="doc-category">
                            <SelectValue placeholder="Chọn danh mục" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="legal">Pháp lý & Cấp phép</SelectItem>
                            <SelectItem value="corporate">Quản trị doanh nghiệp</SelectItem>
                            <SelectItem value="hr">Nhân sự & Lao động</SelectItem>
                            <SelectItem value="products">Sản phẩm & Dịch vụ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="effective-from">Hiệu lực từ ngày</Label>
                        <Input id="effective-from" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="effective-to">Đến ngày</Label>
                        <Input id="effective-to" type="date" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="doc-status">Trạng thái hồ sơ</Label>
                      <Select>
                        <SelectTrigger id="doc-status">
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-returned">Chưa hoàn trả</SelectItem>
                          <SelectItem value="returned">Đã hoàn trả</SelectItem>
                          <SelectItem value="cancelled">Hủy bỏ</SelectItem>
                          <SelectItem value="debt">Khoanh nợ hồ sơ</SelectItem>
                          <SelectItem value="received">Tiếp nhận</SelectItem>
                          <SelectItem value="loaned">Cho mượn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input id="tags" placeholder="Nhập tags, phân cách bằng dấu phẩy" />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Mô tả tài liệu</Label>
                      <textarea 
                        id="description" 
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                        placeholder="Nhập mô tả chi tiết về tài liệu"
                      ></textarea>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="template" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="template">Chọn template</Label>
                      <Select>
                        <SelectTrigger id="template">
                          <SelectValue placeholder="Chọn template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contract">Hợp đồng kinh doanh</SelectItem>
                          <SelectItem value="nda">NDA</SelectItem>
                          <SelectItem value="memo">Biên bản ghi nhớ</SelectItem>
                          <SelectItem value="report">Báo cáo định kỳ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="border rounded-lg p-4 min-h-[300px] bg-gray-50">
                      <p className="text-center text-muted-foreground">
                        Xem trước template sẽ hiển thị tại đây
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="doc-name-template">Tên tài liệu</Label>
                        <Input id="doc-name-template" placeholder="Nhập tên tài liệu" />
                      </div>
                      <div>
                        <Label htmlFor="doc-category-template">Danh mục</Label>
                        <Select>
                          <SelectTrigger id="doc-category-template">
                            <SelectValue placeholder="Chọn danh mục" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="legal">Pháp lý & Cấp phép</SelectItem>
                            <SelectItem value="corporate">Quản trị doanh nghiệp</SelectItem>
                            <SelectItem value="hr">Nhân sự & Lao động</SelectItem>
                            <SelectItem value="products">Sản phẩm & Dịch vụ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-6">
                <Button variant="outline">Lưu nháp</Button>
                <Button>Chuyển phê duyệt</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
              Tài liệu v���n hành
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
