
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
  X
} from 'lucide-react';

// Mock data for outgoing documents
const outgoingDocuments = [
  {
    id: '1',
    title: 'Annual Report 2025',
    classification: 'Financial',
    recipient: 'Board of Directors',
    dateSent: '2025-04-01',
    status: 'Delivered',
    referenceCode: 'OUT-FIN-2025-001',
    destinationUnit: 'Executive Office',
    releaseStatus: 'Official'
  },
  {
    id: '2',
    title: 'Product Launch Strategy',
    classification: 'Marketing',
    recipient: 'Marketing Department',
    dateSent: '2025-04-03',
    status: 'Processing',
    referenceCode: 'OUT-MKT-2025-045',
    destinationUnit: 'Marketing Department',
    releaseStatus: 'Internal'
  },
  {
    id: '3',
    title: 'Q1 Financial Statement',
    classification: 'Financial',
    recipient: 'Shareholders',
    dateSent: '2025-04-05',
    status: 'Pending',
    referenceCode: 'OUT-FIN-2025-023',
    destinationUnit: 'Finance Department',
    releaseStatus: 'Official'
  },
  {
    id: '4',
    title: 'Vendor Contract Renewal',
    classification: 'Legal',
    recipient: 'Supply Chain Partners',
    dateSent: '2025-04-02',
    status: 'Delivered',
    referenceCode: 'OUT-LEG-2025-012',
    destinationUnit: 'Legal Department',
    releaseStatus: 'Confidential'
  },
  {
    id: '5',
    title: 'Employee Benefits Update',
    classification: 'HR',
    recipient: 'All Staff',
    dateSent: '2025-04-07',
    status: 'Processing',
    referenceCode: 'OUT-HR-2025-034',
    destinationUnit: 'HR Department',
    releaseStatus: 'Internal'
  },
];

// Mock data for document categories
const documentClassifications = ['Financial', 'Marketing', 'Legal', 'HR', 'Operations'];
const documentStatuses = ['Draft', 'Pending', 'Processing', 'Delivered', 'Rejected'];
const destinationUnits = ['Executive Office', 'Finance Department', 'Marketing Department', 'HR Department', 'Legal Department', 'Operations Department'];
const releaseStatuses = ['Official', 'Internal', 'Confidential', 'Draft'];

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
  });

  // Filter documents based on search query and filters
  const filteredDocuments = outgoingDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.referenceCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClassification = !filters.classification || doc.classification === filters.classification;
    const matchesStatus = !filters.status || doc.status === filters.status;
    const matchesDestination = !filters.destinationUnit || doc.destinationUnit === filters.destinationUnit;
    const matchesRelease = !filters.releaseStatus || doc.releaseStatus === filters.releaseStatus;
    
    return matchesSearch && matchesClassification && matchesStatus && matchesDestination && matchesRelease;
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Outgoing Documents</h1>
          <p className="text-muted-foreground">Manage outgoing correspondence and documents.</p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <FilePlus className="mr-2 h-4 w-4" />
                New Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Outgoing Document</DialogTitle>
                <DialogDescription>
                  Upload a document and add metadata for outgoing correspondence.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <FormLabel>Upload Document</FormLabel>
                  <Input type="file" className="cursor-pointer" />
                </div>
                
                <div className="grid gap-2">
                  <FormLabel>Title</FormLabel>
                  <Input placeholder="Document title" />
                </div>

                <div className="grid gap-2">
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder="Brief description of the document" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormLabel>Classification</FormLabel>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select classification</option>
                      {documentClassifications.map(classification => (
                        <option key={classification} value={classification}>{classification}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <FormLabel>Reference Code</FormLabel>
                    <Input placeholder="Reference code" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormLabel>Destination Unit</FormLabel>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select destination unit</option>
                      {destinationUnits.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <FormLabel>Release Status</FormLabel>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select release status</option>
                      {releaseStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" type="button">Save as Draft</Button>
                <Button variant="outline" type="button">Submit for Approval</Button>
                <Button type="submit">Publish</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex justify-between items-center space-x-4 mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
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
            Filters
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
        <div className="border rounded-md p-4 bg-muted/40 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <FormLabel>Classification</FormLabel>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filters.classification}
              onChange={(e) => handleFilterChange('classification', e.target.value)}
            >
              <option value="">All Classifications</option>
              {documentClassifications.map(classification => (
                <option key={classification} value={classification}>{classification}</option>
              ))}
            </select>
          </div>
          <div>
            <FormLabel>Status</FormLabel>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Statuses</option>
              {documentStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <FormLabel>Destination Unit</FormLabel>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filters.destinationUnit}
              onChange={(e) => handleFilterChange('destinationUnit', e.target.value)}
            >
              <option value="">All Destination Units</option>
              {destinationUnits.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          <div>
            <FormLabel>Release Status</FormLabel>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filters.releaseStatus}
              onChange={(e) => handleFilterChange('releaseStatus', e.target.value)}
            >
              <option value="">All Release Statuses</option>
              {releaseStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 md:col-span-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <X className="h-4 w-4 mr-2" /> Reset Filters
            </Button>
          </div>
        </div>
      )}

      {viewMode === 'list' ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Classification</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Date Sent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference Code</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.title}</TableCell>
                    <TableCell>{doc.classification}</TableCell>
                    <TableCell>{doc.recipient}</TableCell>
                    <TableCell>{doc.dateSent}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        doc.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status}
                      </span>
                    </TableCell>
                    <TableCell>{doc.referenceCode}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
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
                  <TableCell colSpan={7} className="text-center py-6">
                    No documents found matching your criteria
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
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    doc.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  Classification: {doc.classification}
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  Recipient: {doc.recipient}
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  Date Sent: {doc.dateSent}
                </div>
                <div className="text-sm text-muted-foreground">
                  Ref: {doc.referenceCode}
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
              <h3 className="text-lg font-medium mb-1">No documents found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      )}

      {selectedDocument && (
        <Sheet open={!!selectedDocument} onOpenChange={() => closeDocumentDetails()}>
          <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{selectedDocument.title}</SheetTitle>
              <SheetDescription>
                Reference code: {selectedDocument.referenceCode}
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-md p-6 bg-muted/30 flex items-center justify-center min-h-[300px]">
                <FileText className="h-16 w-16 text-muted-foreground" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Classification</h4>
                  <p className="text-sm text-muted-foreground">{selectedDocument.classification}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Status</h4>
                  <p className="text-sm text-muted-foreground">{selectedDocument.status}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Recipient</h4>
                  <p className="text-sm text-muted-foreground">{selectedDocument.recipient}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Date Sent</h4>
                  <p className="text-sm text-muted-foreground">{selectedDocument.dateSent}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Destination Unit</h4>
                  <p className="text-sm text-muted-foreground">{selectedDocument.destinationUnit}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Release Status</h4>
                  <p className="text-sm text-muted-foreground">{selectedDocument.releaseStatus}</p>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-between">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Forward
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default OutgoingDocuments;
