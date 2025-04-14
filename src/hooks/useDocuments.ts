
import { useState, useEffect } from 'react';

// Define document statuses
export type DocumentStatus = 'Hiệu lực' | 'Hết hiệu lực' | 'Chưa hoàn trả' | 'Đã hoàn trả' | 'Hủy bỏ' | 'Khoanh nợ hồ sơ' | 'Tiếp nhận' | 'Cho mượn';
export type DocumentCondition = 'Đúng biểu mẫu' | 'Sai biểu mẫu';
export type DocumentCategory = 'Hợp đồng' | 'Phụ lục' | 'Tài liệu đính kèm' | 'Hồ sơ pháp lý' | 'NDA' | 'Dữ liệu thông tin' | 'Hồ sơ thầu' | 'Báo giá' | 'Biên bản thương thảo' | 'Công văn trao đổi' | 'Tờ trình phê duyệt';
export type FileType = 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'jpg' | 'png';

// Mock document data
const mockDocuments = [
  {
    id: '1',
    title: 'Dự toán ngân sách 2025',
    description: 'Đề xuất ngân sách hàng năm cho năm tài chính 2025 cần xem xét và phê duyệt.',
    classification: 'Tài chính',
    sender: 'Phòng Tài chính',
    dateReceived: new Date('2024-04-05'),
    status: 'Hiệu lực' as DocumentStatus,
    referenceCode: 'FIN-2025-001',
    fileUrl: '#',
    fileType: 'pdf' as FileType,
    department: 'Tài chính',
    category: 'Dữ liệu thông tin' as DocumentCategory,
    contractNumber: '',
    subscriberId: '',
    condition: 'Đúng biểu mẫu' as DocumentCondition,
  },
  {
    id: '2',
    title: 'Cập nhật Sổ tay nhân viên',
    description: 'Sổ tay nhân viên cập nhật với các chính sách mới về làm việc từ xa và phúc lợi.',
    classification: 'Nhân sự',
    sender: 'Phòng Nhân sự',
    dateReceived: new Date('2024-04-03'),
    status: 'Hiệu lực' as DocumentStatus,
    referenceCode: 'HR-2024-045',
    fileUrl: '#',
    fileType: 'docx' as FileType,
    department: 'Nhân sự',
    category: 'Tài liệu đính kèm' as DocumentCategory,
    contractNumber: '',
    subscriberId: '',
    condition: 'Đúng biểu mẫu' as DocumentCondition,
  },
  {
    id: '3',
    title: 'Thỏa thuận với Tech Solutions Inc',
    description: 'Thỏa thuận mức dịch vụ với Tech Solutions về dịch vụ hỗ trợ CNTT.',
    classification: 'Pháp lý',
    sender: 'Tech Solutions Inc.',
    dateReceived: new Date('2024-04-02'),
    status: 'Hiệu lực' as DocumentStatus,
    referenceCode: 'LEG-2024-032',
    fileUrl: '#',
    fileType: 'pdf' as FileType,
    department: 'Pháp lý',
    category: 'Hợp đồng' as DocumentCategory,
    contractNumber: 'HD-2024-032',
    subscriberId: '',
    condition: 'Đúng biểu mẫu' as DocumentCondition,
  },
  {
    id: '4',
    title: 'Đề xuất chiến dịch Marketing',
    description: 'Đề xuất chiến dịch marketing Q2 cho việc ra mắt sản phẩm.',
    classification: 'Marketing',
    sender: 'Phòng Marketing',
    dateReceived: new Date('2024-04-01'),
    status: 'Hiệu lực' as DocumentStatus,
    referenceCode: 'MKT-2024-012',
    fileUrl: '#',
    fileType: 'pptx' as FileType,
    department: 'Marketing',
    category: 'Báo giá' as DocumentCategory,
    contractNumber: '',
    subscriberId: '',
    condition: 'Đúng biểu mẫu' as DocumentCondition,
  },
  {
    id: '5',
    title: 'Báo cáo tuân thủ an toàn',
    description: 'Báo cáo tuân thủ an toàn hàng quý cho các cơ sở sản xuất.',
    classification: 'Vận hành',
    sender: 'Phòng Vận hành',
    dateReceived: new Date('2024-03-28'),
    status: 'Hiệu lực' as DocumentStatus,
    referenceCode: 'OPS-2024-089',
    fileUrl: '#',
    fileType: 'xlsx' as FileType,
    department: 'Vận hành',
    category: 'Tài liệu đính kèm' as DocumentCategory,
    contractNumber: '',
    subscriberId: '',
    condition: 'Đúng biểu mẫu' as DocumentCondition,
  },
  {
    id: '6',
    title: 'Cập nhật tiến độ dự án',
    description: 'Lịch trình cập nhật cho dự án triển khai ERP.',
    classification: 'Dự án',
    sender: 'Văn phòng Quản lý Dự án',
    dateReceived: new Date('2024-03-25'),
    status: 'Hiệu lực' as DocumentStatus,
    referenceCode: 'PMO-2024-054',
    fileUrl: '#',
    fileType: 'xlsx' as FileType,
    department: 'CNTT',
    category: 'Dữ liệu thông tin' as DocumentCategory,
    contractNumber: '',
    subscriberId: '',
    condition: 'Đúng biểu mẫu' as DocumentCondition,
  },
  {
    id: '7',
    title: 'Hợp đồng dịch vụ viễn thông',
    description: 'Hợp đồng cung cấp dịch vụ viễn thông cho khách hàng doanh nghiệp.',
    classification: 'Pháp lý',
    sender: 'Phòng Kinh doanh',
    dateReceived: new Date('2024-03-20'),
    status: 'Hiệu lực' as DocumentStatus,
    referenceCode: 'CONT-2024-078',
    fileUrl: '#',
    fileType: 'pdf' as FileType,
    department: 'Kinh doanh',
    category: 'Hợp đồng' as DocumentCategory,
    contractNumber: 'HD-2024-078',
    subscriberId: 'SUB-12345',
    condition: 'Đúng biểu mẫu' as DocumentCondition,
  },
  {
    id: '8',
    title: 'Hồ sơ thuê bao doanh nghiệp',
    description: 'Hồ sơ thuê bao dịch vụ viễn thông cho Công ty ABC.',
    classification: 'Khách hàng',
    sender: 'Phòng Chăm sóc Khách hàng',
    dateReceived: new Date('2024-03-18'),
    status: 'Chưa hoàn trả' as DocumentStatus,
    referenceCode: 'SUB-2024-036',
    fileUrl: '#',
    fileType: 'pdf' as FileType,
    department: 'CSKH',
    category: 'Hồ sơ pháp lý' as DocumentCategory,
    contractNumber: 'HD-2024-036',
    subscriberId: 'SUB-54321',
    condition: 'Đúng biểu mẫu' as DocumentCondition,
  },
  {
    id: '9',
    title: 'Biên bản nghiệm thu dịch vụ',
    description: 'Biên bản nghiệm thu hoàn thành lắp đặt dịch vụ cho khách hàng XYZ.',
    classification: 'Khách hàng',
    sender: 'Phòng Kỹ thuật',
    dateReceived: new Date('2024-03-15'),
    status: 'Đã hoàn trả' as DocumentStatus,
    referenceCode: 'ACC-2024-112',
    fileUrl: '#',
    fileType: 'pdf' as FileType,
    department: 'Kỹ thuật',
    category: 'Biên bản thương thảo' as DocumentCategory,
    contractNumber: 'HD-2024-112',
    subscriberId: 'SUB-67890',
    condition: 'Sai biểu mẫu' as DocumentCondition,
  },
  {
    id: '10',
    title: 'Phụ lục hợp đồng mở rộng dịch vụ',
    description: 'Phụ lục bổ sung cho hợp đồng dịch vụ hiện có với khách hàng LMN.',
    classification: 'Pháp lý',
    sender: 'Phòng Kinh doanh',
    dateReceived: new Date('2024-03-10'),
    status: 'Khoanh nợ hồ sơ' as DocumentStatus,
    referenceCode: 'APNX-2024-067',
    fileUrl: '#',
    fileType: 'docx' as FileType,
    department: 'Kinh doanh',
    category: 'Phụ lục' as DocumentCategory,
    contractNumber: 'HD-2023-188',
    subscriberId: 'SUB-24680',
    condition: 'Sai biểu mẫu' as DocumentCondition,
  }
];

export type DocumentType = 'incoming' | 'outgoing' | 'all' | 'operational' | 'customer';

// Rename Document to DocumentItem to avoid conflicts with global Document type
export type DocumentItem = typeof mockDocuments[0];

// Extended interface for document filtering
export interface DocumentFilters {
  search?: string;
  fileTypes?: FileType[];
  status?: DocumentStatus;
  department?: string;
  category?: DocumentCategory;
  contractNumber?: string;
  subscriberId?: string;
  condition?: DocumentCondition;
  dateFrom?: Date;
  dateTo?: Date;
}

export const useDocuments = (type: DocumentType = 'all', filters: DocumentFilters = {}) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter by document type
        let docs = [...mockDocuments];
        if (type === 'operational') {
          docs = mockDocuments.filter(doc => !doc.contractNumber && !doc.subscriberId);
        } else if (type === 'customer') {
          docs = mockDocuments.filter(doc => doc.contractNumber || doc.subscriberId);
        } else if (type === 'incoming' || type === 'outgoing') {
          // Add more filtering logic as needed
        }
        
        setDocuments(docs);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch documents');
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [type]);

  // Apply filters whenever filters or documents change
  useEffect(() => {
    let result = [...documents];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(doc => 
        doc.title.toLowerCase().includes(searchLower) ||
        doc.description.toLowerCase().includes(searchLower) ||
        doc.referenceCode.toLowerCase().includes(searchLower)
      );
    }

    // Apply file type filter
    if (filters.fileTypes && filters.fileTypes.length > 0) {
      result = result.filter(doc => filters.fileTypes?.includes(doc.fileType));
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(doc => doc.status === filters.status);
    }

    // Apply department filter
    if (filters.department) {
      result = result.filter(doc => doc.department === filters.department);
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(doc => doc.category === filters.category);
    }

    // Apply contract number filter
    if (filters.contractNumber) {
      result = result.filter(doc => 
        doc.contractNumber && doc.contractNumber.includes(filters.contractNumber || '')
      );
    }

    // Apply subscriber ID filter
    if (filters.subscriberId) {
      result = result.filter(doc => 
        doc.subscriberId && doc.subscriberId.includes(filters.subscriberId || '')
      );
    }

    // Apply document condition filter
    if (filters.condition) {
      result = result.filter(doc => doc.condition === filters.condition);
    }

    // Apply date range filter
    if (filters.dateFrom) {
      result = result.filter(doc => doc.dateReceived >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      result = result.filter(doc => doc.dateReceived <= filters.dateTo!);
    }

    setFilteredDocuments(result);
  }, [documents, filters]);

  return {
    documents: filteredDocuments,
    isLoading,
    error,
    totalCount: documents.length,
    filteredCount: filteredDocuments.length
  };
};
