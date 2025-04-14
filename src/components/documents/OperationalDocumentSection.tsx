
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
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
} from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from '@/components/ui/checkbox';

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
      department: 'Pháp lý'
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
      department: 'Pháp lý'
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
      department: 'Kinh doanh'
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
      department: 'Pháp lý'
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
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
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
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          {file.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{file.type.toUpperCase()}</Badge>
                      </TableCell>
                      <TableCell>
                        {file.createdAt.toLocaleDateString('vi-VN')}
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
              <Badge variant="secondary" className="ml-2">3</Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Loại tài liệu</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pdf" />
                    <label htmlFor="pdf" className="text-sm">PDF</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="docx" />
                    <label htmlFor="docx" className="text-sm">DOCX</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="xlsx" />
                    <label htmlFor="xlsx" className="text-sm">XLSX</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="image" />
                    <label htmlFor="image" className="text-sm">JPG/PNG</label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Trạng thái hồ sơ</h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hieu-luc">Hiệu lực</SelectItem>
                    <SelectItem value="het-hieu-luc">Hết hiệu lực</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Bộ phận lưu trữ</h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bộ phận" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phap-ly">Pháp lý</SelectItem>
                    <SelectItem value="nhan-su">Nhân sự</SelectItem>
                    <SelectItem value="tai-chinh">Tài chính</SelectItem>
                    <SelectItem value="kinh-doanh">Kinh doanh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm">Xóa bộ lọc</Button>
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
                        <h4 className="font-medium text-sm">Loại tài liệu</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="filter-pdf" />
                            <label htmlFor="filter-pdf" className="text-sm">PDF</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="filter-docx" />
                            <label htmlFor="filter-docx" className="text-sm">DOCX</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="filter-xlsx" />
                            <label htmlFor="filter-xlsx" className="text-sm">XLSX</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="filter-image" />
                            <label htmlFor="filter-image" className="text-sm">JPG/PNG</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Trạng thái hồ sơ</h4>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn trạng thái" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hieu-luc">Hiệu lực</SelectItem>
                            <SelectItem value="het-hieu-luc">Hết hiệu lực</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Bộ phận lưu trữ</h4>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn bộ phận" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phap-ly">Pháp lý</SelectItem>
                            <SelectItem value="nhan-su">Nhân sự</SelectItem>
                            <SelectItem value="tai-chinh">Tài chính</SelectItem>
                            <SelectItem value="kinh-doanh">Kinh doanh</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <Button variant="outline" size="sm">Xóa bộ lọc</Button>
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
    </div>
  );
};
