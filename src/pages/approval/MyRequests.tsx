
import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RequestStatusFilter } from '@/components/approval/RequestStatusFilter';
import { RequestCard } from '@/components/approval/RequestCard';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useMyRequests, MyRequest } from '@/hooks/useMyRequests';
import { Search, Calendar, SlidersHorizontal, List, LayoutGrid, FileUp, Send, X } from 'lucide-react';
import { RequestDetailsDialog } from '@/components/approval/RequestDetailsDialog';
import { useToast } from '@/components/ui/use-toast';

const MyRequests = () => {
  const { requests, isLoading, error } = useMyRequests();
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<MyRequest | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleRequestSelect = (request: MyRequest) => {
    setSelectedRequest(request);
    setIsDetailOpen(true);
  };

  const handleCancelRequest = (request: MyRequest) => {
    toast({
      title: "Đã huỷ yêu cầu",
      description: `Yêu cầu "${request.title}" đã được huỷ thành công.`,
    });
    setIsDetailOpen(false);
  };

  const handleResendRequest = (request: MyRequest) => {
    toast({
      title: "Đã gửi lại yêu cầu",
      description: `Yêu cầu "${request.title}" đã được gửi lại thành công.`,
    });
    setIsDetailOpen(false);
  };

  // Filter requests by status
  const filteredRequests = useMemo(() => {
    let filtered = requests;
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(request => request.status === selectedStatus);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request => 
        request.title.toLowerCase().includes(query) ||
        request.description.toLowerCase().includes(query) ||
        request.fileName.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [requests, selectedStatus, searchQuery]);

  // Calculate status counts for filter badges
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'Pending': 0,
      'InProgress': 0,
      'Approved': 0,
      'Rejected': 0
    };
    
    requests.forEach(request => {
      if (counts[request.status] !== undefined) {
        counts[request.status]++;
      }
    });
    
    return counts;
  }, [requests]);

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-100";
      case "Rejected":
        return "text-red-600 bg-red-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "InProgress":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Translate status to Vietnamese
  const translateStatus = (status: string) => {
    switch (status) {
      case "Approved": return "Đã phê duyệt";
      case "Rejected": return "Từ chối";
      case "Pending": return "Chờ xử lý";
      case "InProgress": return "Đang xử lý";
      default: return status;
    }
  };

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-500">Đã xảy ra lỗi khi tải dữ liệu: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        heading="Yêu cầu của tôi"
        description="Danh sách các yêu cầu trình ký và phê duyệt đã gửi"
      >
        <Button>
          <FileUp className="mr-2 h-4 w-4" />
          Gửi yêu cầu mới
        </Button>
      </PageHeader>

      <div className="mb-6 mt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên tài liệu, số hợp đồng, ID thuê bao..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-accent" : ""}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? "bg-accent" : ""}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('table')}
            className={viewMode === 'table' ? "bg-accent" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 bg-muted/40 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Thời gian gửi</label>
              <div className="flex items-center gap-2">
                <Input type="date" className="w-full" />
                <span className="text-sm">đến</span>
                <Input type="date" className="w-full" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Nhóm tài liệu</label>
              <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <option value="">Tất cả</option>
                <option value="Finance">Tài chính</option>
                <option value="HR">Nhân sự</option>
                <option value="Sales">Kinh doanh</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Áp dụng bộ lọc
              </Button>
            </div>
          </div>
        </div>
      )}

      <RequestStatusFilter
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        counts={statusCounts}
      />

      {isLoading ? (
        <div className="py-8 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          {filteredRequests.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">Không tìm thấy yêu cầu nào</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Không có kết quả phù hợp với tìm kiếm của bạn"
                  : selectedStatus !== "all"
                  ? `Bạn không có yêu cầu nào ở trạng thái "${translateStatus(selectedStatus)}"`
                  : "Bạn chưa gửi yêu cầu phê duyệt nào"}
              </p>
              <Button className="mt-4">
                <FileUp className="mr-2 h-4 w-4" />
                Gửi yêu cầu mới
              </Button>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {filteredRequests.map(request => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onSelect={handleRequestSelect}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên tài liệu</TableHead>
                        <TableHead>Loại tài liệu</TableHead>
                        <TableHead>Ngày yêu cầu</TableHead>
                        <TableHead>Hạn xử lý</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map(request => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.title}</TableCell>
                          <TableCell>{request.documentType}</TableCell>
                          <TableCell>{formatDate(request.requestDate)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {formatDate(request.dueDate)}
                              {request.sla.isOverdue && (
                                <span className="text-xs text-red-500 ml-1">(Quá hạn)</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {translateStatus(request.status)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRequestSelect(request)}
                              >
                                Xem chi tiết
                              </Button>
                              {request.status === "Pending" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleCancelRequest(request)}
                                >
                                  <X className="h-4 w-4 mr-1" /> Huỷ
                                </Button>
                              )}
                              {request.status === "Rejected" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleResendRequest(request)}
                                >
                                  <Send className="h-4 w-4 mr-1" /> Gửi lại
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}
        </>
      )}

      <RequestDetailsDialog
        request={selectedRequest}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onCancel={handleCancelRequest}
        onResend={handleResendRequest}
      />
    </div>
  );
};

export default MyRequests;
