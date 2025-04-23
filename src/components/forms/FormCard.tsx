
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { 
  MoreHorizontal, 
  Star, 
  StarOff, 
  Calendar, 
  Download, 
  FileEdit,
  History
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

interface FormCardProps {
  form: Form;
}

export const FormCard: React.FC<FormCardProps> = ({ form }) => {
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
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setIsDetailOpen(true)}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <Badge className={`${getStatusColor(form.status)} border-0`}>
              {form.status}
            </Badge>
            <Button variant="ghost" size="icon" onClick={handleToggleFavorite}>
              {isFavorite ? (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <h3 className="font-medium text-lg line-clamp-2 mb-1">{form.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{form.description}</p>
          
          <div className="flex items-center text-xs text-muted-foreground gap-1 mb-2">
            <Calendar className="h-3 w-3" />
            <span>Hiệu lực: {form.effectiveFrom} - {form.effectiveTo}</span>
          </div>
          
          <div className="text-xs bg-muted inline-block px-2 py-1 rounded-md">
            {form.category}
          </div>
        </CardContent>
        
        <CardFooter className="bg-muted/50 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <div className="bg-primary h-full w-full flex items-center justify-center text-xs text-white">
                {form.author.charAt(0)}
              </div>
            </Avatar>
            <span className="text-xs">{form.author}</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileEdit className="mr-2 h-4 w-4" />
                <span>Soạn từ mẫu</span>
              </DropdownMenuItem>
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
        </CardFooter>
      </Card>

      <FormDetailDialog 
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        form={form}
      />
    </>
  );
};
