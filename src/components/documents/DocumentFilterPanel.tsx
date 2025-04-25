
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CategoryFilters } from './filters/CategoryFilters';
import { DepartmentFilters } from './filters/DepartmentFilters';
import { FileTypeFilters } from './filters/FileTypeFilters';
import { StatusFilters } from './filters/StatusFilters';
import { CustomerFilters } from './filters/CustomerFilters';
import { DocumentType } from '@/types/document';
import { DocumentFilter, FilterOptions } from './types';

interface DocumentFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeType: DocumentType;
  filters: DocumentFilter;
  onFilterChange: (filters: DocumentFilter) => void;
  filterOptions: FilterOptions;
}

export function DocumentFilterPanel({
  isOpen,
  onClose,
  activeType,
  filters,
  onFilterChange,
  filterOptions
}: DocumentFilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<DocumentFilter>(filters);

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const emptyFilters: DocumentFilter = {
      selectedCategories: [],
      selectedDepartments: [],
      selectedStatuses: [],
      selectedFileTypes: [],
      contractNumber: '',
      subscriberId: '',
      customerId: '',
      selectedDocumentCondition: ''
    };
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const toggleCategory = (category: string) => {
    setLocalFilters(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter(c => c !== category)
        : [...prev.selectedCategories, category]
    }));
  };

  const toggleDepartment = (department: string) => {
    setLocalFilters(prev => ({
      ...prev,
      selectedDepartments: prev.selectedDepartments.includes(department)
        ? prev.selectedDepartments.filter(d => d !== department)
        : [...prev.selectedDepartments, department]
    }));
  };

  const toggleStatus = (status: string) => {
    setLocalFilters(prev => ({
      ...prev,
      selectedStatuses: prev.selectedStatuses.includes(status)
        ? prev.selectedStatuses.filter(s => s !== status)
        : [...prev.selectedStatuses, status]
    }));
  };

  const toggleFileType = (fileType: string) => {
    setLocalFilters(prev => ({
      ...prev,
      selectedFileTypes: prev.selectedFileTypes.includes(fileType)
        ? prev.selectedFileTypes.filter(f => f !== fileType)
        : [...prev.selectedFileTypes, fileType]
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Bộ lọc tài liệu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          <Accordion type="multiple" defaultValue={['categories', 'departments', 'fileTypes', 'statuses']}>
            <AccordionItem value="categories">
              <AccordionTrigger>Danh mục tài liệu</AccordionTrigger>
              <CategoryFilters
                categories={filterOptions.categories}
                selectedCategories={localFilters.selectedCategories}
                onToggleCategory={toggleCategory}
              />
            </AccordionItem>

            <AccordionItem value="departments">
              <AccordionTrigger>Phòng ban</AccordionTrigger>
              <DepartmentFilters
                departments={filterOptions.departments}
                selectedDepartments={localFilters.selectedDepartments}
                onToggleDepartment={toggleDepartment}
              />
            </AccordionItem>

            <AccordionItem value="fileTypes">
              <AccordionTrigger>Định dạng file</AccordionTrigger>
              <FileTypeFilters
                fileTypes={filterOptions.fileTypes}
                selectedFileTypes={localFilters.selectedFileTypes}
                onToggleFileType={toggleFileType}
              />
            </AccordionItem>

            <AccordionItem value="statuses">
              <AccordionTrigger>Trạng thái hiệu lực</AccordionTrigger>
              <StatusFilters
                statuses={filterOptions.statuses}
                selectedStatuses={localFilters.selectedStatuses}
                onToggleStatus={toggleStatus}
              />
            </AccordionItem>

            {activeType === 'customer' && (
              <>
                <AccordionItem value="contractInfo">
                  <AccordionTrigger>Thông tin hợp đồng</AccordionTrigger>
                  <CustomerFilters
                    contractNumber={localFilters.contractNumber}
                    subscriberId={localFilters.subscriberId}
                    customerId={localFilters.customerId}
                    documentConditions={filterOptions.documentConditions}
                    selectedDocumentCondition={localFilters.selectedDocumentCondition}
                    onInputChange={(field, value) => setLocalFilters(prev => ({ ...prev, [field]: value }))}
                    onDocumentConditionChange={(condition) => setLocalFilters(prev => ({ ...prev, selectedDocumentCondition: condition }))}
                  />
                </AccordionItem>
              </>
            )}
          </Accordion>
        </div>

        <SheetFooter className="pt-2 sm:justify-between">
          <Button variant="outline" onClick={handleResetFilters}>
            Xóa bộ lọc
          </Button>
          <Button onClick={handleApplyFilters}>Áp dụng</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
