
import React, { useState } from 'react';
import { FormManagementHeader } from '@/components/forms/FormManagementHeader';
import { FormManagementTabs } from '@/components/forms/FormManagementTabs';
import { FileText, FileEdit, FileCheck, FileClock, FileWarning } from 'lucide-react';

const formCategories = [
  { name: 'Pháp lý và Giấy phép', count: 42, icon: FileText },
  { name: 'Quản trị Doanh nghiệp', count: 38, icon: FileText },
  { name: 'Tài chính - Kế toán', count: 56, icon: FileText },
  { name: 'Nhân sự và Lao động', count: 63, icon: FileText },
  { name: 'Khách hàng, đối tác và Hợp đồng', count: 87, icon: FileText },
  { name: 'Marketing và Truyền thông', count: 29, icon: FileText },
  { name: 'Quy trình vận hành', count: 52, icon: FileText },
];

const statusCategories = [
  { name: 'Đang sử dụng', count: 215, icon: FileCheck },
  { name: 'Sắp hết hạn', count: 47, icon: FileWarning },
  { name: 'Hết hiệu lực', count: 105, icon: FileClock },
];

const FormManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <FormManagementHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <FormManagementTabs 
        categories={{
          forms: formCategories,
          status: statusCategories
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
      />
    </div>
  );
};

export default FormManagement;
