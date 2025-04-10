
import { useState, useMemo } from 'react';
import { Template } from '@/pages/templates/types';

export const useTemplates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  
  // Mock template data
  const templates: Template[] = [
    {
      id: '1',
      name: 'Hợp đồng tiêu chuẩn',
      description: 'Mẫu hợp đồng tiêu chuẩn cho thỏa thuận khách hàng',
      category: 'Hợp đồng & Thỏa thuận',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
      author: {
        name: 'Nguyễn Văn A',
      },
    },
    {
      id: '2',
      name: 'Mẫu NDA',
      description: 'Mẫu thỏa thuận bảo mật cho đối tác bên ngoài',
      category: 'Tài liệu pháp lý & Tuân thủ',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
      author: {
        name: 'Trần Thị B',
      },
    },
    {
      id: '3',
      name: 'Mẫu hóa đơn',
      description: 'Mẫu hóa đơn tiêu chuẩn để lập hóa đơn cho khách hàng',
      category: 'Tài liệu tài chính & kế toán',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21), // 3 weeks ago
      author: {
        name: 'Lê Văn C',
      },
    },
    {
      id: '4',
      name: 'Hợp đồng lao động',
      description: 'Hợp đồng lao động tiêu chuẩn cho nhân viên mới',
      category: 'HR & Hồ sơ nhân viên',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60), // 2 months ago
      author: {
        name: 'Phạm Thị D',
      },
    },
    {
      id: '5',
      name: 'Báo cáo dự án',
      description: 'Mẫu để tạo báo cáo trạng thái dự án',
      category: 'Báo cáo hoạt động & Tài liệu dự án',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
      author: {
        name: 'Hoàng Văn E',
      },
    },
    {
      id: '6',
      name: 'Đơn đặt hàng',
      description: 'Mẫu đơn đặt hàng tiêu chuẩn cho nhà cung cấp',
      category: 'Mua sắm & Quản lý nhà cung cấp',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      author: {
        name: 'Đỗ Thị F',
      },
    },
  ];

  // Get unique categories for filter dropdown
  const categories = useMemo(() => 
    ['Tất cả danh mục', ...new Set(templates.map(t => t.category))],
    []
  );
  
  // Filter templates by search query and category
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [templates, searchQuery, categoryFilter]);

  // Sort templates based on selected sort option
  const sortedTemplates = useMemo(() => {
    return [...filteredTemplates].sort((a, b) => {
      if (sortBy === 'recent') {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [filteredTemplates, sortBy]);

  return {
    templates: sortedTemplates,
    categories,
    filters: {
      searchQuery,
      setSearchQuery,
      categoryFilter,
      setCategoryFilter,
      sortBy,
      setSortBy
    }
  };
};
