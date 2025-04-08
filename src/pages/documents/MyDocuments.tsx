
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { 
  FileUp, FilePlus, FileEdit, Trash2, Download, Printer, Share2, 
  MessageSquare, Eye, Filter, Search, Save, Send, Upload, FileText, 
  Book, BookmarkCheck
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockDocuments = [
  { id: 1, name: 'Project Proposal', type: 'PDF', status: 'Published', modified: '2025-04-05', folder: 'Projects' },
  { id: 2, name: 'Meeting Minutes', type: 'DOCX', status: 'Draft', modified: '2025-04-06', folder: 'Meetings' },
  { id: 3, name: 'Financial Report', type: 'XLSX', status: 'Pending', modified: '2025-04-07', folder: 'Finance' },
  { id: 4, name: 'Employee Handbook', type: 'PDF', status: 'Published', modified: '2025-04-02', folder: 'HR' },
  { id: 5, name: 'Marketing Strategy', type: 'PPTX', status: 'Draft', modified: '2025-04-03', folder: 'Marketing' },
];

const mockFolders = ['Projects', 'Meetings', 'Finance', 'HR', 'Marketing', 'Legal'];
const documentTypes = ['PDF', 'DOCX', 'XLSX', 'PPTX', 'TXT', 'JPG'];
const statusOptions = ['Draft', 'Pending', 'Published'];

const MyDocuments = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [folderFilter, setFolderFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Form state for new document
  const [documentForm, setDocumentForm] = useState({
    name: '',
    type: 'PDF',
    category: '',
    folder: '',
    hasPassword: false,
    password: '',
    content: '',
    permissions: ['Admin'],
  });

  const filteredDocuments = documents.filter(doc => {
    return (
      (statusFilter === '' || doc.status === statusFilter) &&
      (typeFilter === '' || doc.type === typeFilter) &&
      (folderFilter === '' || doc.folder === folderFilter) &&
      (searchTerm === '' || doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setIsDetailViewOpen(true);
  };

  const handleEditDocument = (document) => {
    setDocumentForm({
      name: document.name,
      type: document.type,
      category: '',
      folder: document.folder,
      hasPassword: false,
      password: '',
      content: 'Document content would be loaded here',
      permissions: ['Admin'],
    });
  };

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "The document has been moved to the trash bin.",
    });
  };

  const handleSaveDraft = () => {
    const newDoc = {
      id: documents.length + 1,
      name: documentForm.name,
      type: documentForm.type,
      status: 'Draft',
      modified: new Date().toISOString().split('T')[0],
      folder: documentForm.folder || 'Uncategorized',
    };
    
    setDocuments([...documents, newDoc]);
    toast({
      title: "Draft saved",
      description: "Your document has been saved as a draft.",
    });
  };

  const handleSubmitForApproval = () => {
    const newDoc = {
      id: documents.length + 1,
      name: documentForm.name,
      type: documentForm.type,
      status: 'Pending',
      modified: new Date().toISOString().split('T')[0],
      folder: documentForm.folder || 'Uncategorized',
    };
    
    setDocuments([...documents, newDoc]);
    toast({
      title: "Document submitted",
      description: "Your document has been submitted for approval.",
    });
  };

  const handlePublish = () => {
    const newDoc = {
      id: documents.length + 1,
      name: documentForm.name,
      type: documentForm.type,
      status: 'Published',
      modified: new Date().toISOString().split('T')[0],
      folder: documentForm.folder || 'Uncategorized',
    };
    
    setDocuments([...documents, newDoc]);
    toast({
      title: "Document published",
      description: "Your document has been published successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Documents</h1>
          <p className="text-muted-foreground">Manage your personal documents.</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <FileUp className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="file-upload" className="text-sm font-medium">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Click or drag file to this area to upload</p>
                    <p className="text-xs text-gray-500">Support for PDF, DOCX, XLSX, PPTX, TXT files</p>
                    <input id="file-upload" type="file" className="hidden" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="doc-name" className="text-sm font-medium">Document Name</label>
                  <Input 
                    id="doc-name" 
                    value={documentForm.name} 
                    onChange={(e) => setDocumentForm({...documentForm, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="doc-type" className="text-sm font-medium">Document Type</label>
                    <select 
                      id="doc-type" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={documentForm.type}
                      onChange={(e) => setDocumentForm({...documentForm, type: e.target.value})}
                    >
                      {documentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="doc-folder" className="text-sm font-medium">Destination Folder</label>
                    <select 
                      id="doc-folder" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={documentForm.folder}
                      onChange={(e) => setDocumentForm({...documentForm, folder: e.target.value})}
                    >
                      <option value="">Select a folder</option>
                      {mockFolders.map(folder => (
                        <option key={folder} value={folder}>{folder}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="doc-permissions" className="text-sm font-medium">Permissions</label>
                  <select 
                    id="doc-permissions" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={documentForm.permissions[0]}
                    onChange={(e) => setDocumentForm({...documentForm, permissions: [e.target.value]})}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="password-protection" 
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={documentForm.hasPassword}
                      onChange={(e) => setDocumentForm({...documentForm, hasPassword: e.target.checked})}
                    />
                    <label htmlFor="password-protection" className="text-sm font-medium">
                      Password Protection
                    </label>
                  </div>
                  
                  {documentForm.hasPassword && (
                    <Input 
                      type="password" 
                      placeholder="Enter password" 
                      value={documentForm.password}
                      onChange={(e) => setDocumentForm({...documentForm, password: e.target.value})}
                    />
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button variant="outline" onClick={handleSubmitForApproval}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit for Approval
                </Button>
                <Button onClick={handlePublish}>
                  <FileText className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FilePlus className="mr-2 h-4 w-4" />
                Create Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Create New Document</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="doc-title" className="text-sm font-medium">Document Title</label>
                  <Input 
                    id="doc-title" 
                    placeholder="Enter document title"
                    value={documentForm.name}
                    onChange={(e) => setDocumentForm({...documentForm, name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="doc-content" className="text-sm font-medium">Document Content</label>
                  <Textarea 
                    id="doc-content" 
                    placeholder="Write your document content here..."
                    rows={10}
                    value={documentForm.content}
                    onChange={(e) => setDocumentForm({...documentForm, content: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="doc-type-create" className="text-sm font-medium">Document Type</label>
                    <select 
                      id="doc-type-create" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={documentForm.type}
                      onChange={(e) => setDocumentForm({...documentForm, type: e.target.value})}
                    >
                      {documentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="doc-folder-create" className="text-sm font-medium">Destination Folder</label>
                    <select 
                      id="doc-folder-create" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={documentForm.folder}
                      onChange={(e) => setDocumentForm({...documentForm, folder: e.target.value})}
                    >
                      <option value="">Select a folder</option>
                      {mockFolders.map(folder => (
                        <option key={folder} value={folder}>{folder}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="doc-permissions-create" className="text-sm font-medium">Permissions</label>
                  <select 
                    id="doc-permissions-create" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={documentForm.permissions[0]}
                    onChange={(e) => setDocumentForm({...documentForm, permissions: [e.target.value]})}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button variant="outline" onClick={handleSubmitForApproval}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit for Approval
                </Button>
                <Button onClick={handlePublish}>
                  <FileText className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 items-center bg-slate-50 p-4 rounded-lg">
        <div className="flex flex-1 items-center space-x-2">
          <Search className="h-4 w-4 opacity-50" />
          <Input 
            placeholder="Search documents..." 
            className="h-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 opacity-50" />
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {documentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            value={folderFilter}
            onChange={(e) => setFolderFilter(e.target.value)}
          >
            <option value="">All Folders</option>
            {mockFolders.map(folder => (
              <option key={folder} value={folder}>{folder}</option>
            ))}
          </select>
          <Button variant="ghost" size="icon" onClick={() => {
            setStatusFilter('');
            setTypeFilter('');
            setFolderFilter('');
            setSearchTerm('');
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M3 3h18v18H3z"></path>
              <path d="M7 7l10 10"></path>
              <path d="M17 7L7 17"></path>
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Document List */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Folder</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      doc.status === 'Published' ? 'bg-green-100 text-green-800' : 
                      doc.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </span>
                  </TableCell>
                  <TableCell>{doc.modified}</TableCell>
                  <TableCell>{doc.folder}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDocument(doc)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditDocument(doc)}>
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteDocument(doc.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No documents found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Document Detail Side Sheet */}
      <Sheet open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Document Details</SheetTitle>
          </SheetHeader>
          {selectedDocument && (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-auto py-6">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-6">
                    {/* Document Preview */}
                    <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center bg-slate-50">
                      <div className="text-center">
                        <FileText className="mx-auto h-16 w-16 text-gray-400" />
                        <p className="mt-2 text-sm font-medium">{selectedDocument.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{selectedDocument.type} file</p>
                      </div>
                    </div>
                    
                    {/* Document Content Preview */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Document Content</h4>
                      <div className="border rounded-lg p-4 min-h-[100px] text-sm">
                        This is a preview of the document content. In a real application, this would show the actual document content or a rendered preview.
                      </div>
                    </div>
                  </div>
                  
                  {/* Metadata Sidebar */}
                  <div className="w-[200px] space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Metadata</h4>
                      <dl className="space-y-2 text-sm">
                        <div>
                          <dt className="text-muted-foreground">Type</dt>
                          <dd>{selectedDocument.type}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Status</dt>
                          <dd>{selectedDocument.status}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Modified</dt>
                          <dd>{selectedDocument.modified}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Folder</dt>
                          <dd>{selectedDocument.folder}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Owner</dt>
                          <dd>Current User</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                          Document
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                          {selectedDocument.folder}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <SheetFooter className="border-t pt-4">
                <div className="flex flex-wrap w-full gap-2 justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Comment
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookmarkCheck className="mr-2 h-4 w-4" />
                      Bookmark
                    </Button>
                  </div>
                </div>
                
                {selectedDocument.status !== 'Published' && (
                  <div className="flex gap-2 w-full mt-4">
                    {selectedDocument.status === 'Draft' && (
                      <Button className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Submit for Approval
                      </Button>
                    )}
                    {selectedDocument.status === 'Pending' && (
                      <Button className="w-full" disabled>
                        <span className="mr-2">Waiting for Approval</span>
                      </Button>
                    )}
                  </div>
                )}
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MyDocuments;
