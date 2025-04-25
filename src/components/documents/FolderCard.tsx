
import React from 'react';
import { Folder } from '@/types/document';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder as FolderIcon, RotateCcw, Trash2 } from 'lucide-react';

interface FolderCardProps {
  folder: Folder;
  onClick: () => void;
  isTrash?: boolean;
  onRestore?: () => void;
  onDelete?: () => void;
}

export function FolderCard({ folder, onClick, isTrash, onRestore, onDelete }: FolderCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) return;
    onClick();
  };
  
  return (
    <Card 
      className={`hover:border-primary/50 cursor-pointer transition-all group ${isTrash ? 'bg-muted/30' : ''}`}
      onClick={handleClick}
    >
      <CardContent className="p-4 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center mr-3">
              <FolderIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-base line-clamp-2">{folder.name}</h3>
              <p className="text-xs text-muted-foreground">{folder.itemCount} mục</p>
            </div>
          </div>
        </div>
        
        {isTrash && onRestore && onDelete && (
          <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onRestore}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="sr-only">Khôi phục</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDelete}
              className="h-8 w-8 p-0 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Xóa vĩnh viễn</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
