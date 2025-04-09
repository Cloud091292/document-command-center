
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Define interfaces
interface ClassificationType {
  id: string;
  name: string;
  description: string;
  usageScope?: string;
}

const Classification = () => {
  // State for classifications
  const [documentTypes, setDocumentTypes] = useState<ClassificationType[]>([
    { id: '1', name: 'Công văn', description: 'Official dispatches and correspondence', usageScope: 'All departments' },
    { id: '2', name: 'Ủy quyền', description: 'Authorization documents', usageScope: 'Legal department' },
    { id: '3', name: 'Thông báo', description: 'Announcements and notifications', usageScope: 'All departments' },
    { id: '4', name: 'Quyết định', description: 'Decisions from management', usageScope: 'Management' },
    { id: '5', name: 'Quy chế', description: 'Regulations', usageScope: 'HR department' },
    { id: '6', name: 'Quy định', description: 'Rules and guidelines', usageScope: 'All departments' }
  ]);

  const [documentSources, setDocumentSources] = useState<ClassificationType[]>([
    { id: '1', name: 'Cơ quan nhà nước', description: 'Government agencies', usageScope: 'External' },
    { id: '2', name: 'Đảng', description: 'Party organizations', usageScope: 'External' },
    { id: '3', name: 'Doanh nghiệp', description: 'Business entities', usageScope: 'External' },
    { id: '4', name: 'Đối tác', description: 'Partners', usageScope: 'External' },
    { id: '5', name: 'Khác', description: 'Other sources', usageScope: 'External' }
  ]);

  const [sendingUnits, setSendingUnits] = useState<ClassificationType[]>([
    { id: '1', name: 'Sở Công thương', description: 'Department of Industry and Trade', usageScope: 'External' },
    { id: '2', name: 'UBND thành phố Hà Nội', description: 'Hanoi People\'s Committee', usageScope: 'External' },
    { id: '3', name: 'Cục thuế Tp Hà Nội', description: 'Hanoi Tax Department', usageScope: 'External' }
  ]);

  const [receivingUnits, setReceivingUnits] = useState<ClassificationType[]>([
    { id: '1', name: 'Văn phòng công ty', description: 'Company office', usageScope: 'Internal' },
    { id: '2', name: 'Ban mua sắm', description: 'Procurement department', usageScope: 'Internal' },
    { id: '3', name: 'Khối đầu tư', description: 'Investment division', usageScope: 'Internal' }
  ]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('document-types');
  const [editingItem, setEditingItem] = useState<ClassificationType | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    usageScope: ''
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ name: '', description: '', usageScope: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ClassificationType) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      usageScope: item.usageScope || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    const newItem: ClassificationType = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name: formData.name,
      description: formData.description,
      usageScope: formData.usageScope
    };

    if (editingItem) {
      // Update existing item
      switch (activeTab) {
        case 'document-types':
          setDocumentTypes(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
          break;
        case 'document-sources':
          setDocumentSources(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
          break;
        case 'sending-units':
          setSendingUnits(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
          break;
        case 'receiving-units':
          setReceivingUnits(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
          break;
      }
      toast({
        title: "Classification updated",
        description: `${newItem.name} has been successfully updated.`
      });
    } else {
      // Add new item
      switch (activeTab) {
        case 'document-types':
          setDocumentTypes(prev => [...prev, newItem]);
          break;
        case 'document-sources':
          setDocumentSources(prev => [...prev, newItem]);
          break;
        case 'sending-units':
          setSendingUnits(prev => [...prev, newItem]);
          break;
        case 'receiving-units':
          setReceivingUnits(prev => [...prev, newItem]);
          break;
      }
      toast({
        title: "Classification added",
        description: `${newItem.name} has been successfully added.`
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    switch (activeTab) {
      case 'document-types':
        setDocumentTypes(prev => prev.filter(item => item.id !== id));
        break;
      case 'document-sources':
        setDocumentSources(prev => prev.filter(item => item.id !== id));
        break;
      case 'sending-units':
        setSendingUnits(prev => prev.filter(item => item.id !== id));
        break;
      case 'receiving-units':
        setReceivingUnits(prev => prev.filter(item => item.id !== id));
        break;
    }
    
    toast({
      title: "Classification deleted",
      description: "The classification has been successfully removed."
    });
  };

  const getActiveData = () => {
    switch (activeTab) {
      case 'document-types':
        return documentTypes;
      case 'document-sources':
        return documentSources;
      case 'sending-units':
        return sendingUnits;
      case 'receiving-units':
        return receivingUnits;
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Classification Management</h1>
          <p className="text-muted-foreground">Define and manage document classification schemes.</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Classification
        </Button>
      </div>
      
      <Tabs defaultValue="document-types" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="document-types">Document Types</TabsTrigger>
          <TabsTrigger value="document-sources">Document Sources</TabsTrigger>
          <TabsTrigger value="sending-units">Sending Units</TabsTrigger>
          <TabsTrigger value="receiving-units">Receiving Units</TabsTrigger>
        </TabsList>
        
        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Usage Scope</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getActiveData().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      {item.usageScope && (
                        <Badge variant="outline">{item.usageScope}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => openEditModal(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Tabs>

      {/* Add/Edit Classification Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Classification' : 'Add New Classification'}</DialogTitle>
            <DialogDescription>
              {editingItem 
                ? 'Update the details of this classification.' 
                : 'Fill in the details to add a new classification.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="usageScope" className="text-right">
                Usage Scope
              </label>
              <Input
                id="usageScope"
                name="usageScope"
                value={formData.usageScope}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.name}>
              {editingItem ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Classification;
