import React, { useState } from 'react';
import { Grid, List, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentFilters } from './components/DocumentFilters';
import { DocumentListView } from './components/DocumentListView';
import { DocumentGridView } from './components/DocumentGridView';
import { DocumentDetailSheet } from './components/DocumentDetailSheet';
import type { OutgoingDocument, DocumentFilter } from './types/documents';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FilePlus } from 'lucide-react';
import { NewDocumentForm } from './components/NewDocumentForm';

// Mock data and constants
const documentClassifications = ['Tài chính', 'Marketing', 'Pháp lý', 'Nhân sự', 'Vận hành'];
const documentStatuses = ['Bản nháp', 'Chờ phê duyệt', 'Đang xử lý', 'Đã gửi', 'Đã huỷ'];
const destinationUnits = ['Ban giám đốc', 'Phòng Tài chính', 'Phòng Marketing', 'Phòng Nhân sự', 'Phòng Pháp lý', 'Phòng Vận hành'];
const releaseStatuses = ['Chính thức', 'Nội bộ', 'Bảo mật', 'Bản nháp'];
const priorityLevels = ['Bình thường', 'Khẩn', 'Hỏa tốc'];

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

const OutgoingDocuments = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<OutgoingDocument | null>(null);
  const [filters, setFilters] = useState<DocumentFilter>({
    classification: '',
    status: '',
    destinationUnit: '',
    releaseStatus: '',
    priority: '',
    dateFrom: '',
    dateTo: '',
  });

  // Handle filter changes
  const handleFilterChange = (key: keyof DocumentFilter, value: string) => {
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
            
            <NewDocumentForm />
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
                Filter
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
            <DocumentFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              documentClassifications={documentClassifications}
              documentStatuses={documentStatuses}
              destinationUnits={destinationUnits}
              releaseStatuses={releaseStatuses}
              priorityLevels={priorityLevels}
            />
          )}

          {viewMode === 'list' ? (
            <DocumentListView 
              documents={filteredDocuments}
              onViewDocument={setSelectedDocument}
            />
          ) : (
            <DocumentGridView
              documents={filteredDocuments}
              onViewDocument={setSelectedDocument}
            />
          )}
        </TabsContent>
        
        <TabsContent value="incoming">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">
              Hãy chuyển sang trang "Công văn đến" để xem danh sách công văn đến.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <DocumentDetailSheet
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />
    </div>
  );
};

export default OutgoingDocuments;
