
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Grid2X2, List } from 'lucide-react';
import { FormUploadDialog } from './FormUploadDialog';

interface FormManagementHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const FormManagementHeader: React.FC<FormManagementHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode
}) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý biểu mẫu</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border p-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Grid view"
              className={viewMode === 'grid' ? 'bg-muted' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Grid2X2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="List view"
              className={viewMode === 'list' ? 'bg-muted' : ''}
              onClick={() => setViewMode('list')}
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
          <Button onClick={() => setIsUploadDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tải biểu mẫu mới
          </Button>
        </div>
      </div>
      
      <FormUploadDialog 
        open={isUploadDialogOpen} 
        onOpenChange={setIsUploadDialogOpen} 
      />
    </div>
  );
};
