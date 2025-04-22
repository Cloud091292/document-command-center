
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Grid2X2, 
  List, 
  Trash2, 
  FileText,
  RotateCcw,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const deletedDocuments = [
  {
    id: '1',
    name: 'Hợp đồng tư vấn 2024',
    type: 'pdf',
    size: '2.4MB',
    deletedAt: new Date('2024-04-01'),
    deletedBy: 'Nguyễn Văn A',
    category: 'Hợp đồng',
    expirationDays: 25,
  },
  {
    id: '2',
    name: 'Báo cáo tài chính Q1/2024',
    type: 'xlsx',
    size: '1.8MB',
    deletedAt: new Date('2024-04-05'),
    deletedBy: 'Trần Thị B',
    category: 'Tài chính',
    expirationDays: 29,
  },
  {
    id: '3',
    name: 'Biên bản họp HĐQT',
    type: 'docx',
    size: '1.2MB',
    deletedAt: new Date('2024-04-10'),
    deletedBy: 'Phạm Văn C',
    category: 'Quản trị doanh nghiệp',
    expirationDays: 24,
  },
  {
    id: '4',
    name: 'Phiếu yêu cầu thanh toán',
    type: 'pdf',
    size: '0.8MB',
    deletedAt: new Date('2024-04-12'),
    deletedBy: 'Lê Thị D',
    category: 'Tài chính',
    expirationDays: 26,
  },
  {
    id: '5',
    name: 'Hồ sơ khách hàng ABC',
    type: 'pdf',
    size: '5.2MB',
    deletedAt: new Date('2024-04-15'),
    deletedBy: 'Nguyễn Văn A',
    category: 'Khách hàng',
    expirationDays: 29,
  },
];

const TrashBin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmRestoreId, setConfirmRestoreId] = useState<string | null>(null);
  
  const filteredDocuments = deletedDocuments.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.deletedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handlePermanentDelete = () => {
    console.log(`Permanently deleting document ${confirmDeleteId}`);
    setConfirmDeleteId(null);
    // Fix: Changed from object format to string format for toast
    toast("Đã xóa vĩnh viễn tài liệu", {
      description: "Tài liệu đã được xóa vĩnh viễn khỏi hệ thống.",
    });
  };
  
  const handleRestoreDocument = () => {
    console.log(`Restoring document ${confirmRestoreId}`);
    setConfirmRestoreId(null);
    // Fix: Changed from object format to string format for toast
    toast("Đã khôi phục tài liệu", {
      description: "Tài liệu đã được khôi phục về thư mục gốc.",
    });
  };
  
  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <div className="bg-red-100 text-red-800 px-1.5 py-0.5 rounded text-xs">PDF</div>;
      case 'docx':
        return <div className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-xs">DOCX</div>;
      case 'xlsx':
        return <div className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-xs">XLSX</div>;
      default:
        return <div className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-xs">{type.toUpperCase()}</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Thùng rác</h1>
          <p className="text-muted-foreground">Xem lại và quản lý các tài liệu đã xóa. Tài liệu sẽ bị xóa vĩnh viễn sau 30 ngày.</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm tài liệu đã xóa..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center ml-auto gap-2">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid2X2 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Lọc
          </Button>
        </div>
      </div>
      
      {filteredDocuments.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-10">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Trash2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Thùng rác trống</h3>
            <p className="text-muted-foreground text-center mt-2">
              Không có tài liệu nào trong thùng rác hoặc không tìm thấy kết quả phù hợp.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {viewMode === 'list' ? (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên tài liệu</TableHead>
                    <TableHead>Phân loại</TableHead>
                    <TableHead>Ngày xóa</TableHead>
                    <TableHead>Người xóa</TableHead>
                    <TableHead>Thời hạn còn lại</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{doc.name}</span>
                          <span className="text-xs text-muted-foreground">({doc.size})</span>
                          {getFileTypeIcon(doc.type)}
                        </div>
                      </TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{format(doc.deletedAt, 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{doc.deletedBy}</TableCell>
                      <TableCell>
                        <Badge variant={doc.expirationDays < 7 ? "destructive" : "secondary"}>
                          Còn {doc.expirationDays} ngày
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setConfirmRestoreId(doc.id)}
                          >
                            <RotateCcw className="h-4 w-4" />
                            <span className="sr-only">Khôi phục</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setConfirmDeleteId(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Xóa vĩnh viễn</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-2">
                        <div className="mt-1">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm line-clamp-2">{doc.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getFileTypeIcon(doc.type)}
                            <span className="text-xs text-muted-foreground">{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setConfirmRestoreId(doc.id)}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            <span>Khôi phục</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => setConfirmDeleteId(doc.id)} 
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Xóa vĩnh viễn</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phân loại:</span>
                        <span className="font-medium">{doc.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ngày xóa:</span>
                        <span>{format(doc.deletedAt, 'dd/MM/yyyy')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Người xóa:</span>
                        <span>{doc.deletedBy}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">Thời hạn:</span>
                        <Badge variant={doc.expirationDays < 7 ? "destructive" : "secondary"}>
                          Còn {doc.expirationDays} ngày
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
      
      <Dialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa vĩnh viễn</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa vĩnh viễn tài liệu này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>Hủy</Button>
            <Button variant="destructive" onClick={handlePermanentDelete}>Xóa vĩnh viễn</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!confirmRestoreId} onOpenChange={() => setConfirmRestoreId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Khôi phục tài liệu</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn khôi phục tài liệu này về thư mục gốc?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmRestoreId(null)}>Hủy</Button>
            <Button onClick={handleRestoreDocument}>Khôi phục</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrashBin;
