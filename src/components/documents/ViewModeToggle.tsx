
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid2X2, List } from 'lucide-react';
import { ViewMode } from '@/types/document';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {
  return (
    <div className="border rounded-md flex">
      <Button
        variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('grid')}
      >
        <Grid2X2 className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('list')}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
