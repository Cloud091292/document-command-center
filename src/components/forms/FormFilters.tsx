
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormFiltersProps {
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  sortBy: string;
  onSortChange: (sortOption: string) => void;
  categories: string[];
  statuses: string[];
}

export const FormFilters: React.FC<FormFiltersProps> = ({
  categoryFilter,
  onCategoryFilterChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  categories,
  statuses
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Tất cả nhóm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả nhóm</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Tất cả trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả trạng thái</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Cập nhật gần đây" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Cập nhật gần đây</SelectItem>
          <SelectItem value="name">Tên (A-Z)</SelectItem>
          <SelectItem value="popularity">Phổ biến nhất</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
