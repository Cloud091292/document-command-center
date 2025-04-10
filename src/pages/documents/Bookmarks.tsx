
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Search,
  Filter,
  Grid2X2,
  List,
  Bookmark,
  Download,
  Share,
  Clock,
  FileText,
  FileIcon,
  FileSpreadsheet,
  MessageSquare,
  X,
  Folder,
  Tag,
  MoreHorizontal,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock bookmark categories with counts
const bookmarkCategories = [
  { name: 'Tài liệu quan trọng', count: 15, icon: Tag },
  { name: 'Tệp dự án', count: 8, icon: Tag },
  { name: 'Tài liệu tham khảo', count: 12, icon: Tag },
  { name: 'Tài liệu phê duyệt', count: 5, icon: Tag },
  { name: 'Mẫu tài liệu', count: 7, icon: Tag },
];

// Mock bookmarked documents
const bookmarkedDocuments = [
  {
    id: 1,
    name: 'Báo cáo thường niên 2024.pdf',
    type: 'PDF',
    category: 'Tài chính',
    owner: 'Phòng Tài chính',
    lastAccessed: '2025-04-06',
    dateBookmarked: '2025-03-20',
    icon: FileIcon,
    tags: ['báo cáo', 'tài chính', 'thường niên'],
  },
  {
    id: 2,
    name: 'Chiến lược Marketing 2025.docx',
    type: 'Word',
    category: 'Marketing',
    owner: 'Đội Marketing',
    lastAccessed: '2025-04-05',
    dateBookmarked: '2025-03-15',
    icon: FileText,
    tags: ['chiến lược', 'marketing', 'kế hoạch'],
  },
  {
    id: 3,
    name: 'Dự báo doanh số Q1.xlsx',
    type: 'Excel',
    category: 'Bán hàng',
    owner: 'Phòng Bán hàng',
    lastAccessed: '2025-04-07',
    dateBookmarked: '2025-03-28',
    icon: FileSpreadsheet,
    tags: ['bán hàng', 'dự báo', 'quý'],
  },
  {
    id: 4,
    name: 'Thuyết trình ra mắt sản phẩm.pdf',
    type: 'PDF',
    category: 'Sản phẩm',
    owner: 'Đội Sản phẩm',
    lastAccessed: '2025-04-02',
    dateBookmarked: '2025-03-10',
    icon: FileIcon,
    tags: ['sản phẩm', 'ra mắt', 'thuyết trình'],
  },
  {
    id: 5,
    name: 'Sổ tay nhân viên.pdf',
    type: 'PDF',
    category: 'Nhân sự',
    owner: 'Phòng Nhân sự',
    lastAccessed: '2025-04-03',
    dateBookmarked: '2025-03-22',
    icon: FileIcon,
    tags: ['sổ tay', 'nhân sự', 'chính sách'],
  },
  {
    id: 6,
    name: 'Biên bản họp HĐQT.docx',
    type: 'Word',
    category: 'Doanh nghiệp',
    owner: 'Văn phòng Ban điều hành',
    lastAccessed: '2025-04-07',
    dateBookmarked: '2025-03-18',
    icon: FileText,
    tags: ['họp', 'biên bản', 'hội đồng quản trị'],
  },
  {
    id: 7,
    name: 'Tiến độ dự án.xlsx',
    type: 'Excel',
    category: 'Dự án',
    owner: 'Quản lý dự án',
    lastAccessed: '2025-04-01',
    dateBookmarked: '2025-03-05',
    icon: FileSpreadsheet,
    tags: ['dự án', 'tiến độ', 'kế hoạch'],
  },
  {
    id: 8,
    name: 'Báo cáo tuân thủ pháp lý.pdf',
    type: 'PDF',
    category: 'Pháp lý',
    owner: 'Phòng Pháp lý',
    lastAccessed: '2025-04-04',
    dateBookmarked: '2025-03-25',
    icon: FileIcon,
    tags: ['pháp lý', 'tuân thủ', 'báo cáo'],
  },
];

const Bookmarks = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleDocumentClick = (document: any) => {
    setSelectedDocument(document);
    setPreviewOpen(true);
  };

  const handleRemoveBookmark = (id: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    console.log(`Removing bookmark with ID: ${id}`);
    // In a real app, this would remove the bookmark
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tài liệu đánh dấu</h1>
          <p className="text-muted-foreground">Truy cập tài liệu đã đánh dấu để tham khảo nhanh</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Sidebar with filters */}
        <div className="w-full sm:w-72 space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm đánh dấu..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Card>
            <CardHeader className="py-3">
              <h3 className="text-sm font-medium">Thẻ</h3>
            </CardHeader>
            <CardContent className="py-0 px-2">
              <div className="space-y-1">
                {bookmarkCategories.map((category) => (
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
              <h3 className="text-sm font-medium">Lọc theo</h3>
            </CardHeader>
            <CardContent className="py-2">
              <div className="space-y-4">
                <div>
                  <Label className="text-xs mb-2 block">Nhóm tài liệu</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tất cả nhóm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả nhóm</SelectItem>
                      <SelectItem value="financial">Tài chính</SelectItem>
                      <SelectItem value="hr">Nhân sự</SelectItem>
                      <SelectItem value="legal">Pháp lý</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="product">Sản phẩm</SelectItem>
                      <SelectItem value="project">Dự án</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-xs mb-2 block">Loại tệp</Label>
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
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs mb-2 block">Chủ sở hữu</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tất cả chủ sở hữu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả chủ sở hữu</SelectItem>
                      <SelectItem value="finance">Phòng Tài chính</SelectItem>
                      <SelectItem value="hr">Phòng Nhân sự</SelectItem>
                      <SelectItem value="legal">Phòng Pháp lý</SelectItem>
                      <SelectItem value="marketing">Đội Marketing</SelectItem>
                      <SelectItem value="product">Đội Sản phẩm</SelectItem>
                      <SelectItem value="executive">Văn phòng Ban điều hành</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
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
                  {/* Tags/Categories Grid View */}
                  {bookmarkCategories.map((category) => (
                    <div
                      key={category.name}
                      className="border rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Tag className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mt-3 text-sm font-medium">{category.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {category.count} tài liệu
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Documents Grid View */}
                  {bookmarkedDocuments.map((document) => (
                    <div
                      key={document.id}
                      className="border rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                      onClick={() => handleDocumentClick(document)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <document.icon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="mt-3 text-sm font-medium truncate w-full">{document.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {document.category} • {document.type}
                        </p>
                        <div className="mt-3 flex justify-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={(e) => handleRemoveBookmark(document.id, e)}
                          >
                            <X className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Share className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MessageSquare className="h-3.5 w-3.5" />
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
                        <TableHead>Danh mục</TableHead>
                        <TableHead>Loại tệp</TableHead>
                        <TableHead>Chủ sở hữu</TableHead>
                        <TableHead>Truy cập gần đây</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookmarkedDocuments.map((document) => (
                        <TableRow 
                          key={document.id} 
                          className="cursor-pointer"
                          onClick={() => handleDocumentClick(document)}
                        >
                          <TableCell className="font-medium flex items-center space-x-2">
                            <document.icon className="h-4 w-4" />
                            <span>{document.name}</span>
                          </TableCell>
                          <TableCell>{document.category}</TableCell>
                          <TableCell>{document.type}</TableCell>
                          <TableCell>{document.owner}</TableCell>
                          <TableCell className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {document.lastAccessed}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Share className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive"
                                onClick={(e) => handleRemoveBookmark(document.id, e)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                                  <DropdownMenuItem>Bình luận</DropdownMenuItem>
                                  <DropdownMenuItem>Tải xuống</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Document Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-5xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedDocument && (
                <>
                  {selectedDocument.icon && (
                    <selectedDocument.icon className="h-5 w-5" />
                  )}
                  {selectedDocument?.name}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedDocument?.category} • {selectedDocument?.type}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col md:flex-row gap-6 h-full overflow-hidden">
            {/* Document Preview */}
            <div className="flex-1 border rounded-md overflow-y-auto">
              <div className="p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <FileIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    Bản xem trước tài liệu sẽ hiển thị ở đây
                  </p>
                </div>
              </div>
            </div>
            
            {/* Document Metadata */}
            <div className="w-full md:w-72 space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Thông tin tài liệu</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chủ sở hữu:</span>
                    <span>{selectedDocument?.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loại tệp:</span>
                    <span>{selectedDocument?.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Đánh dấu:</span>
                    <span>{selectedDocument?.dateBookmarked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Truy cập gần đây:</span>
                    <span>{selectedDocument?.lastAccessed}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Thẻ</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDocument?.tags?.map((tag: string) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => {
                    if (selectedDocument) {
                      handleRemoveBookmark(selectedDocument.id);
                      setPreviewOpen(false);
                    }
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Xóa đánh dấu
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Tải xuống
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  <Share className="mr-2 h-4 w-4" />
                  Chia sẻ
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Bình luận
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bookmarks;
