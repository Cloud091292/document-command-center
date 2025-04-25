import { useState, useEffect } from 'react';
import { DocumentFile, Folder, DocumentSection, ViewMode, SortOption, DocumentType } from '@/types/document';

// Sample data for operational documents
const operationalDocuments: DocumentSection = {
  id: 'operational',
  name: 'Tài liệu vận hành',
  folders: [
    {
      id: 'legal',
      name: 'Pháp lý và Giấy phép',
      itemCount: 15,
      path: ['Tài liệu vận hành', 'Pháp lý và Giấy phép'],
      subfolders: [
        {
          id: 'licenses',
          name: 'Giấy phép kinh doanh',
          itemCount: 5,
          path: ['Tài liệu vận hành', 'Pháp lý và Giấy phép', 'Giấy phép kinh doanh'],
          subfolders: [],
          files: [
            {
              id: 'license-1',
              name: 'Giấy phép kinh doanh 2025.pdf',
              type: 'pdf',
              size: '2.5MB',
              updatedAt: new Date('2025-01-15'),
              createdBy: 'Nguyễn Văn A',
              path: ['Tài liệu vận hành', 'Pháp lý và Giấy phép', 'Giấy phép kinh doanh'],
              bookmarked: true
            },
            {
              id: 'license-2',
              name: 'Chứng nhận đăng ký kinh doanh.pdf',
              type: 'pdf',
              size: '1.8MB',
              updatedAt: new Date('2024-12-10'),
              createdBy: 'Trần Thị B',
              path: ['Tài liệu vận hành', 'Pháp lý và Giấy phép', 'Giấy phép kinh doanh'],
              bookmarked: false
            }
          ]
        },
        {
          id: 'contracts',
          name: 'Hợp đồng nội bộ',
          itemCount: 10,
          path: ['Tài liệu vận hành', 'Pháp lý và Giấy phép', 'Hợp đồng nội bộ'],
          subfolders: [],
          files: [
            {
              id: 'contract-1',
              name: 'Mẫu hợp đồng lao động 2025.docx',
              type: 'docx',
              size: '350KB',
              updatedAt: new Date('2025-01-05'),
              createdBy: 'Phạm Văn C',
              path: ['Tài liệu vận hành', 'Pháp lý và Giấy phép', 'Hợp đồng nội bộ'],
              bookmarked: false
            }
          ]
        }
      ],
      files: []
    },
    {
      id: 'management',
      name: 'Quản trị Doanh nghiệp',
      itemCount: 10,
      path: ['Tài liệu vận hành', 'Quản trị Doanh nghiệp'],
      subfolders: [],
      files: [
        {
          id: 'strategy-1',
          name: 'Chiến lược phát triển 2025-2030.pptx',
          type: 'other',
          size: '5.2MB',
          updatedAt: new Date('2024-11-20'),
          createdBy: 'Lê Văn D',
          path: ['Tài liệu vận hành', 'Quản trị Doanh nghiệp'],
          bookmarked: true
        }
      ]
    },
    {
      id: 'finance',
      name: 'Tài chính - Kế toán',
      itemCount: 25,
      path: ['Tài liệu vận hành', 'Tài chính - Kế toán'],
      subfolders: [
        {
          id: 'reports',
          name: 'Báo cáo tài chính',
          itemCount: 15,
          path: ['Tài liệu vận hành', 'Tài chính - Kế toán', 'Báo cáo tài chính'],
          subfolders: [
            {
              id: 'annual-reports',
              name: 'Báo cáo thường niên',
              itemCount: 5,
              path: ['Tài liệu vận hành', 'Tài chính - Kế toán', 'Báo cáo tài chính', 'Báo cáo thường niên'],
              subfolders: [],
              files: [
                {
                  id: 'annual-report-2024',
                  name: 'Báo cáo tài chính năm 2024.xlsx',
                  type: 'xlsx',
                  size: '4.7MB',
                  updatedAt: new Date('2025-02-15'),
                  createdBy: 'Nguyễn Thị E',
                  path: ['Tài liệu vận hành', 'Tài chính - Kế toán', 'Báo cáo tài chính', 'Báo cáo thường niên'],
                  bookmarked: false
                }
              ]
            },
            {
              id: 'quarterly-reports',
              name: 'Báo cáo quý',
              itemCount: 10,
              path: ['Tài liệu vận hành', 'Tài chính - Kế toán', 'Báo cáo tài chính', 'Báo cáo quý'],
              subfolders: [],
              files: [
                {
                  id: 'q1-2025',
                  name: 'Báo cáo Q1/2025.xlsx',
                  type: 'xlsx',
                  size: '3.2MB',
                  updatedAt: new Date('2025-04-15'),
                  createdBy: 'Nguyễn Thị E',
                  path: ['Tài liệu vận hành', 'Tài chính - Kế toán', 'Báo cáo tài chính', 'Báo cáo quý'],
                  bookmarked: true
                }
              ]
            }
          ],
          files: []
        }
      ],
      files: []
    }
  ]
};

// Sample data for customer documents
const customerDocuments: DocumentSection = {
  id: 'customer',
  name: 'Tài liệu khách hàng',
  folders: [
    {
      id: 'contracts',
      name: 'Hợp đồng/Phụ lục/Đính kèm',
      itemCount: 20,
      path: ['Tài liệu khách hàng', 'Hợp đồng/Phụ lục/Đính kèm'],
      subfolders: [
        {
          id: 'active-contracts',
          name: 'Hợp đồng hiện hành',
          itemCount: 15,
          path: ['Tài liệu khách hàng', 'Hợp đồng/Phụ lục/Đính kèm', 'Hợp đồng hiện hành'],
          subfolders: [],
          files: [
            {
              id: 'contract-abc',
              name: 'Hợp đồng công ty ABC.pdf',
              type: 'pdf',
              size: '3.5MB',
              updatedAt: new Date('2025-03-10'),
              createdBy: 'Trần Thị B',
              path: ['Tài liệu khách hàng', 'Hợp đồng/Phụ lục/Đính kèm', 'Hợp đồng hiện hành'],
              bookmarked: false
            }
          ]
        }
      ],
      files: []
    },
    {
      id: 'customer-data',
      name: 'Dữ liệu thông tin khách hàng',
      itemCount: 30,
      path: ['Tài liệu khách hàng', 'Dữ liệu thông tin khách hàng'],
      subfolders: [],
      files: [
        {
          id: 'customer-list',
          name: 'Danh sách khách hàng 2025.xlsx',
          type: 'xlsx',
          size: '8.3MB',
          updatedAt: new Date('2025-01-05'),
          createdBy: 'Nguyễn Văn A',
          path: ['Tài liệu khách hàng', 'Dữ liệu thông tin khách hàng'],
          bookmarked: true
        }
      ]
    },
    {
      id: 'nda',
      name: 'NDA',
      itemCount: 5,
      path: ['Tài liệu khách hàng', 'NDA'],
      subfolders: [],
      files: [
        {
          id: 'nda-template',
          name: 'Mẫu NDA.docx',
          type: 'docx',
          size: '280KB',
          updatedAt: new Date('2024-09-15'),
          createdBy: 'Phạm Văn C',
          path: ['Tài liệu khách hàng', 'NDA'],
          bookmarked: false
        }
      ]
    }
  ]
};

// Sample data for trashed items
const trashedItems: {
  files: DocumentFile[];
  folders: Folder[];
} = {
  files: [
    {
      id: 'deleted-file-1',
      name: 'Dự toán quý 4-2024.xlsx',
      type: 'xlsx',
      size: '1.5MB',
      updatedAt: new Date('2024-10-10'),
      createdBy: 'Lê Văn D',
      path: ['Tài liệu vận hành', 'Tài chính - Kế toán', 'Dự toán'],
      bookmarked: false
    },
    {
      id: 'deleted-file-2',
      name: 'Hồ sơ khách hàng XYZ.pdf',
      type: 'pdf',
      size: '4.2MB',
      updatedAt: new Date('2024-08-20'),
      createdBy: 'Trần Thị B',
      path: ['Tài liệu khách hàng', 'Dữ liệu thông tin khách hàng'],
      bookmarked: false
    }
  ],
  folders: [
    {
      id: 'deleted-folder-1',
      name: 'Chiến dịch marketing 2024',
      itemCount: 8,
      path: ['Tài liệu vận hành', 'Marketing'],
      subfolders: [],
      files: []
    }
  ]
};

export function useDocumentManager(
  initialType: DocumentType = 'operational', 
  initialViewMode: ViewMode = 'list',
  initialSort: SortOption = 'name-asc',
  initialView: 'library' | 'bookmarks' | 'trash' = 'library'
) {
  // State management
  const [activeType, setActiveType] = useState<DocumentType>(initialType);
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);
  const [currentView, setCurrentView] = useState<'library' | 'bookmarks' | 'trash'>(initialView);
  
  // Navigation state
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  
  // Data state based on current view
  const [displayItems, setDisplayItems] = useState<{
    folders: Folder[];
    files: DocumentFile[];
  }>({ folders: [], files: [] });
  
  // Set the current document type (operational or customer)
  const changeDocumentType = (type: DocumentType) => {
    setActiveType(type);
    setCurrentPath([type === 'operational' ? 'Tài liệu vận hành' : 'Tài liệu khách hàng']);
    setCurrentFolder(null);
  };
  
  // Navigate to a folder
  const navigateToFolder = (folder: Folder) => {
    setCurrentFolder(folder);
    setCurrentPath(folder.path);
  };
  
  // Navigate to a specific path
  const navigateToPath = (path: string[]) => {
    setCurrentPath(path);
    
    // Find the folder corresponding to this path
    if (path.length <= 1) {
      setCurrentFolder(null);
      return;
    }
    
    // Start from the root folders
    const rootSection = activeType === 'operational' ? operationalDocuments : customerDocuments;
    
    // Navigate down the path
    let targetFolder: Folder | null = null;
    let currentFolders = rootSection.folders;
    
    for (let i = 1; i < path.length; i++) {
      const pathSegment = path[i];
      const foundFolder = currentFolders.find(f => f.name === pathSegment);
      
      if (foundFolder) {
        if (i === path.length - 1) {
          targetFolder = foundFolder;
          break;
        } else {
          currentFolders = foundFolder.subfolders;
        }
      } else {
        break;
      }
    }
    
    setCurrentFolder(targetFolder);
  };
  
  // Toggle bookmark status for a file
  const toggleBookmark = (fileId: string) => {
    // This would be replaced with API calls in a real implementation
    // For now, just update the sample data directly
    const updateBookmarkInFolders = (folders: Folder[]): boolean => {
      for (const folder of folders) {
        const fileIndex = folder.files.findIndex(f => f.id === fileId);
        if (fileIndex >= 0) {
          folder.files[fileIndex].bookmarked = !folder.files[fileIndex].bookmarked;
          return true;
        }
        
        if (updateBookmarkInFolders(folder.subfolders)) {
          return true;
        }
      }
      return false;
    };
    
    if (activeType === 'operational') {
      updateBookmarkInFolders(operationalDocuments.folders);
    } else {
      updateBookmarkInFolders(customerDocuments.folders);
    }
    
    // Update the display items
    updateDisplayItems();
  };
  
  // Get all bookmarked files
  const getBookmarkedFiles = (): DocumentFile[] => {
    const results: DocumentFile[] = [];
    
    const collectBookmarksFromFolders = (folders: Folder[]) => {
      for (const folder of folders) {
        results.push(...folder.files.filter(file => file.bookmarked));
        collectBookmarksFromFolders(folder.subfolders);
      }
    };
    
    collectBookmarksFromFolders(operationalDocuments.folders);
    collectBookmarksFromFolders(customerDocuments.folders);
    
    return results;
  };
  
  // Handle restore from trash
  const restoreFromTrash = (itemId: string) => {
    // This would be replaced with API calls in a real implementation
    console.log('Restoring item', itemId);
    
    // For demo purposes, just remove from trash arrays
    trashedItems.files = trashedItems.files.filter(file => file.id !== itemId);
    trashedItems.folders = trashedItems.folders.filter(folder => folder.id !== itemId);
    
    // Update the display items
    updateDisplayItems();
  };
  
  // Permanently delete item
  const permanentlyDelete = (itemId: string) => {
    // This would be replaced with API calls in a real implementation
    console.log('Permanently deleting item', itemId);
    
    // For demo purposes, just remove from trash arrays
    trashedItems.files = trashedItems.files.filter(file => file.id !== itemId);
    trashedItems.folders = trashedItems.folders.filter(folder => folder.id !== itemId);
    
    // Update the display items
    updateDisplayItems();
  };
  
  // Sort files and folders based on current sort option
  const sortItems = (folders: Folder[], files: DocumentFile[]): { folders: Folder[], files: DocumentFile[] } => {
    let sortedFolders = [...folders];
    let sortedFiles = [...files];
    
    switch (sortOption) {
      case 'name-asc':
        sortedFolders.sort((a, b) => a.name.localeCompare(b.name));
        sortedFiles.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedFolders.sort((a, b) => b.name.localeCompare(a.name));
        sortedFiles.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'date-asc':
        // Folders don't have dates, so keep the same order
        sortedFiles.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
        break;
      case 'date-desc':
        // Folders don't have dates, so keep the same order
        sortedFiles.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
        break;
      default:
        break;
    }
    
    return { folders: sortedFolders, files: sortedFiles };
  };
  
  // Update displayed items based on current state
  const updateDisplayItems = () => {
    let folders: Folder[] = [];
    let files: DocumentFile[] = [];
    
    if (currentView === 'library') {
      if (currentFolder) {
        folders = currentFolder.subfolders;
        files = currentFolder.files;
      } else {
        const rootSection = activeType === 'operational' ? operationalDocuments : customerDocuments;
        folders = rootSection.folders;
        files = [];
      }
    } else if (currentView === 'bookmarks') {
      files = getBookmarkedFiles();
    } else if (currentView === 'trash') {
      folders = trashedItems.folders;
      files = trashedItems.files;
    }
    
    const sorted = sortItems(folders, files);
    setDisplayItems({ folders: sorted.folders, files: sorted.files });
  };
  
  // Effect to update display items when state changes
  useEffect(() => {
    updateDisplayItems();
  }, [activeType, currentFolder, currentView, sortOption]);
  
  return {
    // State
    activeType,
    viewMode,
    sortOption,
    currentView,
    currentPath,
    currentFolder,
    displayItems,
    
    // Actions
    setActiveType: changeDocumentType,
    setViewMode,
    setSortOption,
    setCurrentView,
    navigateToFolder,
    navigateToPath,
    toggleBookmark,
    restoreFromTrash,
    permanentlyDelete
  };
}
