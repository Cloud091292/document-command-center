
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DocumentSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
}

export function DocumentSearch({ searchQuery, onSearchChange, onToggleFilters }: DocumentSearchProps) {
  return (
    <div className="flex items-center space-x-3 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Tìm kiếm theo tiêu đề, mô tả, nội dung, tags..."
          className="pl-10 w-full"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onToggleFilters}
        className="whitespace-nowrap"
      >
        Bộ lọc nâng cao
      </Button>
    </div>
  );
}
