
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  FileIcon,
  FileSpreadsheet,
  FileImage,
  Download,
  Printer,
  Share,
  Bookmark,
  MoreHorizontal,
  Clock,
} from 'lucide-react';

// Mock document categories with counts
const categories = [
  { name: 'Pháp lý & Cấp phép', count: 124, icon: FileText },
  { name: 'Quản trị doanh nghiệp', count: 87, icon: FileText },
  { name: 'Nhân sự & Lao động', count: 92, icon: FileText },
  { name: 'Sản phẩm & Dịch vụ', count: 145, icon: FileText },
  { name: 'Hành chính & Khác', count: 99, icon: FileText },
];

// Mock documents
const documents = [
  {
    id: 1,
    name: 'Báo cáo thường niên 2024.pdf',
    type: 'PDF',
    size: '4.2 MB',
    category: 'Quản trị doanh nghiệp',
    department: 'Ban điều hành',
    lastModified: '2025-04-01',
    status: 'Hoạt động',
    icon: FileIcon,
  },
  {
    id: 2,
    name: 'Sổ tay nhân viên.docx',
    type: 'Word',
    size: '2.1 MB',
    category: 'Nhân sự & Lao động',
    department: 'Nhân sự',
    lastModified: '2025-03-28',
    status: 'Hoạt động',
    icon: FileText,
  },
  {
    id: 3,
    name: 'Báo cáo tài chính Q1.xlsx',
    type: 'Excel',
    size: '1.8 MB',
    category: 'Quản trị doanh nghiệp',
    department: 'Tài chính',
    lastModified: '2025-04-05',
    status: 'Hoạt động',
    icon: FileSpreadsheet,
  },
  {
    id: 4,
    name: 'Danh mục sản phẩm 2025.pdf',
    type: 'PDF',
    size: '8.7 MB',
    category: 'Sản phẩm & Dịch vụ',
    department: 'Marketing',
    lastModified: '2025-03-15',
    status: 'Hoạt động',
    icon: FileIcon,
  },
  {
    id: 5,
    name: 'Danh sách tuân thủ pháp lý.xlsx',
    type: 'Excel',
    size: '1.2 MB',
    category: 'Pháp lý & Cấp phép',
    department: 'Pháp lý',
    lastModified: '2025-03-22',
    status: 'Hoạt động',
    icon: FileSpreadsheet,
  },
  {
    id: 6,
    name: 'Biên bản họp HĐQT.pdf',
    type: 'PDF',
    size: '1.5 MB',
    category: 'Quản trị doanh nghiệp',
    department: 'Ban điều hành',
    lastModified: '2025-04-02',
    status: 'Hoạt động',
    icon: FileIcon,
  },
  {
    id: 7,
    name: 'Kiểm kê văn phòng.xlsx',
    type: 'Excel',
    size: '0.8 MB',
    category: 'Hành chính & Khác',
    department: 'Cơ sở vật chất',
    lastModified: '2025-03-18',
    status: 'Hoạt động',
    icon: FileSpreadsheet,
  },
  {
    id: 8,
    name: 'Hướng dẫn thương hiệu.pdf',
    type: 'PDF',
    size: '5.4 MB',
    category: 'Sản phẩm & Dịch vụ',
    department: 'Marketing',
    lastModified: '2025-02-28',
    status: 'Hoạt động',
    icon: FileIcon,
  },
];

const DocumentLibrary = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

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
      
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-full sm:w-72 space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm tài liệu..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Danh mục</CardTitle>
            </CardHeader>
            <CardContent className="py-0 px-2">
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <category.icon className="mr-2 h-4 w-4" />
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Lọc theo</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="space-y-4">
                <div>
                  <Label className="text-xs mb-2 block">Loại tài liệu</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type-pdf" defaultChecked />
                      <Label htmlFor="type-pdf">PDF</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type-word" defaultChecked />
                      <Label htmlFor="type-word">Word</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type-excel" defaultChecked />
                      <Label htmlFor="type-excel">Excel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type-other" defaultChecked />
                      <Label htmlFor="type-other">Khác</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs mb-2 block">Trạng thái</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-active" defaultChecked />
                      <Label htmlFor="status-active">Hoạt động</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-archived" />
                      <Label htmlFor="status-archived">Đã lưu trữ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-draft" />
                      <Label htmlFor="status-draft">Bản nháp</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card>
            <CardHeader className="py-4 px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Lọc nâng cao
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="border rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Folder className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mt-3 text-sm font-medium">{category.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {category.count} tài liệu
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {documents.map((document) => (
                    <div
                      key={document.id}
                      className="border rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <document.icon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="mt-3 text-sm font-medium truncate w-full">{document.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {document.size} • {document.type}
                        </p>
                        <div className="mt-3 flex justify-center space-x-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Printer className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Share className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Bookmark className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên</TableHead>
                        <TableHead>Loại</TableHead>
                        <TableHead>Danh mục</TableHead>
                        <TableHead>Phòng ban</TableHead>
                        <TableHead>Sửa đổi lần cuối</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((document) => (
                        <TableRow key={document.id}>
                          <TableCell className="font-medium flex items-center space-x-2">
                            <document.icon className="h-4 w-4" />
                            <span>{document.name}</span>
                          </TableCell>
                          <TableCell>{document.type}</TableCell>
                          <TableCell>{document.category}</TableCell>
                          <TableCell>{document.department}</TableCell>
                          <TableCell className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {document.lastModified}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-dms-success-light text-dms-success border-none">
                              {document.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Printer className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Share className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Bookmark className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                                  <DropdownMenuItem>Chỉnh sửa metadata</DropdownMenuItem>
                                  <DropdownMenuItem>Di chuyển</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    Xóa
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentLibrary;
