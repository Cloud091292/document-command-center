
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { 
  FileCheck, 
  FilePlus, 
  FileText, 
  Filter, 
  Send, 
  Download, 
  Eye,
  Grid,
  List,
  Search,
  X,
  Calendar,
  Clock
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addDays, isAfter, isBefore } from "date-fns";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";

// Mock data for outgoing documents
const outgoingDocuments = [
  {
    id: '1',
    title: 'Báo cáo tài chính năm 2025',
    classification: 'Tài chính',
    recipient: 'Hội đồng quản trị',
    dateSent: '2025-04-01',
    deadline: '2025-04-15',
    status: 'Đã gửi',
    internalNumber: 'NB-2025-001',
    referenceCode: 'CV-FIN-2025-001',
    destinationUnit: 'Ban giám đốc',
    releaseStatus: 'Chính thức',
    priority: 'Bình thường',
    tags: ['Tài chính', 'Báo cáo']
  },
  {
    id: '2',
    title: 'Chiến lược ra mắt sản phẩm mới',
    classification: 'Marketing',
    recipient: 'Phòng Marketing',
    dateSent: '2025-04-03',
    deadline: '2025-04-10',
    status: 'Đang xử lý',
    internalNumber: 'NB-2025-045',
    referenceCode: 'CV-MKT-2025-045',
    destinationUnit: 'Phòng Marketing',
    releaseStatus: 'Nội bộ',
    priority: 'Khẩn',
    tags: ['Marketing', 'Sản phẩm']
  },
  {
    id: '3',
    title: 'Báo cáo tài chính quý 1',
    classification: 'Tài chính',
    recipient: 'Cổ đông',
    dateSent: '2025-04-05',
    deadline: '2025-04-20',
    status: 'Chờ phê duyệt',
    internalNumber: 'NB-2025-023',
    referenceCode: 'CV-FIN-2025-023',
    destinationUnit: 'Phòng Tài chính',
    releaseStatus: 'Chính thức',
    priority: 'Bình thường',
    tags: ['Tài chính', 'Báo cáo']
  },
  {
    id: '4',
    title: 'Gia hạn hợp đồng nhà cung cấp',
    classification: 'Pháp lý',
    recipient: 'Đối tác cung ứng',
    dateSent: '2025-04-02',
    deadline: '2025-04-08',
    status: 'Đã gửi',
    internalNumber: 'NB-2025-012',
    referenceCode: 'CV-LEG-2025-012',
    destinationUnit: 'Phòng Pháp lý',
    releaseStatus: 'Bảo mật',
    priority: 'Hỏa tốc',
    tags: ['Pháp lý', 'Hợp đồng']
  },
  {
    id: '5',
    title: 'Cập nhật phúc lợi nhân viên',
    classification: 'Nhân sự',
    recipient: 'Toàn thể nhân viên',
    dateSent: '2025-04-07',
    deadline: '2025-04-25',
    status: 'Đang xử lý',
    internalNumber: 'NB-2025-034',
    referenceCode: 'CV-HR-2025-034',
    destinationUnit: 'Phòng Nhân sự',
    releaseStatus: 'Nội bộ',
    priority: 'Bình thường',
    tags: ['Nhân sự', 'Phúc lợi']
  },
];

// Mock data for document categories
const documentClassifications = ['Tài chính', 'Marketing', 'Pháp lý', 'Nhân sự', 'Vận hành'];
const documentStatuses = ['Bản nháp', 'Chờ phê duyệt', 'Đang xử lý', 'Đã gửi', 'Đã huỷ'];
const destinationUnits = ['Ban giám đốc', 'Phòng Tài chính', 'Phòng Marketing', 'Phòng Nhân sự', 'Phòng Pháp lý', 'Phòng Vận hành'];
const releaseStatuses = ['Chính thức', 'Nội bộ', 'Bảo mật', 'Bản nháp'];
const priorityLevels = ['Bình thường', 'Khẩn', 'Hỏa tốc'];

// Mock workflow data
const workflowTemplates = [
  { id: 1, name: 'Phê duyệt tài liệu nội bộ', steps: 2 },
  { id: 2, name: 'Phê duyệt tài liệu chính thức', steps: 3 },
  { id: 3, name: 'Gửi thông báo cho nhân viên', steps: 1 },
  { id: 4, name: 'Quy trình pháp lý', steps: 4 },
];

const OutgoingDocuments = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [filters, setFilters] = useState({
    classification: '',
    status: '',
    destinationUnit: '',
    releaseStatus: '',
    priority: '',
    dateFrom: '',
    dateTo: '',
  });

  // Create form instance for the new document form
  const newDocumentForm = useForm({
    defaultValues: {
      title: '',
      description: '',
      classification: '',
      referenceCode: '',
      internalNumber: '',
      destinationUnit: '',
      releaseStatus: '',
      priority: 'Bình thường',
      deadline: '',
      tags: '',
      workflow: '',
    }
  });

  // Filter documents based on search query and filters
  const filteredDocuments = outgoingDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.internalNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClassification = !filters.classification || doc.classification === filters.classification;
    const matchesStatus = !filters.status || doc.status === filters.status;
    const matchesDestination = !filters.destinationUnit || doc.destinationUnit === filters.destinationUnit;
    const matchesRelease = !filters.releaseStatus || doc.releaseStatus === filters.releaseStatus;
    const matchesPriority = !filters.priority || doc.priority === filters.priority;
    
    let matchesDateRange = true;
    if (filters.dateFrom) {
      matchesDateRange = matchesDateRange && isAfter(new Date(doc.dateSent), new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      matchesDateRange = matchesDateRange && isBefore(new Date(doc.dateSent), new Date(filters.dateTo));
    }
    
    return matchesSearch && matchesClassification && matchesStatus && matchesDestination && 
           matchesRelease && matchesPriority && matchesDateRange;
  });

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      classification: '',
      status: '',
      destinationUnit: '',
      releaseStatus: '',
      priority: '',
      dateFrom: '',
      dateTo: '',
    });
    setSearchQuery('');
  };

  // View document details
  const viewDocument = (document: any) => {
    setSelectedDocument(document);
  };

  // Close document details
  const closeDocumentDetails = () => {
    setSelectedDocument(null);
  };

  // Handle new document submission
  const onSubmitNewDocument = (data: any) => {
    console.log("New document data:", data);
    // Here you would typically send this data to your API
  };

  // Check if a document is approaching its deadline
  const isApproachingDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysRemaining = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysRemaining <= 3 && daysRemaining >= 0;
  };

  // Get priority badge variant
  const getPriorityBadgeVariant = (priority: string) => {
    switch(priority) {
      case 'Hỏa tốc': return 'error';
      case 'Khẩn': return 'warning';
      default: return 'default';
    }
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case 'Đã gửi': return 'success';
      case 'Đang xử lý': return 'info';
      case 'Chờ phê duyệt': return 'warning';
      case 'Đã huỷ': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        heading="Công văn đi"
        description="Quản lý công văn, tài liệu gửi đi của doanh nghiệp"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <FilePlus className="mr-2 h-4 w-4" />
              Tạo công văn mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Tạo công văn đi mới</DialogTitle>
              <DialogDescription>
                Tải lên tài liệu và thêm thông tin cần thiết để tạo công văn mới.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...newDocumentForm}>
              <form onSubmit={newDocumentForm.handleSubmit(onSubmitNewDocument)} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <FormLabel>Tải lên tài liệu</FormLabel>
                  <Input type="file" className="cursor-pointer" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={newDocumentForm.control}
                    name="internalNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số nội bộ</FormLabel>
                        <FormControl>
                          <Input placeholder="VD: NB-2025-001" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={newDocumentForm.control}
                    name="referenceCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số công văn</FormLabel>
                        <FormControl>
                          <Input placeholder="VD: CV-FIN-2025-001" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={newDocumentForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trích yếu</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập trích yếu công văn" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={newDocumentForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Mô tả ngắn gọn về nội dung công văn" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={newDocumentForm.control}
                    name="classification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loại văn bản</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn loại văn bản" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {documentClassifications.map(classification => (
                              <SelectItem key={classification} value={classification}>
                                {classification}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={newDocumentForm.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Độ khẩn</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn độ khẩn" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {priorityLevels.map(priority => (
                              <SelectItem key={priority} value={priority}>
                                {priority}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={newDocumentForm.control}
                    name="destinationUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Đơn vị nhận</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn đơn vị nhận" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {destinationUnits.map(unit => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={newDocumentForm.control}
                    name="releaseStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trạng thái phát hành</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn trạng thái phát hành" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {releaseStatuses.map(status => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={newDocumentForm.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hạn xử lý</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={newDocumentForm.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tags (phân cách bằng dấu phẩy)" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={newDocumentForm.control}
                  name="workflow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quy trình xử lý</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn quy trình xử lý" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {workflowTemplates.map(workflow => (
                            <SelectItem key={workflow.id} value={workflow.id.toString()}>
                              {workflow.name} ({workflow.steps} bước)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Quy trình sẽ quyết định luồng xử lý của công văn
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button variant="outline" type="button">Lưu bản nháp</Button>
                  <Button variant="outline" type="button">Gửi phê duyệt</Button>
                  <Button type="submit">Phát hành</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Tabs defaultValue="outgoing" className="w-full">
        <TabsList>
          <TabsTrigger value="outgoing">Công văn đi</TabsTrigger>
          <TabsTrigger value="incoming">Công văn đến</TabsTrigger>
        </TabsList>
        <TabsContent value="outgoing" className="pt-6">
          <div className="flex justify-between items-center space-x-4 mb-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm công văn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
              </Button>
              <div className="border rounded-md flex">
                <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="border rounded-md p-4 bg-muted/40 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <FormLabel>Loại văn bản</FormLabel>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={filters.classification}
                  onChange={(e) => handleFilterChange('classification', e.target.value)}
                >
                  <option value="">Tất cả loại văn bản</option>
                  {documentClassifications.map(classification => (
                    <option key={classification} value={classification}>{classification}</option>
                  ))}
                </select>
              </div>
              <div>
                <FormLabel>Trạng thái</FormLabel>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">Tất cả trạng thái</option>
                  {documentStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <FormLabel>Đơn vị nhận</FormLabel>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={filters.destinationUnit}
                  onChange={(e) => handleFilterChange('destinationUnit', e.target.value)}
                >
                  <option value="">Tất cả đơn vị</option>
                  {destinationUnits.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
              <div>
                <FormLabel>Trạng thái phát hành</FormLabel>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={filters.releaseStatus}
                  onChange={(e) => handleFilterChange('releaseStatus', e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {releaseStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <FormLabel>Độ khẩn</FormLabel>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {priorityLevels.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <div>
                <FormLabel>Từ ngày</FormLabel>
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </div>
              <div>
                <FormLabel>Đến ngày</FormLabel>
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button variant="outline" size="sm" onClick={resetFilters} className="mb-0.5">
                  <X className="h-4 w-4 mr-2" /> Xoá bộ lọc
                </Button>
              </div>
            </div>
          )}

          {viewMode === 'list' ? (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trích yếu</TableHead>
                    <TableHead>Số công văn</TableHead>
                    <TableHead>Loại văn bản</TableHead>
                    <TableHead>Đơn vị nhận</TableHead>
                    <TableHead>Ngày ban hành</TableHead>
                    <TableHead>Hạn xử lý</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ưu tiên</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {doc.title}
                            {isApproachingDeadline(doc.deadline) && (
                              <Clock className="h-4 w-4 text-amber-500 ml-2" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{doc.referenceCode}</TableCell>
                        <TableCell>{doc.classification}</TableCell>
                        <TableCell>{doc.destinationUnit}</TableCell>
                        <TableCell>{format(new Date(doc.dateSent), 'dd/MM/yyyy')}</TableCell>
                        <TableCell>{format(new Date(doc.deadline), 'dd/MM/yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(doc.status)}>{doc.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityBadgeVariant(doc.priority)}>{doc.priority}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => viewDocument(doc)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-6">
                        Không tìm thấy công văn nào phù hợp với điều kiện tìm kiếm
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="border rounded-md p-4 hover:border-primary/50 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => viewDocument(doc)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <FileText className="h-6 w-6 text-blue-500 mr-2" />
                        <h3 className="font-medium">{doc.title}</h3>
                        {isApproachingDeadline(doc.deadline) && (
                          <Clock className="h-4 w-4 text-amber-500 ml-2" />
                        )}
                      </div>
                      <Badge variant={getStatusBadgeVariant(doc.status)}>{doc.status}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between my-2">
                      <Badge variant="outline" className="text-xs">{doc.classification}</Badge>
                      <Badge variant={getPriorityBadgeVariant(doc.priority)}>{doc.priority}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mt-2">
                      <div>
                        <p><strong>Số công văn:</strong></p>
                        <p>{doc.referenceCode}</p>
                      </div>
                      <div>
                        <p><strong>Đơn vị nhận:</strong></p>
                        <p>{doc.destinationUnit}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mt-2">
                      <div>
                        <p><strong>Ngày ban hành:</strong></p>
                        <p>{format(new Date(doc.dateSent), 'dd/MM/yyyy')}</p>
                      </div>
                      <div>
                        <p><strong>Hạn xử lý:</strong></p>
                        <p>{format(new Date(doc.deadline), 'dd/MM/yyyy')}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full border rounded-md p-8 text-center">
                  <FileCheck className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium mb-1">Không tìm thấy công văn</h3>
                  <p className="text-muted-foreground">Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm khác</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="incoming">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Hãy chuyển sang trang "Công văn đến" để xem danh sách công văn đến.</p>
          </div>
        </TabsContent>
      </Tabs>

      {selectedDocument && (
        <Sheet open={!!selectedDocument} onOpenChange={() => closeDocumentDetails()}>
          <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center space-x-2">
                <span>{selectedDocument.title}</span>
                <Badge variant={getPriorityBadgeVariant(selectedDocument.priority)}>
                  {selectedDocument.priority}
                </Badge>
              </SheetTitle>
              <SheetDescription>
                Số công văn: {selectedDocument.referenceCode} | Số nội bộ: {selectedDocument.internalNumber}
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-md p-6 bg-muted/30 flex items-center justify-center min-h-[300px]">
                <FileText className="h-16 w-16 text-muted-foreground" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Loại văn bản</h4>
                  <p className="text-sm text-muted-foreground">{selectedDocument.classification}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Trạng thái</h4>
                  <Badge variant={getStatusBadgeVariant(selectedDocument.status)}>
                    {selectedDocument.status}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Đơn vị nhận</h4>
                  <p className="text-sm text-muted-foreground">{selectedDocument.destinationUnit}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Ngày ban hành</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedDocument.dateSent), 'dd/MM/yyyy')}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Hạn xử lý</h4>
                  <div className="flex items-center">
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(selectedDocument.deadline), 'dd/MM/yyyy')}
                    </p>
                    {isApproachingDeadline(selectedDocument.deadline) && (
                      <Clock className="h-4 w-4 text-amber-500 ml-2" />
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Trạng thái phát hành</h4>
                  <p className="text-sm text-muted-foreground">{selectedDocument.releaseStatus}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Luồng xử lý</h4>
                <div className="relative pl-6 border-l border-dashed border-muted-foreground/50 space-y-4">
                  <div className="relative">
                    <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-sm font-medium">Tạo công văn</p>
                      <p className="text-xs text-muted-foreground">Nguyễn Văn A - 01/04/2025 08:30</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-sm font-medium">Phê duyệt công văn</p>
                      <p className="text-xs text-muted-foreground">Trần Thị B - 01/04/2025 10:15</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-sm font-medium">Phát hành</p>
                      <p className="text-xs text-muted-foreground">Lê Văn C - 01/04/2025 14:30</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDocument.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-between">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Send className="h-4 w-4 mr-2" />
                    Chuyển tiếp
                  </Button>
                  <Button>
                    Giao việc
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default OutgoingDocuments;
