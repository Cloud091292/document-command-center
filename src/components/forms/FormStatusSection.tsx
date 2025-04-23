
import React from 'react';
import { FormCard } from './FormCard';
import { FormListItem } from './FormListItem';
import { mockForms } from './mockData';

interface FormStatusSectionProps {
  categories: Array<{
    name: string;
    count: number;
    icon: React.ComponentType<any>;
  }>;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  selectedStatus: string;
}

export const FormStatusSection: React.FC<FormStatusSectionProps> = ({
  categories,
  searchQuery,
  viewMode,
  selectedStatus
}) => {
  const filteredForms = mockForms.filter(form => {
    const matchesSearch = searchQuery === '' || 
      form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || form.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const statusForms = filteredForms.filter(form => form.status === category.name);
        
        if (selectedStatus !== 'all' && category.name !== selectedStatus) {
          return null;
        }
        
        if (statusForms.length === 0) {
          return null;
        }
        
        return (
          <div key={category.name} className="space-y-4">
            <div className="flex items-center gap-2">
              <category.icon className="h-5 w-5" />
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <span className="text-sm text-muted-foreground">
                ({statusForms.length})
              </span>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {statusForms.map((form) => (
                  <FormCard key={form.id} form={form} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {statusForms.map((form) => (
                  <FormListItem key={form.id} form={form} />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {filteredForms.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Không tìm thấy biểu mẫu nào phù hợp</p>
        </div>
      )}
    </div>
  );
};
