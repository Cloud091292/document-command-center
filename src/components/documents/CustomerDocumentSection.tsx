
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
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
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
  X,
} from 'lucide-react';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from '@/components/ui/toggle-group';
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
  status: 'Hiệu lực' | 'Hết hiệu lực' | 'Chưa hoàn trả' | 'Đã hoàn trả';
  department: string;
  description?: string;
  contractNumber?: string;
  subscriberId?: string;
  customerId?: string;
  fileUrl: string;
}

interface CustomerDocumentSectionProps {
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const CustomerDocumentSection: React.FC<CustomerDocumentSectionProps> = ({
  categories,
  searchQuery,
  setSearchQuery,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  
  // Filter states
  const [contractNumber, setContractNumber] = useState('');
  const [subscriberId, setSubscriberId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [fileStatus, setFileStatus] = useState<string[]>([]);
  const [fileCondition, setFileCondition] = useState<string[]>([]);
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  
  // Mock files for demonstration
  const mockFiles: File[] = [
    {
      id: '1',
      name: 'Hợp đồng dịch vụ VT-001',
      type: 'pdf',
      size: '3.2MB',
      createdAt: new Date('2024-03-10'),
      createdBy: 'Nguyễn Văn A',
      category: 'Hợp đồng',
      status: 'Hiệu lực',
      department: 'Kinh doanh',
      description: 'Hợp đồng cung cấp dịch vụ viễn thông cho khách hàng doanh nghiệp.',
      contractNumber: 'VT-2024-001',
      subscriberId: 'SUB12345',
      customerId: 'CUS7890',
      fileUrl: '#'
    },
    {
      id: '2',
      name: 'Phụ lục hợp đồng 01-VT',
      type: 'docx',
      size: '1.5MB',
      createdAt: new Date('2024-03-15'),
      createdBy: 'Trần Thị B',
      category: 'Phụ lục',
      status: 'Hiệu lực',
      department: 'Kinh doanh',
      description: 'Phụ lục mở rộng dịch vụ và điều chỉnh cước phí.',
      contractNumber: 'VT-2024-001',
      subscriberId: 'SUB12345',
      customerId: 'CUS7890',
      fileUrl: '#'
    },
    {
      id: '3',
      name: 'Hồ sơ thuê bao doanh nghiệp',
      type: 'pdf',
      size: '4.8MB',
      createdAt: new Date('2024-03-20'),
      createdBy: 'Lê Văn C',
      category: 'Hồ sơ pháp lý',
      status: 'Chưa hoàn trả',
      department: 'Pháp lý',
      description: 'Hồ sơ đăng ký thuê bao doanh nghiệp kèm các giấy tờ liên quan.',
      contractNumber: 'VT-2024-001',
      subscriberId: 'SUB12345',
      customerId: 'CUS7890',
      fileUrl: '#'
    },
    {
      id: '4',
      name: 'Biên bản nghiệm thu dịch vụ',
      type: 'xlsx',
      size: '1.1MB',
      createdAt: new Date('2024-03-25'),
      createdBy: 'Phạm Thị D',
      category: 'Biên bản thương thảo',
      status: 'Đã hoàn trả',
      department: 'Kỹ thuật',
      description: 'Biên bản xác nhận hoàn thành lắp đặt và nghiệm thu dịch vụ.',
      contractNumber: 'VT-2024-001',
      subscriberId: 'SUB12345',
      customerId: 'CUS7890',
      fileUrl: '#'
    }
  ];

  // Define document sub-categories
  const documentCategories = [
    'Hợp đồng chính', 'Phụ lục hợp đồng', 'Tài liệu đính kèm', 
    'Hồ sơ pháp lý', 'NDA', 'Thông tin khách hàng',
    'Biên bản nghiệm thu', 'Phiếu yêu cầu dịch vụ'
  ];
  
  const handleAddFilter = (key: string, value: string | string[]) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[key];
    setActiveFilters(newFilters);
    
    // Reset the corresponding filter state
    switch (key) {
      case 'contractNumber':
        setContractNumber('');
        break;
      case 'subscriberId':
        setSubscriberId('');
        break;
      case 'customerId':
        setCustomerId('');
        break;
      case 'fileStatus':
        setFileStatus([]);
        break;
      case 'fileCondition':
        setFileCondition([]);
        break;
      case 'fileTypes':
        setSelectedFileTypes([]);
        break;
    }
  };
  
  const clearAllFilters = () => {
    setActiveFilters({});
    setContractNumber('');
    setSubscriberId('');
    setCustomerId('');
    setFileStatus([]);
    setFileCondition([]);
    setSelectedFileTypes([]);
  };
  
  const handleFileStatusChange = (value: string) => {
    setFileStatus(prev => {
      const newValues = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      handleAddFilter('fileStatus', newValues);
      return newValues;
    });
  };
  
  const handleFileConditionChange = (value: string) => {
    setFileCondition(prev => {
      const newValues = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      handleAddFilter('fileCondition', newValues);
      return newValues;
    });
  };

  const handleFileTypeChange = (fileType: string) => {
    setSelectedFileTypes(prev => {
      const newValues = prev.includes(fileType)
        ? prev.filter(type => type !== fileType)
        : [...prev, fileType];
      
      handleAddFilter('fileTypes', newValues);
      return newValues;
    });
  };

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
                    <TableHead>Số hợp đồng</TableHead>
                    <TableHead>ID thuê bao</TableHead>
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
                      <TableCell>{file.contractNumber || '-'}</TableCell>
                      <TableCell>{file.subscriberId || '-'}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            file.status === 'Hiệu lực' || file.status === 'Đã hoàn trả' 
                              ? 'default' 
                              : 'secondary'
                          }
                        >
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
        
        <Card>
          <CardHeader className="py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Lọc tìm kiếm</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                {showAdvancedFilters ? 'Thu gọn' : 'Mở rộng'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-2 block">Số hợp đồng</Label>
                <Input 
                  placeholder="Nhập số hợp đồng" 
                  value={contractNumber}
                  onChange={(e) => {
                    setContractNumber(e.target.value);
                    if (e.target.value) {
                      handleAddFilter('contractNumber', e.target.value);
                    } else {
                      handleRemoveFilter('contractNumber');
                    }
                  }}
                />
              </div>
              
              <div>
                <Label className="text-xs mb-2 block">ID thuê bao</Label>
                <Input 
                  placeholder="Nhập ID thuê bao" 
                  value={subscriberId}
                  onChange={(e) => {
                    setSubscriberId(e.target.value);
                    if (e.target.value) {
                      handleAddFilter('subscriberId', e.target.value);
                    } else {
                      handleRemoveFilter('subscriberId');
                    }
                  }}
                />
              </div>
              
              <div>
                <Label className="text-xs mb-2 block">Mã khách hàng</Label>
                <Input 
                  placeholder="Nhập mã khách hàng" 
                  value={customerId}
                  onChange={(e) => {
                    setCustomerId(e.target.value);
                    if (e.target.value) {
                      handleAddFilter('customerId', e.target.value);
                    } else {
                      handleRemoveFilter('customerId');
                    }
                  }}
                />
              </div>
              
              {showAdvancedFilters && (
                <>
                  <div className="space-y-2">
                    <Label className="text-xs mb-2 block">Định dạng tài liệu</Label>
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
                  
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="file-status">
                      <AccordionTrigger className="py-2 text-sm">Trạng thái hồ sơ</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-not-returned" 
                              checked={fileStatus.includes('not-returned')}
                              onCheckedChange={() => handleFileStatusChange('not-returned')}
                            />
                            <Label htmlFor="status-not-returned">Chưa hoàn trả</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-returned" 
                              checked={fileStatus.includes('returned')}
                              onCheckedChange={() => handleFileStatusChange('returned')}
                            />
                            <Label htmlFor="status-returned">Đã hoàn trả</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-canceled" 
                              checked={fileStatus.includes('canceled')}
                              onCheckedChange={() => handleFileStatusChange('canceled')}
                            />
                            <Label htmlFor="status-canceled">Hủy bỏ</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-debt" 
                              checked={fileStatus.includes('debt')}
                              onCheckedChange={() => handleFileStatusChange('debt')}
                            />
                            <Label htmlFor="status-debt">Khoanh nợ hồ sơ</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-received" 
                              checked={fileStatus.includes('received')}
                              onCheckedChange={() => handleFileStatusChange('received')}
                            />
                            <Label htmlFor="status-received">Tiếp nhận</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-borrowed" 
                              checked={fileStatus.includes('borrowed')}
                              onCheckedChange={() => handleFileStatusChange('borrowed')}
                            />
                            <Label htmlFor="status-borrowed">Cho mượn</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="file-condition">
                      <AccordionTrigger className="py-2 text-sm">Tình trạng hồ sơ</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="condition-correct" 
                              checked={fileCondition.includes('correct')}
                              onCheckedChange={() => handleFileConditionChange('correct')}
                            />
                            <Label htmlFor="condition-correct">Đúng biểu mẫu</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="condition-incorrect" 
                              checked={fileCondition.includes('incorrect')}
                              onCheckedChange={() => handleFileConditionChange('incorrect')}
                            />
                            <Label htmlFor="condition-incorrect">Sai biểu mẫu</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>
              )}
              
              {Object.keys(activeFilters).length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={clearAllFilters}
                >
                  Xóa bộ lọc
                </Button>
              )}
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
              <div className="flex flex-col space-y-4">
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-auto"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    {showAdvancedFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                  </Button>
                </div>
                
                {Object.keys(activeFilters).length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium">Bộ lọc đang chọn:</span>
                    <div className="flex flex-wrap gap-2">
                      {contractNumber && (
                        <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
                          Số hợp đồng: {contractNumber}
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => handleRemoveFilter('contractNumber')}>
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )}
                      
                      {subscriberId && (
                        <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
                          ID thuê bao: {subscriberId}
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => handleRemoveFilter('subscriberId')}>
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )}
                      
                      {customerId && (
                        <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
                          Mã KH: {customerId}
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => handleRemoveFilter('customerId')}>
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )}
                      
                      {selectedFileTypes.length > 0 && (
                        <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
                          Định dạng: {selectedFileTypes.length} đã chọn
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => handleRemoveFilter('fileTypes')}>
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )}
                      
                      {fileStatus.length > 0 && (
                        <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
                          Trạng thái: {fileStatus.length} đã chọn
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => handleRemoveFilter('fileStatus')}>
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )}
                      
                      {fileCondition.length > 0 && (
                        <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
                          Tình trạng: {fileCondition.length} đã chọn
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => handleRemoveFilter('fileCondition')}>
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearAllFilters} 
                        className="text-xs h-7"
                      >
                        Xóa tất cả
                      </Button>
                    </div>
                  </div>
                )}
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
          contractNumber: selectedDocument.contractNumber,
          subscriberId: selectedDocument.subscriberId,
          customerId: selectedDocument.customerId,
          fileUrl: selectedDocument.fileUrl,
          tags: ['Khách hàng', 'Doanh nghiệp', 'VIP'],
          validFrom: new Date('2024-01-01'),
          validTo: new Date('2025-12-31'),
        } : null}
      />
    </div>
  );
};
