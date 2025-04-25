
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SortOption } from '@/types/document';

interface DocumentSortDropdownProps {
  onSortChange: (option: SortOption) => void;
}

export function DocumentSortDropdown({ onSortChange }: DocumentSortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <ArrowUpDown className="h-4 w-4" />
          <span className="hidden sm:inline">Sắp xếp</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSortChange('name-asc')}>
          Tên A-Z
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange('name-desc')}>
          Tên Z-A
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange('date-desc')}>
          Mới nhất trước
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange('date-asc')}>
          Cũ nhất trước
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
