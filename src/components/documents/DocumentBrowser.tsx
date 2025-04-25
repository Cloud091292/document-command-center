
import React from 'react';
import { useDocumentManager } from '@/hooks/useDocumentManager';
import { FolderCard } from './FolderCard';
import { DocumentCard } from './DocumentCard';
import { DocumentList } from './DocumentList';
import { DocumentBreadcrumb } from './DocumentBreadcrumb';
import { DocumentHeader } from './DocumentHeader';
import { Grid2X2, List, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ViewMode, SortOption, DocumentType, Folder, DocumentFile } from '@/types/document';

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

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  const renderContent = () => {
    if (displayItems.folders.length === 0 && displayItems.files.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="rounded-full bg-muted p-6 mb-4">
            {initialView === 'trash' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            ) : initialView === 'bookmarks' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            )}
          </div>
          <h3 className="text-lg font-medium mb-2">Không có tài liệu</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            {initialView === 'trash' ? 'Thùng rác trống.' : 
             initialView === 'bookmarks' ? 'Bạn chưa đánh dấu tài liệu nào.' : 
             'Không có tài liệu nào trong thư mục này.'}
          </p>
        </div>
      );
    }

    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayItems.folders.map(folder => (
            <FolderCard 
              key={folder.id} 
              folder={folder} 
              onClick={() => navigateToFolder(folder)}
              isTrash={initialView === 'trash'}
              onRestore={initialView === 'trash' ? () => restoreFromTrash(folder.id) : undefined}
              onDelete={initialView === 'trash' ? () => permanentlyDelete(folder.id) : undefined}
            />
          ))}
          {displayItems.files.map(file => (
            <DocumentCard 
              key={file.id}
              file={file}
              onToggleBookmark={() => toggleBookmark(file.id)}
              isTrash={initialView === 'trash'}
              onRestore={initialView === 'trash' ? () => restoreFromTrash(file.id) : undefined}
              onDelete={initialView === 'trash' ? () => permanentlyDelete(file.id) : undefined}
            />
          ))}
        </div>
      );
    } else {
      return (
        <DocumentList
          folders={displayItems.folders}
          files={displayItems.files}
          onFolderClick={navigateToFolder}
          onToggleBookmark={toggleBookmark}
          isTrash={initialView === 'trash'}
          onRestore={initialView === 'trash' ? restoreFromTrash : undefined}
          onDelete={initialView === 'trash' ? permanentlyDelete : undefined}
        />
      );
    }
  };

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
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {displayItems.folders.length} thư mục, {displayItems.files.length} tài liệu
              </div>
              
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ArrowUpDown className="h-4 w-4" />
                      <span className="hidden sm:inline">Sắp xếp</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSortChange('name-asc')}>
                      Tên A-Z
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('name-desc')}>
                      Tên Z-A
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('date-desc')}>
                      Mới nhất trước
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('date-asc')}>
                      Cũ nhất trước
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="border rounded-md flex">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {renderContent()}
        </TabsContent>
        
        <TabsContent value="customer" className="space-y-4">
          <div className="flex flex-col space-y-4">
            {initialView !== 'bookmarks' && (
              <DocumentBreadcrumb path={currentPath} onNavigate={navigateToPath} />
            )}
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {displayItems.folders.length} thư mục, {displayItems.files.length} tài liệu
              </div>
              
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ArrowUpDown className="h-4 w-4" />
                      <span className="hidden sm:inline">Sắp xếp</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSortChange('name-asc')}>
                      Tên A-Z
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('name-desc')}>
                      Tên Z-A
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('date-desc')}>
                      Mới nhất trước
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('date-asc')}>
                      Cũ nhất trước
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="border rounded-md flex">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {renderContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
