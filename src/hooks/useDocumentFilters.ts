import { useState, useCallback, useEffect } from 'react';
import { DocumentFilter } from '@/components/documents/DocumentFilterPanel';
import { DocumentType, Folder, DocumentFile } from '@/types/document';

interface UseDocumentFiltersProps {
  initialType: DocumentType;
  initialView: 'library' | 'bookmarks' | 'trash';
}

interface FilteredItems {
  folders: Folder[];
  files: DocumentFile[];
}

export const useDocumentFilters = ({ initialType, initialView }: UseDocumentFiltersProps) => {
  const [activeType, setActiveType] = useState<DocumentType>(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  
  // Create separate filter states for operational and customer documents to maintain them when switching tabs
  const [operationalFilters, setOperationalFilters] = useState<DocumentFilter>({
    selectedCategories: [],
    selectedDepartments: [],
    selectedStatuses: [],
    selectedFileTypes: [],
  });
  
  const [customerFilters, setCustomerFilters] = useState<DocumentFilter>({
    selectedCategories: [],
    selectedDepartments: [],
    selectedStatuses: [],
    selectedFileTypes: [],
    contractNumber: '',
    subscriberId: '',
    customerId: '',
    selectedDocumentCondition: '',
  });

  // Get the current active filters based on the active document type
  const activeFilters = activeType === 'operational' ? operationalFilters : customerFilters;

  const toggleFilterPanel = useCallback(() => {
    setIsFilterPanelOpen(prev => !prev);
  }, []);

  const handleFilterChange = useCallback((newFilters: DocumentFilter) => {
    if (activeType === 'operational') {
      setOperationalFilters(newFilters);
    } else {
      setCustomerFilters(newFilters);
    }
  }, [activeType]);

  const removeFilter = useCallback((type: keyof DocumentFilter, value?: string) => {
    if (activeType === 'operational') {
      setOperationalFilters(prev => {
        const newFilters = { ...prev };
        
        if (Array.isArray(prev[type]) && value) {
          newFilters[type] = (prev[type] as string[]).filter(item => item !== value);
        } else {
          newFilters[type] = Array.isArray(prev[type]) ? [] : '';
        }
        
        return newFilters;
      });
    } else {
      setCustomerFilters(prev => {
        const newFilters = { ...prev };
        
        if (Array.isArray(prev[type]) && value) {
          newFilters[type] = (prev[type] as string[]).filter(item => item !== value);
        } else {
          newFilters[type] = Array.isArray(prev[type]) ? [] : '';
        }
        
        return newFilters;
      });
    }
  }, [activeType]);

  const resetFilters = useCallback(() => {
    if (activeType === 'operational') {
      setOperationalFilters({
        selectedCategories: [],
        selectedDepartments: [],
        selectedStatuses: [],
        selectedFileTypes: [],
      });
    } else {
      setCustomerFilters({
        selectedCategories: [],
        selectedDepartments: [],
        selectedStatuses: [],
        selectedFileTypes: [],
        contractNumber: '',
        subscriberId: '',
        customerId: '',
        selectedDocumentCondition: '',
      });
    }
    setSearchQuery('');
  }, [activeType]);

  // Filter function that can be used to filter document items
  const filterItems = useCallback((items: FilteredItems): FilteredItems => {
    const { folders, files } = items;
    const filters = activeType === 'operational' ? operationalFilters : customerFilters;
    
    // Helper function to check if an item matches the search query
    const matchesSearch = (item: Folder | DocumentFile) => {
      if (!searchQuery.trim()) return true;
      
      const query = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(query);
    };
    
    // Helper function to check if a file matches all filters
    const fileMatchesFilters = (file: DocumentFile) => {
      // Check file type filter
      if (filters.selectedFileTypes.length > 0 && !filters.selectedFileTypes.includes(file.type)) {
        return false;
      }
      
      // Additional filters for customer documents
      if (activeType === 'customer') {
        // Add customer-specific filtering logic here if needed
      }
      
      return true;
    };
    
    // Filter files based on search and filters
    const filteredFiles = files.filter(file => {
      return matchesSearch(file) && fileMatchesFilters(file);
    });
    
    // For folders, we'll keep them if they match the search or contain files that match
    // This is a simplified approach - in a real app, you might want to recursively check subfolders
    const filteredFolders = folders.filter(folder => {
      return matchesSearch(folder);
    });
    
    return {
      folders: filteredFolders,
      files: filteredFiles
    };
  }, [activeType, operationalFilters, customerFilters, searchQuery]);

  return {
    activeType,
    setActiveType,
    searchQuery,
    setSearchQuery,
    isFilterPanelOpen,
    toggleFilterPanel,
    setIsFilterPanelOpen,
    activeFilters,
    handleFilterChange,
    removeFilter,
    resetFilters,
    filterItems
  };
};
