
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import { Template } from '@/pages/templates/types';

interface TemplateCardProps {
  template: Template;
  onPreview: (templateId: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onPreview }) => {
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

  return (
    <Card className="overflow-hidden">
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
          onClick={() => onPreview(template.id)}
        >
          Xem trước
        </Button>
      </CardFooter>
    </Card>
  );
};
