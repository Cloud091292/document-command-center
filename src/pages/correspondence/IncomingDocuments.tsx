
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Calendar, Filter, Grid, List, Plus, Search, Upload } from 'lucide-react';
import { IncomingDocumentsList } from "@/components/correspondence/IncomingDocumentsList";
import { IncomingDocumentsGrid } from "@/components/correspondence/IncomingDocumentsGrid";
import { DocumentUploadForm } from "@/components/correspondence/DocumentUploadForm";
import { DocumentFilters } from "@/components/correspondence/DocumentFilters";
import { DocumentDetailView } from "@/components/correspondence/DocumentDetailView";
import { useDocuments } from "@/hooks/useDocuments";

const IncomingDocuments = () => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { documents, isLoading } = useDocuments('incoming');

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.classification.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setDetailViewOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Incoming Documents</h1>
          <p className="text-muted-foreground">Manage incoming correspondence and documents.</p>
        </div>
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Plus className="mr-2" />
          Add Document
        </Button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => setFilterSheetOpen(true)}>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <div className="border rounded-md">
          <Button
            variant={view === 'list' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-r-none"
            onClick={() => setView('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={view === 'grid' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-l-none"
            onClick={() => setView('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processed">Processed</TabsTrigger>
          <TabsTrigger value="forwarded">Forwarded</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {view === 'list' ? (
            <IncomingDocumentsList 
              documents={filteredDocuments} 
              isLoading={isLoading}
              onViewDocument={handleViewDocument} 
            />
          ) : (
            <IncomingDocumentsGrid 
              documents={filteredDocuments}
              isLoading={isLoading}
              onViewDocument={handleViewDocument}
            />
          )}
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardContent className="p-6">
              <p>Pending documents content</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="processed">
          <Card>
            <CardContent className="p-6">
              <p>Processed documents content</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forwarded">
          <Card>
            <CardContent className="p-6">
              <p>Forwarded documents content</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upload Document Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add Incoming Document</DialogTitle>
            <DialogDescription>
              Upload a new document and add required metadata.
            </DialogDescription>
          </DialogHeader>
          <DocumentUploadForm onClose={() => setUploadDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Filter Sheet */}
      <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Documents</SheetTitle>
            <SheetDescription>
              Narrow down your document results.
            </SheetDescription>
          </SheetHeader>
          <DocumentFilters onApply={() => setFilterSheetOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Document Detail View */}
      <Sheet open={detailViewOpen} onOpenChange={setDetailViewOpen}>
        <SheetContent className="sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>Document Details</SheetTitle>
          </SheetHeader>
          {selectedDocument && (
            <DocumentDetailView 
              document={selectedDocument} 
              onClose={() => setDetailViewOpen(false)} 
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default IncomingDocuments;
