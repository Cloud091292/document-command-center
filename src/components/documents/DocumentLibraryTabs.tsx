
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { OperationalDocumentSection } from './OperationalDocumentSection';
import { CustomerDocumentSection } from './CustomerDocumentSection';

interface DocumentLibraryTabsProps {
  categories: {
    operational: Array<{
      name: string;
      count: number;
      icon: React.ComponentType<any>;
    }>;
    customer: Array<{
      name: string;
      count: number;
      icon: React.ComponentType<any>;
    }>;
  };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const DocumentLibraryTabs: React.FC<DocumentLibraryTabsProps> = ({
  categories,
  searchQuery,
  setSearchQuery,
}) => {
  const [activeTab, setActiveTab] = React.useState<'operational' | 'customer'>('operational');

  return (
    <div className="w-full">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'operational' | 'customer')}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="operational" className="text-base py-3">
            Tài liệu vận hành
          </TabsTrigger>
          <TabsTrigger value="customer" className="text-base py-3">
            Tài liệu khách hàng
          </TabsTrigger>
        </TabsList>
        <TabsContent value="operational">
          <OperationalDocumentSection 
            categories={categories.operational} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
          />
        </TabsContent>
        <TabsContent value="customer">
          <CustomerDocumentSection 
            categories={categories.customer}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
