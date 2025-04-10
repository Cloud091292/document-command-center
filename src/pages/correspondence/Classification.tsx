
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
    { id: '1', name: 'Công văn', description: 'Công văn và thư tín chính thức', usageScope: 'Tất cả phòng ban' },
    { id: '2', name: 'Ủy quyền', description: 'Tài liệu ủy quyền', usageScope: 'Phòng pháp chế' },
    { id: '3', name: 'Thông báo', description: 'Thông báo và thông tin', usageScope: 'Tất cả phòng ban' },
    { id: '4', name: 'Quyết định', description: 'Quyết định từ ban lãnh đạo', usageScope: 'Ban lãnh đạo' },
    { id: '5', name: 'Quy chế', description: 'Quy chế', usageScope: 'Phòng nhân sự' },
    { id: '6', name: 'Quy định', description: 'Quy tắc và hướng dẫn', usageScope: 'Tất cả phòng ban' }
  ]);

  const [documentSources, setDocumentSources] = useState<ClassificationType[]>([
    { id: '1', name: 'Cơ quan nhà nước', description: 'Cơ quan nhà nước', usageScope: 'Bên ngoài' },
    { id: '2', name: 'Đảng', description: 'Tổ chức Đảng', usageScope: 'Bên ngoài' },
    { id: '3', name: 'Doanh nghiệp', description: 'Các doanh nghiệp', usageScope: 'Bên ngoài' },
    { id: '4', name: 'Đối tác', description: 'Đối tác', usageScope: 'Bên ngoài' },
    { id: '5', name: 'Khác', description: 'Nguồn khác', usageScope: 'Bên ngoài' }
  ]);

  const [sendingUnits, setSendingUnits] = useState<ClassificationType[]>([
    { id: '1', name: 'Sở Công thương', description: 'Sở Công thương', usageScope: 'Bên ngoài' },
    { id: '2', name: 'UBND thành phố Hà Nội', description: 'Ủy ban Nhân dân thành phố Hà Nội', usageScope: 'Bên ngoài' },
    { id: '3', name: 'Cục thuế Tp Hà Nội', description: 'Cục thuế thành phố Hà Nội', usageScope: 'Bên ngoài' }
  ]);

  const [receivingUnits, setReceivingUnits] = useState<ClassificationType[]>([
    { id: '1', name: 'Văn phòng công ty', description: 'Văn phòng công ty', usageScope: 'Nội bộ' },
    { id: '2', name: 'Ban mua sắm', description: 'Phòng mua sắm', usageScope: 'Nội bộ' },
    { id: '3', name: 'Khối đầu tư', description: 'Bộ phận đầu tư', usageScope: 'Nội bộ' }
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
        title: "Đã cập nhật phân loại",
        description: `${newItem.name} đã được cập nhật thành công.`
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
        title: "Đã thêm phân loại",
        description: `${newItem.name} đã được thêm thành công.`
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
      title: "Đã xóa phân loại",
      description: "Phân loại đã được xóa thành công."
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
          <h1 className="text-3xl font-bold">Quản lý phân loại</h1>
          <p className="text-muted-foreground">Xác định và quản lý các sơ đồ phân loại tài liệu.</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm phân loại
        </Button>
      </div>
      
      <Tabs defaultValue="document-types" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="document-types">Loại tài liệu</TabsTrigger>
          <TabsTrigger value="document-sources">Nguồn tài liệu</TabsTrigger>
          <TabsTrigger value="sending-units">Đơn vị gửi</TabsTrigger>
          <TabsTrigger value="receiving-units">Đơn vị nhận</TabsTrigger>
        </TabsList>
        
        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Phạm vi sử dụng</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
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
            <DialogTitle>{editingItem ? 'Sửa phân loại' : 'Thêm phân loại mới'}</DialogTitle>
            <DialogDescription>
              {editingItem 
                ? 'Cập nhật chi tiết của phân loại này.' 
                : 'Điền thông tin để thêm phân loại mới.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Tên
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
                Mô tả
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
                Phạm vi sử dụng
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
              Hủy
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.name}>
              {editingItem ? 'Cập nhật' : 'Thêm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Classification;
