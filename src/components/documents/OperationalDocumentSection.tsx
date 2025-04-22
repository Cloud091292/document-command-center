
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Grid2X2,
  List,
  Search,
  Filter,
  Folder,
  FileText,
  Download,
  Printer,
  Share,
  Bookmark,
  MoreHorizontal,
  ChevronRight,
  ArrowLeft,
  FileType,
  Calendar,
  Users,
  Building,
  X,
} from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from '@/components/ui/checkbox';
import { DocumentDetailDialog } from './DocumentDetailDialog';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Category {
  name: string;
  count: number;
  icon: React.ComponentType<any>;
}

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  createdAt: Date;
  createdBy: string;
  category: string;
  status: 'Hiệu lực' | 'Hết hiệu lực';
  department: string;
  description?: string;
  fileUrl: string;
}

interface OperationalDocumentSectionProps {
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const OperationalDocumentSection: React.FC<OperationalDocumentSectionProps> = ({
  categories,
  searchQuery,
  setSearchQuery,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  
  // Mock files for demonstration
  const mockFiles: File[] = [
    {
      id: '1',
      name: 'Hợp đồng mua bán 2025',
      type: 'pdf',
      size: '2.4MB',
      createdAt: new Date('2024-04-10'),
      createdBy: 'Nguyễn Văn A',
      category: 'Hợp đồng',
      status: 'Hiệu lực',
      department: 'Pháp lý',
      description: 'Hợp đồng mua bán thiết bị năm 2025 với đối tác ABC.',
      fileUrl: '#'
    },
    {
      id: '2',
      name: 'Phụ lục hợp đồng 01',
      type: 'docx',
      size: '1.2MB',
      createdAt: new Date('2024-04-05'),
      createdBy: 'Trần Thị B',
      category: 'Phụ lục',
      status: 'Hiệu lực',
      department: 'Pháp lý',
      description: 'Phụ lục bổ sung thông tin chi tiết về điều khoản thanh toán.',
      fileUrl: '#'
    },
    {
      id: '3',
      name: 'Biên bản thương thảo',
      type: 'xlsx',
      size: '0.8MB',
      createdAt: new Date('2024-03-28'),
      createdBy: 'Lê Văn C',
      category: 'Biên bản',
      status: 'Hiệu lực',
      department: 'Kinh doanh',
      description: 'Biên bản ghi nhận kết quả thương thảo giữa các bên.',
      fileUrl: '#'
    },
    {
      id: '4',
      name: 'Hồ sơ pháp lý khách hàng',
      type: 'pdf',
      size: '3.5MB',
      createdAt: new Date('2024-03-15'),
      createdBy: 'Phạm Thị D',
      category: 'Hồ sơ pháp lý',
      status: 'Hiệu lực',
      department: 'Pháp lý',
      description: 'Bộ hồ sơ pháp lý của khách hàng bao gồm giấy phép kinh doanh, điều lệ công ty và các tài liệu liên quan.',
      fileUrl: '#'
    }
  ];

  // Define document type categories
  const documentCategories = [
    'Hợp đồng', 'Phụ lục', 'Tài liệu đính kèm', 'Hồ sơ pháp lý', 
    'NDA', 'Dữ liệu thông tin', 'Hồ sơ thầu', 'Báo giá', 
    'Biên bản thương thảo', 'Công văn trao đổi', 'Tờ trình phê duyệt'
  ];

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentPath([categoryName]);
  };

  const navigateTo = (path: string[]) => {
    setCurrentPath(path);
  };

  const goBack = () => {
    if (currentPath.length > 0) {
      const newPath = [...currentPath];
      newPath.pop();
      setCurrentPath(newPath);
      
      if (newPath.length === 0) {
        setSelectedCategory(null);
      }
    }
  };

  const handleViewDocument = (document: File) => {
    setSelectedDocument(document);
    setIsDetailDialogOpen(true);
  };

  const handleSaveBookmark = (document: File) => {
    toast.success(`Đã lưu "${document.name}" vào mục Bookmarks`);
  };

  const handleFileTypeChange = (fileType: string) => {
    setSelectedFileTypes(prev => {
      if (prev.includes(fileType)) {
        return prev.filter(type => type !== fileType);
      } else {
        return [...prev, fileType];
      }
    });
  };

  const renderBreadcrumb = () => {
    return (
      <div className="flex items-center space-x-2 mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={goBack} 
          disabled={currentPath.length === 0}
          className="p-1"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Quay lại
        </Button>
        
        <div className="flex items-center space-x-2">
          {currentPath.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigateTo(currentPath.slice(0, index + 1))}
                className="p-1 hover:bg-accent"
              >
                {item}
              </Button>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderActiveFilters = () => {
    const hasActiveFilters = selectedFileTypes.length > 0 || selectedStatus || selectedDepartment;
    
    if (!hasActiveFilters) return null;
    
    return (
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <span className="text-sm font-medium">Bộ lọc đang chọn:</span>
        <div className="flex flex-wrap gap-2">
          {selectedFileTypes.length > 0 && (
            <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
              Định dạng: {selectedFileTypes.join(', ')}
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => setSelectedFileTypes([])}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {selectedStatus && (
            <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
              Trạng thái: {selectedStatus}
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => setSelectedStatus(null)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {selectedDepartment && (
            <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
              Bộ phận: {selectedDepartment}
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => setSelectedDepartment(null)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setSelectedFileTypes([]);
              setSelectedStatus(null);
              setSelectedDepartment(null);
            }} 
            className="text-xs h-7"
          >
            Xóa tất cả
          </Button>
        </div>
      </div>
    );
  };

  const renderFolderContent = () => {
    if (selectedCategory) {
      return (
        <div className="space-y-4">
          {renderBreadcrumb()}
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedCategory}</h2>
            <div className="flex items-center space-x-2">
              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <Grid2X2 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          
          {renderActiveFilters()}
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {documentCategories.map((category) => (
                <div
                  key={category}
                  className="border rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => navigateTo([...currentPath, category])}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Folder className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-3 text-sm font-medium">{category}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 100)} tài liệu
                    </p>
                  </div>
                </div>
              ))}
              
              {mockFiles.map((file) => (
                <div
                  key={file.id}
                  className="border rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => handleViewDocument(file)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-3 text-sm font-medium">{file.name}</h3>
                    <div className="flex items-center mt-2">
                      <Badge variant="outline" className="text-xs mr-2">
                        {file.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {file.size}
                      </span>
                    </div>
                    <div className="flex mt-3 space-x-2">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveBookmark(file);
                        }}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            <span>In tài liệu</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="mr-2 h-4 w-4" />
                            <span>Chia sẻ</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên tài liệu</TableHead>
                    <TableHead>Định dạng</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Người tạo</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleViewDocument(file)}
                        >
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          {file.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{file.type.toUpperCase()}</Badge>
                      </TableCell>
                      <TableCell>
                        {format(file.createdAt, 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>{file.createdBy}</TableCell>
                      <TableCell>
                        <Badge variant={file.status === 'Hiệu lực' ? 'default' : 'secondary'}>
                          {file.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleSaveBookmark(file)}
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                <span>Chia sẻ qua link</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                <span>Chia sẻ nội bộ</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      );
    }
    
    return null;
  };

  // File types for filtering
  const fileTypeOptions = [
    { id: 'pdf', label: 'PDF' },
    { id: 'docx', label: 'DOCX' },
    { id: 'xlsx', label: 'XLSX' },
    { id: 'pptx', label: 'PPTX' },
    { id: 'jpg', label: 'JPG/PNG' },
  ];

  // Status options for filtering
  const statusOptions = [
    { id: 'active', label: 'Hiệu lực' },
    { id: 'expiring', label: 'Sắp hết hạn' },
    { id: 'expired', label: 'Hết hiệu lực' },
  ];

  // Department options for filtering
  const departmentOptions = [
    { id: 'legal', label: 'Pháp lý' },
    { id: 'hr', label: 'Nhân sự' },
    { id: 'finance', label: 'Tài chính' },
    { id: 'sales', label: 'Kinh doanh' },
    { id: 'it', label: 'CNTT' },
    { id: 'admin', label: 'Hành chính' },
  ];

  return (
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

        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Bộ lọc nâng cao
              </div>
              {(selectedFileTypes.length > 0 || selectedStatus || selectedDepartment) && (
                <Badge variant="secondary" className="ml-2">
                  {selectedFileTypes.length + (selectedStatus ? 1 : 0) + (selectedDepartment ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Định dạng tài liệu</h4>
                <div className="grid grid-cols-2 gap-2">
                  {fileTypeOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`ft-${option.id}`} 
                        checked={selectedFileTypes.includes(option.id)}
                        onCheckedChange={() => handleFileTypeChange(option.id)}
                      />
                      <label htmlFor={`ft-${option.id}`} className="text-sm">{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Trạng thái hồ sơ</h4>
                <Select value={selectedStatus || ''} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    {statusOptions.map(option => (
                      <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Bộ phận lưu trữ</h4>
                <Select value={selectedDepartment || ''} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bộ phận" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    {departmentOptions.map(option => (
                      <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedFileTypes([]);
                    setSelectedStatus(null);
                    setSelectedDepartment(null);
                  }}
                >
                  Xóa bộ lọc
                </Button>
                <Button size="sm" onClick={() => setFilterOpen(false)}>Áp dụng</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Danh mục</CardTitle>
          </CardHeader>
          <CardContent className="py-0 px-2">
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleCategoryClick(category.name)}
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
      </div>
      
      <div className="flex-1">
        {selectedCategory ? (
          renderFolderContent()
        ) : (
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-auto">
                      <Filter className="mr-2 h-4 w-4" />
                      Lọc nâng cao
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Định dạng tài liệu</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {fileTypeOptions.map(option => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`filter-${option.id}`} 
                                checked={selectedFileTypes.includes(option.id)}
                                onCheckedChange={() => handleFileTypeChange(option.id)}
                              />
                              <label htmlFor={`filter-${option.id}`} className="text-sm">{option.label}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Trạng thái hồ sơ</h4>
                        <Select value={selectedStatus || ''} onValueChange={setSelectedStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn trạng thái" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Tất cả</SelectItem>
                            {statusOptions.map(option => (
                              <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Bộ phận lưu trữ</h4>
                        <Select value={selectedDepartment || ''} onValueChange={setSelectedDepartment}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn bộ phận" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Tất cả</SelectItem>
                            {departmentOptions.map(option => (
                              <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedFileTypes([]);
                            setSelectedStatus(null);
                            setSelectedDepartment(null);
                          }}
                        >
                          Xóa bộ lọc
                        </Button>
                        <Button size="sm">Áp dụng</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="border rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                    onClick={() => handleCategoryClick(category.name)}
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
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Document Detail Dialog */}
      <DocumentDetailDialog 
        open={isDetailDialogOpen} 
        onOpenChange={setIsDetailDialogOpen}
        document={selectedDocument ? {
          id: selectedDocument.id,
          title: selectedDocument.name,
          description: selectedDocument.description || '',
          fileType: selectedDocument.type,
          createdAt: selectedDocument.createdAt,
          createdBy: selectedDocument.createdBy,
          status: selectedDocument.status,
          category: selectedDocument.category,
          department: selectedDocument.department,
          fileUrl: selectedDocument.fileUrl,
          tags: ['Hợp đồng', 'Quan trọng', 'Đối tác ABC'],
          validFrom: new Date('2024-01-01'),
          validTo: new Date('2025-12-31'),
        } : null}
      />
    </div>
  );
};
