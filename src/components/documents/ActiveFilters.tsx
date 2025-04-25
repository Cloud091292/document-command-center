
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DocumentFilter } from './DocumentFilterPanel';

interface ActiveFiltersProps {
  filters: DocumentFilter;
  onRemoveFilter: (type: keyof DocumentFilter, value?: string) => void;
  onResetFilters: () => void;
}

export function ActiveFilters({ filters, onRemoveFilter, onResetFilters }: ActiveFiltersProps) {
  const hasActiveFilters = 
    filters.selectedCategories.length > 0 ||
    filters.selectedDepartments.length > 0 ||
    filters.selectedStatuses.length > 0 ||
    filters.selectedFileTypes.length > 0 ||
    (filters.contractNumber && filters.contractNumber.length > 0) ||
    (filters.subscriberId && filters.subscriberId.length > 0) ||
    (filters.customerId && filters.customerId.length > 0) ||
    (filters.selectedDocumentCondition && filters.selectedDocumentCondition.length > 0);

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 items-center my-3">
      <span className="text-sm font-medium">Bộ lọc đang chọn:</span>
      <div className="flex flex-wrap gap-2">
        {filters.selectedCategories.map((category) => (
          <Badge key={category} variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
            Danh mục: {category}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-1 -mr-1" 
              onClick={() => onRemoveFilter('selectedCategories', category)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        
        {filters.selectedDepartments.map((department) => (
          <Badge key={department} variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
            Phòng ban: {department}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-1 -mr-1" 
              onClick={() => onRemoveFilter('selectedDepartments', department)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        
        {filters.selectedStatuses.map((status) => (
          <Badge key={status} variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
            Trạng thái: {status}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-1 -mr-1" 
              onClick={() => onRemoveFilter('selectedStatuses', status)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        
        {filters.selectedFileTypes.map((fileType) => (
          <Badge key={fileType} variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
            Định dạng: {fileType.toUpperCase()}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-1 -mr-1" 
              onClick={() => onRemoveFilter('selectedFileTypes', fileType)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        
        {filters.contractNumber && (
          <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
            Số hợp đồng: {filters.contractNumber}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-1 -mr-1" 
              onClick={() => onRemoveFilter('contractNumber')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {filters.subscriberId && (
          <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
            ID thuê bao: {filters.subscriberId}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-1 -mr-1" 
              onClick={() => onRemoveFilter('subscriberId')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {filters.customerId && (
          <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
            Mã KH: {filters.customerId}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-1 -mr-1" 
              onClick={() => onRemoveFilter('customerId')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {filters.selectedDocumentCondition && (
          <Badge variant="outline" className="flex items-center gap-1 pl-2 bg-primary/5">
            Tình trạng: {filters.selectedDocumentCondition}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-1 -mr-1" 
              onClick={() => onRemoveFilter('selectedDocumentCondition')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onResetFilters} 
          className="text-xs h-7"
        >
          Xóa tất cả
        </Button>
      </div>
    </div>
  );
}
