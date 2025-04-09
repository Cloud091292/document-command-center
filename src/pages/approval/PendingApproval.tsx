
import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Search, Filter } from "lucide-react";
import { ApprovalDocumentCard } from "@/components/approval/ApprovalDocumentCard";
import { ApprovalDocumentDetail } from "@/components/approval/ApprovalDocumentDetail";
import { ApprovalStatusFilter } from "@/components/approval/ApprovalStatusFilter";
import { useApprovalDocuments, ApprovalDocument, ApprovalStatus } from "@/hooks/useApprovalDocuments";
import { useMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const PendingApproval = () => {
  const { documents, isLoading, updateDocumentStatus } = useApprovalDocuments();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<ApprovalDocument | null>(null);
  const isMobile = useMobile();
  const { toast } = useToast();

  // Filter documents based on search query and selected status
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [documents, searchQuery, selectedStatus]);

  // Calculate counts for each status
  const statusCounts = useMemo(() => {
    return documents.reduce((counts, doc) => {
      const status = doc.status;
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  }, [documents]);

  // Handle status update
  const handleUpdateStatus = (id: string, status: ApprovalStatus, comment?: string) => {
    updateDocumentStatus(id, status, comment);
    
    toast({
      title: "Document status updated",
      description: `The document has been ${status.toLowerCase()}.`,
      variant: status === "Rejected" ? "destructive" : "default",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pending Approval</h1>
        <p className="text-muted-foreground">Review and process documents awaiting your approval.</p>
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
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
      <ApprovalStatusFilter 
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        counts={statusCounts}
      />
      
      {/* Documents grid */}
      {isLoading ? (
        <div className="flex justify-center p-8">Loading documents...</div>
      ) : filteredDocuments.length === 0 ? (
        <div className="border rounded-lg p-16 text-center">
          <h2 className="text-xl font-semibold mb-2">No documents found</h2>
          <p className="text-muted-foreground">
            {searchQuery || selectedStatus !== "all" 
              ? "Try adjusting your search or filters"
              : "There are no documents requiring your approval at this time"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocuments.map((doc) => (
            <ApprovalDocumentCard
              key={doc.id}
              document={doc}
              onSelect={setSelectedDocument}
            />
          ))}
        </div>
      )}
      
      {/* Document detail dialog/drawer */}
      {isMobile ? (
        <Drawer open={!!selectedDocument} onOpenChange={(open) => !open && setSelectedDocument(null)}>
          {selectedDocument && (
            <>
              <DrawerHeader className="text-center">{selectedDocument.title}</DrawerHeader>
              <DrawerContent className="px-4 pb-6 pt-2 h-[80vh]">
                <div className="max-h-full overflow-auto">
                  <ApprovalDocumentDetail
                    document={selectedDocument}
                    onClose={() => setSelectedDocument(null)}
                    onUpdateStatus={handleUpdateStatus}
                  />
                </div>
              </DrawerContent>
            </>
          )}
        </Drawer>
      ) : (
        <Dialog open={!!selectedDocument} onOpenChange={(open) => !open && setSelectedDocument(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            {selectedDocument && (
              <ApprovalDocumentDetail
                document={selectedDocument}
                onClose={() => setSelectedDocument(null)}
                onUpdateStatus={handleUpdateStatus}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PendingApproval;
