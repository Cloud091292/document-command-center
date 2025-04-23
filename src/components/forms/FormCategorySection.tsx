
import React from 'react';
import { FormCard } from './FormCard';
import { FormListItem } from './FormListItem';
import { mockForms } from './mockData';

interface FormCategorySectionProps {
  categories: Array<{
    name: string;
    count: number;
    icon: React.ComponentType<any>;
  }>;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  selectedCategory: string;
}

export const FormCategorySection: React.FC<FormCategorySectionProps> = ({
  categories,
  searchQuery,
  viewMode,
  selectedCategory
}) => {
  const filteredForms = mockForms.filter(form => {
    const matchesSearch = searchQuery === '' || 
      form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const categoryForms = filteredForms.filter(form => form.category === category.name);
        
        if (selectedCategory !== 'all' && category.name !== selectedCategory) {
          return null;
        }
        
        if (categoryForms.length === 0) {
          return null;
        }
        
        return (
          <div key={category.name} className="space-y-4">
            <div className="flex items-center gap-2">
              <category.icon className="h-5 w-5" />
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <span className="text-sm text-muted-foreground">
                ({categoryForms.length})
              </span>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryForms.map((form) => (
                  <FormCard key={form.id} form={form} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {categoryForms.map((form) => (
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
