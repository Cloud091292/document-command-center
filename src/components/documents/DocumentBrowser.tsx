
import React from 'react';
import { useDocumentManager } from '@/hooks/useDocumentManager';
import { DocumentHeader } from './DocumentHeader';
import { DocumentFilterPanel } from './DocumentFilterPanel';
import { ActiveFilters } from './ActiveFilters';
import { DocumentBreadcrumb } from './DocumentBreadcrumb';
import { DocumentContent } from './DocumentContent';
import { ViewModeToggle } from './ViewModeToggle';
import { DocumentSortDropdown } from './DocumentSortDropdown';
import { useDocumentFilters } from '@/hooks/useDocumentFilters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentType } from '@/types/document';

interface DocumentBrowserProps {
  initialView: 'library' | 'bookmarks' | 'trash';
}

export function DocumentBrowser({ initialView }: DocumentBrowserProps) {
  const {
    activeType,
    viewMode,
    sortOption,
    currentPath,
    displayItems,
    setActiveType,
    setViewMode,
    setSortOption,
    navigateToFolder,
    navigateToPath,
    toggleBookmark,
    restoreFromTrash,
    permanentlyDelete
  } = useDocumentManager('operational', 'grid', 'name-asc', initialView);

  const {
    searchQuery,
    setSearchQuery,
    isFilterPanelOpen,
    toggleFilterPanel,
    activeFilters,
    handleFilterChange,
    removeFilter,
    resetFilters,
  } = useDocumentFilters({
    initialType: activeType,
    initialView
  });

  return (
    <div className="space-y-6">
      <DocumentHeader 
        title={
          initialView === 'library' ? 'Thư viện tài liệu' : 
          initialView === 'bookmarks' ? 'Tài liệu đánh dấu' : 
          'Thùng rác'
        }
        description={
          initialView === 'library' ? 'Quản lý và truy cập tài liệu của doanh nghiệp' : 
          initialView === 'bookmarks' ? 'Các tài liệu bạn đã đánh dấu để truy cập nhanh' : 
          'Tài liệu đã xóa sẽ được lưu ở đây trong 30 ngày'
        }
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleFilters={toggleFilterPanel}
      />
      
      <Tabs 
        defaultValue={activeType} 
        onValueChange={(value) => setActiveType(value as DocumentType)}
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
        
        <TabsContent value="operational" className="space-y-4">
          <div className="flex flex-col space-y-4">
            {initialView !== 'bookmarks' && (
              <DocumentBreadcrumb path={currentPath} onNavigate={navigateToPath} />
            )}
            
            <ActiveFilters 
              filters={activeFilters}
              onRemoveFilter={removeFilter}
              onResetFilters={resetFilters}
            />
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {displayItems.folders.length} thư mục, {displayItems.files.length} tài liệu
              </div>
              
              <div className="flex items-center space-x-2">
                <DocumentSortDropdown onSortChange={setSortOption} />
                <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
              </div>
            </div>
          </div>
          
          <DocumentContent
            viewMode={viewMode}
            folders={displayItems.folders}
            files={displayItems.files}
            initialView={initialView}
            onFolderClick={navigateToFolder}
            onToggleBookmark={toggleBookmark}
            onRestore={initialView === 'trash' ? restoreFromTrash : undefined}
            onDelete={initialView === 'trash' ? permanentlyDelete : undefined}
          />
        </TabsContent>
        
        <TabsContent value="customer" className="space-y-4">
          <div className="flex flex-col space-y-4">
            {initialView !== 'bookmarks' && (
              <DocumentBreadcrumb path={currentPath} onNavigate={navigateToPath} />
            )}
            
            <ActiveFilters 
              filters={activeFilters}
              onRemoveFilter={removeFilter}
              onResetFilters={resetFilters}
            />
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {displayItems.folders.length} thư mục, {displayItems.files.length} tài liệu
              </div>
              
              <div className="flex items-center space-x-2">
                <DocumentSortDropdown onSortChange={setSortOption} />
                <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
              </div>
            </div>
          </div>
          
          <DocumentContent
            viewMode={viewMode}
            folders={displayItems.folders}
            files={displayItems.files}
            initialView={initialView}
            onFolderClick={navigateToFolder}
            onToggleBookmark={toggleBookmark}
            onRestore={initialView === 'trash' ? restoreFromTrash : undefined}
            onDelete={initialView === 'trash' ? permanentlyDelete : undefined}
          />
        </TabsContent>
      </Tabs>

      <DocumentFilterPanel
        isOpen={isFilterPanelOpen}
        onClose={toggleFilterPanel}
        activeType={activeType}
        filters={activeFilters}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />
    </div>
  );
}

const filterOptions = {
  categories: ["Pháp lý", "Tài chính", "Nhân sự", "Vận hành", "Kỹ thuật", "Marketing"],
  departments: ["Ban giám đốc", "Phòng tài chính", "Phòng nhân sự", "Phòng vận hành", "Phòng kỹ thuật"],
  statuses: ["Hiệu lực", "Hết hiệu lực", "Đang xét duyệt", "Bản nháp"],
  fileTypes: ["pdf", "docx", "xlsx", "jpg", "png", "txt"],
  documentConditions: ["Đầy đủ", "Thiếu", "Cần bổ sung", "Hết hạn"]
};
