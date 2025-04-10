
import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Search, Filter, Plus } from "lucide-react";
import { useMyRequests, MyRequest } from "@/hooks/useMyRequests";
import { useIsMobile } from "@/hooks/use-mobile";
import { RequestCard } from "@/components/approval/RequestCard";
import { RequestDetail } from "@/components/approval/RequestDetail";
import { RequestStatusFilter } from "@/components/approval/RequestStatusFilter";

const MyRequests = () => {
  const { requests, isLoading } = useMyRequests();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<MyRequest | null>(null);
  const isMobile = useIsMobile();

  // Filter requests based on search query and selected status
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch = 
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.requestGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.processingUnit.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || req.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [requests, searchQuery, selectedStatus]);

  // Calculate counts for each status
  const statusCounts = useMemo(() => {
    return requests.reduce((counts, req) => {
      const status = req.status;
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  }, [requests]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Yêu cầu của tôi</h1>
          <p className="text-muted-foreground">Xem và quản lý các yêu cầu phê duyệt của bạn.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tạo yêu cầu
        </Button>
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm yêu cầu..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Status filter tabs */}
      <RequestStatusFilter 
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        counts={statusCounts}
      />
      
      {/* Requests grid */}
      {isLoading ? (
        <div className="flex justify-center p-8">Đang tải yêu cầu...</div>
      ) : filteredRequests.length === 0 ? (
        <div className="border rounded-lg p-16 text-center">
          <h2 className="text-xl font-semibold mb-2">Không tìm thấy yêu cầu nào</h2>
          <p className="text-muted-foreground">
            {searchQuery || selectedStatus !== "all" 
              ? "Hãy điều chỉnh tìm kiếm hoặc bộ lọc của bạn"
              : "Bạn chưa gửi bất kỳ yêu cầu nào"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onSelect={setSelectedRequest}
            />
          ))}
        </div>
      )}
      
      {/* Request detail dialog/drawer */}
      {isMobile ? (
        <Drawer open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
          {selectedRequest && (
            <>
              <DrawerHeader className="text-center">{selectedRequest.title}</DrawerHeader>
              <DrawerContent className="px-4 pb-6 pt-2 h-[80vh]">
                <div className="max-h-full overflow-auto">
                  <RequestDetail
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                  />
                </div>
              </DrawerContent>
            </>
          )}
        </Drawer>
      ) : (
        <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            {selectedRequest && (
              <RequestDetail
                request={selectedRequest}
                onClose={() => setSelectedRequest(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MyRequests;
