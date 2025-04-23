
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  StarOff, 
  Download, 
  FileEdit, 
  History, 
  Eye, 
  MoreHorizontal 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form } from './types';
import { Badge } from '@/components/ui/badge';
import { FormDetailDialog } from './FormDetailDialog';

interface FormListItemProps {
  form: Form;
}

export const FormListItem: React.FC<FormListItemProps> = ({ form }) => {
  const [isFavorite, setIsFavorite] = useState(form.isFavorite);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đang sử dụng':
        return 'bg-green-100 text-green-800';
      case 'Sắp hết hạn':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hết hiệu lực':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3 flex-1" onClick={() => setIsDetailOpen(true)}>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleToggleFavorite}>
            {isFavorite ? (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{form.name}</h3>
              <Badge className={`${getStatusColor(form.status)} border-0 text-xs`}>
                {form.status}
              </Badge>
            </div>
            <div className="flex items-center text-xs text-muted-foreground gap-4 mt-1">
              <span>Phiên bản: {form.version}</span>
              <span>Cập nhật: {form.updatedAt}</span>
              <span>Hiệu lực: {form.effectiveFrom} - {form.effectiveTo}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => setIsDetailOpen(true)}>
            <Eye className="h-4 w-4 mr-1" />
            Xem chi tiết
          </Button>
          
          <Button variant="ghost" size="sm" className="text-xs">
            <FileEdit className="h-4 w-4 mr-1" />
            Soạn từ mẫu
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Tải xuống</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <History className="mr-2 h-4 w-4" />
                <span>Lịch sử phiên bản</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <FormDetailDialog 
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        form={form}
      />
    </>
  );
};
