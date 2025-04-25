
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import { DocumentSearch } from './DocumentSearch';

interface DocumentHeaderProps {
  title: string;
  description: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleFilters: () => void;
  onCreateDocument?: () => void;
}

export function DocumentHeader({ 
  title, 
  description, 
  searchQuery, 
  onSearchChange, 
  onToggleFilters,
  onCreateDocument 
}: DocumentHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {onCreateDocument && (
          <Button onClick={onCreateDocument} className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            Tạo tài liệu
          </Button>
        )}
      </div>
      
      <DocumentSearch 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onToggleFilters={onToggleFilters}
      />
    </div>
  );
}
