
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Grid2X2,
  List,
  Search,
  Filter,
  Folder,
  X,
} from 'lucide-react';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from '@/components/ui/toggle-group';

interface Category {
  name: string;
  count: number;
  icon: React.ComponentType<any>;
}

interface CustomerDocumentSectionProps {
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const CustomerDocumentSection: React.FC<CustomerDocumentSectionProps> = ({
  categories,
  searchQuery,
  setSearchQuery,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});
  
  // Filter states
  const [contractNumber, setContractNumber] = useState('');
  const [subscriberId, setSubscriberId] = useState('');
  const [fileStatus, setFileStatus] = useState<string[]>([]);
  const [fileCondition, setFileCondition] = useState<string[]>([]);
  
  const handleAddFilter = (key: string, value: string | string[]) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[key];
    setActiveFilters(newFilters);
    
    // Reset the corresponding filter state
    switch (key) {
      case 'contractNumber':
        setContractNumber('');
        break;
      case 'subscriberId':
        setSubscriberId('');
        break;
      case 'fileStatus':
        setFileStatus([]);
        break;
      case 'fileCondition':
        setFileCondition([]);
        break;
    }
  };
  
  const clearAllFilters = () => {
    setActiveFilters({});
    setContractNumber('');
    setSubscriberId('');
    setFileStatus([]);
    setFileCondition([]);
  };
  
  const handleFileStatusChange = (value: string) => {
    setFileStatus(prev => {
      const newValues = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      handleAddFilter('fileStatus', newValues);
      return newValues;
    });
  };
  
  const handleFileConditionChange = (value: string) => {
    setFileCondition(prev => {
      const newValues = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      handleAddFilter('fileCondition', newValues);
      return newValues;
    });
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start">
      <div className="w-full sm:w-72 space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm tài liệu..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Danh mục</CardTitle>
          </CardHeader>
          <CardContent className="py-0 px-2">
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Lọc tìm kiếm</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                {showAdvancedFilters ? 'Thu gọn' : 'Mở rộng'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-2 block">Số hợp đồng</Label>
                <Input 
                  placeholder="Nhập số hợp đồng" 
                  value={contractNumber}
                  onChange={(e) => {
                    setContractNumber(e.target.value);
                    if (e.target.value) {
                      handleAddFilter('contractNumber', e.target.value);
                    } else {
                      handleRemoveFilter('contractNumber');
                    }
                  }}
                />
              </div>
              
              <div>
                <Label className="text-xs mb-2 block">ID thuê bao</Label>
                <Input 
                  placeholder="Nhập ID thuê bao" 
                  value={subscriberId}
                  onChange={(e) => {
                    setSubscriberId(e.target.value);
                    if (e.target.value) {
                      handleAddFilter('subscriberId', e.target.value);
                    } else {
                      handleRemoveFilter('subscriberId');
                    }
                  }}
                />
              </div>
              
              {showAdvancedFilters && (
                <>
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="file-status">
                      <AccordionTrigger className="py-2 text-sm">Trạng thái hồ sơ</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-not-returned" 
                              checked={fileStatus.includes('not-returned')}
                              onCheckedChange={() => handleFileStatusChange('not-returned')}
                            />
                            <Label htmlFor="status-not-returned">Chưa hoàn trả</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-returned" 
                              checked={fileStatus.includes('returned')}
                              onCheckedChange={() => handleFileStatusChange('returned')}
                            />
                            <Label htmlFor="status-returned">Đã hoàn trả</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-canceled" 
                              checked={fileStatus.includes('canceled')}
                              onCheckedChange={() => handleFileStatusChange('canceled')}
                            />
                            <Label htmlFor="status-canceled">Hủy bỏ</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-debt" 
                              checked={fileStatus.includes('debt')}
                              onCheckedChange={() => handleFileStatusChange('debt')}
                            />
                            <Label htmlFor="status-debt">Khoanh nợ hồ sơ</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-received" 
                              checked={fileStatus.includes('received')}
                              onCheckedChange={() => handleFileStatusChange('received')}
                            />
                            <Label htmlFor="status-received">Tiếp nhận</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="status-borrowed" 
                              checked={fileStatus.includes('borrowed')}
                              onCheckedChange={() => handleFileStatusChange('borrowed')}
                            />
                            <Label htmlFor="status-borrowed">Cho mượn</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="file-condition">
                      <AccordionTrigger className="py-2 text-sm">Tình trạng hồ sơ</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="condition-correct" 
                              checked={fileCondition.includes('correct')}
                              onCheckedChange={() => handleFileConditionChange('correct')}
                            />
                            <Label htmlFor="condition-correct">Đúng biểu mẫu</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="condition-incorrect" 
                              checked={fileCondition.includes('incorrect')}
                              onCheckedChange={() => handleFileConditionChange('incorrect')}
                            />
                            <Label htmlFor="condition-incorrect">Sai biểu mẫu</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1">
        <Card>
          <CardHeader className="py-4 px-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-auto"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {showAdvancedFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                </Button>
              </div>
              
              {Object.keys(activeFilters).length > 0 && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium">Bộ lọc đang chọn:</span>
                  <div className="flex flex-wrap gap-2">
                    {contractNumber && (
                      <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
                        Số hợp đồng: {contractNumber}
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => handleRemoveFilter('contractNumber')}>
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    
                    {subscriberId && (
                      <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
                        ID thuê bao: {subscriberId}
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => handleRemoveFilter('subscriberId')}>
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    
                    {fileStatus.length > 0 && (
                      <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
                        Trạng thái: {fileStatus.length} đã chọn
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => handleRemoveFilter('fileStatus')}>
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    
                    {fileCondition.length > 0 && (
                      <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
                        Tình trạng: {fileCondition.length} đã chọn
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 -mr-1" onClick={() => handleRemoveFilter('fileCondition')}>
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearAllFilters} 
                      className="text-xs h-7"
                    >
                      Xóa tất cả
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="border rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Folder className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-3 text-sm font-medium">{category.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {category.count} tài liệu
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
