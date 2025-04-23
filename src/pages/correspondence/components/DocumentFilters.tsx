
import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import type { DocumentFilter } from '../types/documents';

interface DocumentFiltersProps {
  filters: DocumentFilter;
  onFilterChange: (key: keyof DocumentFilter, value: string) => void;
  onResetFilters: () => void;
  documentClassifications: string[];
  documentStatuses: string[];
  destinationUnits: string[];
  releaseStatuses: string[];
  priorityLevels: string[];
}

export function DocumentFilters({
  filters,
  onFilterChange,
  onResetFilters,
  documentClassifications,
  documentStatuses,
  destinationUnits,
  releaseStatuses,
  priorityLevels
}: DocumentFiltersProps) {
  return (
    <div className="border rounded-md p-4 bg-muted/40 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div>
        <FormLabel>Loại văn bản</FormLabel>
        <select 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={filters.classification}
          onChange={(e) => onFilterChange('classification', e.target.value)}
        >
          <option value="">Tất cả loại văn bản</option>
          {documentClassifications.map(classification => (
            <option key={classification} value={classification}>{classification}</option>
          ))}
        </select>
      </div>
      <div>
        <FormLabel>Trạng thái</FormLabel>
        <select 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          {documentStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div>
        <FormLabel>Đơn vị nhận</FormLabel>
        <select 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={filters.destinationUnit}
          onChange={(e) => onFilterChange('destinationUnit', e.target.value)}
        >
          <option value="">Tất cả đơn vị</option>
          {destinationUnits.map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
      <div>
        <FormLabel>Trạng thái phát hành</FormLabel>
        <select 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={filters.releaseStatus}
          onChange={(e) => onFilterChange('releaseStatus', e.target.value)}
        >
          <option value="">Tất cả</option>
          {releaseStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div>
        <FormLabel>Độ khẩn</FormLabel>
        <select 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={filters.priority}
          onChange={(e) => onFilterChange('priority', e.target.value)}
        >
          <option value="">Tất cả</option>
          {priorityLevels.map(priority => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>
      </div>
      <div>
        <FormLabel>Từ ngày</FormLabel>
        <Input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => onFilterChange('dateFrom', e.target.value)}
        />
      </div>
      <div>
        <FormLabel>Đến ngày</FormLabel>
        <Input
          type="date"
          value={filters.dateTo}
          onChange={(e) => onFilterChange('dateTo', e.target.value)}
        />
      </div>
      <div className="flex items-end">
        <Button variant="outline" size="sm" onClick={onResetFilters} className="mb-0.5">
          <X className="h-4 w-4 mr-2" /> Xoá bộ lọc
        </Button>
      </div>
    </div>
  );
}
