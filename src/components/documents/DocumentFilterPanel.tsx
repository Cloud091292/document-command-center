
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DocumentType } from '@/types/document';

export interface FilterOptions {
  categories: string[];
  departments: string[];
  statuses: string[];
  fileTypes: string[];
  contractNumber?: string;
  subscriberId?: string;
  customerId?: string;
  documentConditions?: string[];
}

export interface DocumentFilter {
  selectedCategories: string[];
  selectedDepartments: string[];
  selectedStatuses: string[];
  selectedFileTypes: string[];
  contractNumber?: string;
  subscriberId?: string;
  customerId?: string;
  selectedDocumentCondition?: string;
}

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
    setLocalFilters(prev => {
      const selectedCategories = prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter(c => c !== category)
        : [...prev.selectedCategories, category];
      return { ...prev, selectedCategories };
    });
  };

  const toggleDepartment = (department: string) => {
    setLocalFilters(prev => {
      const selectedDepartments = prev.selectedDepartments.includes(department)
        ? prev.selectedDepartments.filter(d => d !== department)
        : [...prev.selectedDepartments, department];
      return { ...prev, selectedDepartments };
    });
  };

  const toggleStatus = (status: string) => {
    setLocalFilters(prev => {
      const selectedStatuses = prev.selectedStatuses.includes(status)
        ? prev.selectedStatuses.filter(s => s !== status)
        : [...prev.selectedStatuses, status];
      return { ...prev, selectedStatuses };
    });
  };

  const toggleFileType = (fileType: string) => {
    setLocalFilters(prev => {
      const selectedFileTypes = prev.selectedFileTypes.includes(fileType)
        ? prev.selectedFileTypes.filter(f => f !== fileType)
        : [...prev.selectedFileTypes, fileType];
      return { ...prev, selectedFileTypes };
    });
  };

  const handleDocumentConditionChange = (condition: string) => {
    setLocalFilters(prev => ({ ...prev, selectedDocumentCondition: condition }));
  };

  const handleInputChange = (field: 'contractNumber' | 'subscriberId' | 'customerId', value: string) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
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
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {filterOptions.categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={localFilters.selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="departments">
              <AccordionTrigger>Phòng ban</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {filterOptions.departments.map((department) => (
                    <div key={department} className="flex items-center space-x-2">
                      <Checkbox
                        id={`department-${department}`}
                        checked={localFilters.selectedDepartments.includes(department)}
                        onCheckedChange={() => toggleDepartment(department)}
                      />
                      <Label htmlFor={`department-${department}`} className="text-sm">
                        {department}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fileTypes">
              <AccordionTrigger>Định dạng file</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {filterOptions.fileTypes.map((fileType) => (
                    <div key={fileType} className="flex items-center space-x-2">
                      <Checkbox
                        id={`fileType-${fileType}`}
                        checked={localFilters.selectedFileTypes.includes(fileType)}
                        onCheckedChange={() => toggleFileType(fileType)}
                      />
                      <Label htmlFor={`fileType-${fileType}`} className="text-sm">
                        {fileType.toUpperCase()}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="statuses">
              <AccordionTrigger>Trạng thái hiệu lực</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {filterOptions.statuses.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={localFilters.selectedStatuses.includes(status)}
                        onCheckedChange={() => toggleStatus(status)}
                      />
                      <Label htmlFor={`status-${status}`} className="text-sm">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {activeType === 'customer' && (
              <>
                <AccordionItem value="contractInfo">
                  <AccordionTrigger>Thông tin hợp đồng</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="contractNumber">Số hợp đồng</Label>
                        <Input
                          id="contractNumber"
                          placeholder="Nhập số hợp đồng"
                          value={localFilters.contractNumber || ''}
                          onChange={(e) => handleInputChange('contractNumber', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subscriberId">ID thuê bao</Label>
                        <Input
                          id="subscriberId"
                          placeholder="Nhập ID thuê bao"
                          value={localFilters.subscriberId || ''}
                          onChange={(e) => handleInputChange('subscriberId', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customerId">Mã khách hàng</Label>
                        <Input
                          id="customerId"
                          placeholder="Nhập mã khách hàng"
                          value={localFilters.customerId || ''}
                          onChange={(e) => handleInputChange('customerId', e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {filterOptions.documentConditions && filterOptions.documentConditions.length > 0 && (
                  <AccordionItem value="documentCondition">
                    <AccordionTrigger>Tình trạng hồ sơ</AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup
                        value={localFilters.selectedDocumentCondition}
                        onValueChange={handleDocumentConditionChange}
                      >
                        {filterOptions.documentConditions.map((condition) => (
                          <div key={condition} className="flex items-center space-x-2">
                            <RadioGroupItem value={condition} id={`condition-${condition}`} />
                            <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                )}
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
