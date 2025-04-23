
import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { usePendingApprovals, PendingApproval } from '@/hooks/usePendingApprovals';
import { Search, Calendar, SlidersHorizontal, List, LayoutGrid, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PendingApprovalCard } from '@/components/approval/PendingApprovalCard';
import { PendingApprovalDetailsDialog } from '@/components/approval/PendingApprovalDetailsDialog';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const PendingApprovalPage = () => {
  const { approvals, isLoading, error } = usePendingApprovals();
  const { toast } = useToast();
  const [selectedApproval, setSelectedApproval] = useState<PendingApproval | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedSender, setSelectedSender] = useState<string | null>(null);

  const handleApprovalSelect = (approval: PendingApproval) => {
    setSelectedApproval(approval);
    setIsDetailOpen(true);
  };

  const handleApprove = (id: string, comment: string) => {
    toast({
      title: "Đã phê duyệt",
      description: comment 
        ? `Yêu cầu đã được phê duyệt với ghi chú: "${comment}"`
        : "Yêu cầu đã được phê duyệt thành công.",
    });
    setIsDetailOpen(false);
  };

  const handleReject = (id: string, comment: string) => {
    toast({
      title: "Đã từ chối",
      description: comment 
        ? `Yêu cầu đã bị từ chối với lý do: "${comment}"`
        : "Yêu cầu đã bị từ chối.",
      variant: "destructive"
    });
    setIsDetailOpen(false);
  };

  // Filter approvals by search query, priority and sender
  const filteredApprovals = useMemo(() => {
    let filtered = approvals;
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(approval => 
        approval.title.toLowerCase().includes(query) ||
        approval.description.toLowerCase().includes(query) ||
        approval.fileName.toLowerCase().includes(query)
      );
    }

    // Filter by priority
    if (selectedPriority) {
      filtered = filtered.filter(approval => approval.priority === selectedPriority);
    }

    // Filter by sender
    if (selectedSender) {
      filtered = filtered.filter(approval => approval.sender.name === selectedSender);
    }
    
    return filtered;
  }, [approvals, searchQuery, selectedPriority, selectedSender]);

  // Get unique senders for filter
  const uniqueSenders = useMemo(() => {
    const senders = new Set<string>();
    approvals.forEach(approval => {
      senders.add(approval.sender.name);
    });
    return Array.from(senders);
  }, [approvals]);

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Low":
        return <Badge className="bg-gray-500">Thấp</Badge>;
      case "Medium":
        return <Badge className="bg-blue-500">Trung bình</Badge>;
      case "High":
        return <Badge className="bg-orange-500">Cao</Badge>;
      case "Urgent":
        return <Badge className="bg-red-500">Khẩn cấp</Badge>;
      default:
        return <Badge className="bg-gray-500">{priority}</Badge>;
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
        heading="Chờ tôi phê duyệt"
        description="Danh sách các yêu cầu đang chờ bạn phê duyệt hoặc ký duyệt"
      />

      <div className="mb-6 mt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên tài liệu, từ khóa..."
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
              <label className="text-sm font-medium mb-1 block">Độ ưu tiên</label>
              <select 
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                value={selectedPriority || ""}
                onChange={(e) => setSelectedPriority(e.target.value || null)}
              >
                <option value="">Tất cả</option>
                <option value="Low">Thấp</option>
                <option value="Medium">Trung bình</option>
                <option value="High">Cao</option>
                <option value="Urgent">Khẩn cấp</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Người gửi</label>
              <select 
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                value={selectedSender || ""}
                onChange={(e) => setSelectedSender(e.target.value || null)}
              >
                <option value="">Tất cả</option>
                {uniqueSenders.map(sender => (
                  <option key={sender} value={sender}>{sender}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Ngày gửi</label>
              <div className="flex items-center gap-2">
                <Input type="date" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="py-8 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          {filteredApprovals.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">Không có yêu cầu nào chờ xử lý</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedPriority || selectedSender
                  ? "Không có kết quả phù hợp với bộ lọc của bạn"
                  : "Tất cả các yêu cầu đã được xử lý"}
              </p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {filteredApprovals.map(approval => (
                    <PendingApprovalCard
                      key={approval.id}
                      approval={approval}
                      onSelect={handleApprovalSelect}
                      onApprove={(id) => handleApprove(id, "")}
                      onReject={(id) => handleReject(id, "")}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên tài liệu</TableHead>
                        <TableHead>Người gửi</TableHead>
                        <TableHead>Ngày yêu cầu</TableHead>
                        <TableHead>Hạn xử lý</TableHead>
                        <TableHead>Độ ưu tiên</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApprovals.map(approval => (
                        <TableRow key={approval.id}>
                          <TableCell className="font-medium">{approval.title}</TableCell>
                          <TableCell>{approval.sender.name}</TableCell>
                          <TableCell>{formatDate(approval.requestDate)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {formatDate(approval.dueDate)}
                              {approval.sla.isOverdue && (
                                <span className="text-xs text-red-500 ml-1">(Quá hạn)</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getPriorityBadge(approval.priority)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleApprovalSelect(approval)}
                              >
                                Xem chi tiết
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleReject(approval.id, "")}
                              >
                                <AlertCircle className="h-4 w-4 mr-1" /> Từ chối
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-green-500 hover:text-green-600 hover:bg-green-50"
                                onClick={() => handleApprove(approval.id, "")}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" /> Phê duyệt
                              </Button>
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

      <PendingApprovalDetailsDialog
        approval={selectedApproval}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default PendingApprovalPage;
