
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar } from '@/components/ui/avatar';
import { 
  FilePlus, 
  Search, 
  MoreHorizontal, 
  FileText, 
  Plus 
} from 'lucide-react';
import { TemplateDialog } from '@/components/templates/TemplateDialog';
import { useToast } from '@/hooks/use-toast';

// Define template data type
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  updatedAt: Date;
  author: {
    name: string;
    avatar?: string;
  };
}

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock template data
  const templates: Template[] = [
    {
      id: '1',
      name: 'Hợp đồng tiêu chuẩn',
      description: 'Mẫu hợp đồng tiêu chuẩn cho thỏa thuận khách hàng',
      category: 'Hợp đồng & Thỏa thuận',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
      author: {
        name: 'Nguyễn Văn A',
      },
    },
    {
      id: '2',
      name: 'Mẫu NDA',
      description: 'Mẫu thỏa thuận bảo mật cho đối tác bên ngoài',
      category: 'Tài liệu pháp lý & Tuân thủ',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
      author: {
        name: 'Trần Thị B',
      },
    },
    {
      id: '3',
      name: 'Mẫu hóa đơn',
      description: 'Mẫu hóa đơn tiêu chuẩn để lập hóa đơn cho khách hàng',
      category: 'Tài liệu tài chính & kế toán',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21), // 3 weeks ago
      author: {
        name: 'Lê Văn C',
      },
    },
    {
      id: '4',
      name: 'Hợp đồng lao động',
      description: 'Hợp đồng lao động tiêu chuẩn cho nhân viên mới',
      category: 'HR & Hồ sơ nhân viên',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60), // 2 months ago
      author: {
        name: 'Phạm Thị D',
      },
    },
    {
      id: '5',
      name: 'Báo cáo dự án',
      description: 'Mẫu để tạo báo cáo trạng thái dự án',
      category: 'Báo cáo hoạt động & Tài liệu dự án',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
      author: {
        name: 'Hoàng Văn E',
      },
    },
    {
      id: '6',
      name: 'Đơn đặt hàng',
      description: 'Mẫu đơn đặt hàng tiêu chuẩn cho nhà cung cấp',
      category: 'Mua sắm & Quản lý nhà cung cấp',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      author: {
        name: 'Đỗ Thị F',
      },
    },
  ];

  // Get unique categories for filter dropdown
  const categories = ['Tất cả danh mục', ...new Set(templates.map(t => t.category))];
  
  // Filter templates by search query and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort templates based on selected sort option
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 7) {
      return `Cập nhật ${days} ngày trước`;
    } else if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `Cập nhật ${weeks} ${weeks === 1 ? 'tuần' : 'tuần'} trước`;
    } else {
      const months = Math.floor(days / 30);
      return `Cập nhật ${months} ${months === 1 ? 'tháng' : 'tháng'} trước`;
    }
  };

  const handleCreateTemplate = () => {
    setIsCreateDialogOpen(true);
  };

  const handlePreview = (templateId: string) => {
    // Preview template implementation
    toast({
      title: "Xem trước mẫu",
      description: `Đang xem trước mẫu ID: ${templateId}`,
    });
  };

  const handleTemplateCreated = () => {
    toast({
      title: "Thành công",
      description: "Đã tạo mẫu thành công",
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mẫu tài liệu</h1>
        <Button onClick={handleCreateTemplate}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo mẫu
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm mẫu..." 
            className="pl-10" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tất cả danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              {categories.filter(c => c !== 'Tất cả danh mục').map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Cập nhật gần đây" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Cập nhật gần đây</SelectItem>
              <SelectItem value="name">Tên (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-4">
                <div className="text-xs bg-muted inline-block px-2 py-1 rounded-md">{template.category}</div>
                <p className="text-xs text-muted-foreground mt-2">{formatRelativeTime(template.updatedAt)}</p>
              </div>
            </CardContent>
            
            <CardFooter className="bg-muted/50 px-6 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  {template.author.avatar ? (
                    <img src={template.author.avatar} alt={template.author.name} />
                  ) : (
                    <div className="bg-primary h-full w-full flex items-center justify-center text-xs text-white">
                      {template.author.name.charAt(0)}
                    </div>
                  )}
                </Avatar>
                <span className="text-xs">{template.author.name}</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs" 
                onClick={() => handlePreview(template.id)}
              >
                Xem trước
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Create New Template Card */}
        <Card className="overflow-hidden flex flex-col justify-center items-center text-center p-10">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Tạo mẫu mới</h3>
          <p className="text-sm text-muted-foreground mb-6">Tạo mẫu tài liệu tùy chỉnh cho tổ chức của bạn</p>
          <Button onClick={handleCreateTemplate} className="mt-auto">Tạo mẫu</Button>
        </Card>
      </div>

      <TemplateDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
        onTemplateCreated={handleTemplateCreated}
      />
    </div>
  );
};

export default Templates;
