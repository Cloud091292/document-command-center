
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TemplateDialog } from '@/components/templates/TemplateDialog';
import { useToast } from '@/hooks/use-toast';
import { TemplateFilters } from '@/components/templates/TemplateFilters';
import { TemplateList } from '@/components/templates/TemplateList';
import { useTemplates } from '@/hooks/useTemplates';

const Templates = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  const { templates, categories, filters } = useTemplates();

  const handleCreateTemplate = () => {
    setIsCreateDialogOpen(true);
  };

  const handlePreview = (templateId: string) => {
    // Preview template implementation
    toast({
      title: "Xem trước mẫu",
      description: `Đang xem trước mẫu ID: ${templateId}`,
    });
  };

  const handleTemplateCreated = () => {
    toast({
      title: "Thành công",
      description: "Đã tạo mẫu thành công",
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mẫu tài liệu</h1>
        <Button onClick={handleCreateTemplate}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo mẫu
        </Button>
      </div>
      
      <TemplateFilters
        searchQuery={filters.searchQuery}
        onSearchChange={filters.setSearchQuery}
        categoryFilter={filters.categoryFilter}
        onCategoryFilterChange={filters.setCategoryFilter}
        sortBy={filters.sortBy}
        onSortChange={filters.setSortBy}
        categories={categories}
      />

      <TemplateList 
        templates={templates}
        onPreview={handlePreview}
        onCreateTemplate={handleCreateTemplate}
      />

      <TemplateDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
        onTemplateCreated={handleTemplateCreated}
      />
    </div>
  );
};

export default Templates;
