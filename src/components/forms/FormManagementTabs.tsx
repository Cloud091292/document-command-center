
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FormCategorySection } from './FormCategorySection';
import { FormStatusSection } from './FormStatusSection';
import { FormFilters } from './FormFilters';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface FormManagementTabsProps {
  categories: {
    forms: Array<{
      name: string;
      count: number;
      icon: React.ComponentType<any>;
    }>;
    status: Array<{
      name: string;
      count: number;
      icon: React.ComponentType<any>;
    }>;
  };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
}

export const FormManagementTabs: React.FC<FormManagementTabsProps> = ({
  categories,
  searchQuery,
  setSearchQuery,
  viewMode
}) => {
  const [activeTab, setActiveTab] = useState<'category' | 'status'>('category');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  return (
    <div className="w-full space-y-4">
      <div className="relative flex-1 mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Tìm kiếm biểu mẫu..." 
          className="pl-10" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <FormFilters
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories.forms.map(c => c.name)}
        statuses={categories.status.map(s => s.name)}
      />
      
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'category' | 'status')}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="category" className="text-base py-3">
            Theo nhóm biểu mẫu
          </TabsTrigger>
          <TabsTrigger value="status" className="text-base py-3">
            Theo trạng thái
          </TabsTrigger>
        </TabsList>
        <TabsContent value="category">
          <FormCategorySection 
            categories={categories.forms}
            searchQuery={searchQuery}
            viewMode={viewMode}
            selectedCategory={categoryFilter}
          />
        </TabsContent>
        <TabsContent value="status">
          <FormStatusSection 
            categories={categories.status}
            searchQuery={searchQuery}
            viewMode={viewMode}
            selectedStatus={statusFilter}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
