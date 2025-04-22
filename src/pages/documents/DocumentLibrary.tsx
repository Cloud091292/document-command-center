
import React from 'react';
import { DocumentLibraryHeader } from '@/components/documents/DocumentLibraryHeader';
import { DocumentLibraryTabs } from '@/components/documents/DocumentLibraryTabs';
import { FileText } from 'lucide-react';

const operationalCategories = [
  { name: 'Pháp lý và Giấy phép', count: 124, icon: FileText },
  { name: 'Quản trị Doanh nghiệp', count: 87, icon: FileText },
  { name: 'Tài chính - Kế toán', count: 92, icon: FileText },
  { name: 'Nhân sự và Lao động', count: 105, icon: FileText },
  { name: 'Vận hành – Giám sát – Bảo trì hệ thống', count: 76, icon: FileText },
  { name: 'Kiểm tra – Thanh tra – Báo cáo', count: 58, icon: FileText },
  { name: 'Sản phẩm và Dịch vụ', count: 145, icon: FileText },
  { name: 'Hành chính và Khác', count: 99, icon: FileText },
];

const customerCategories = [
  { name: 'Hồ sơ khiếu nại/tranh chấp', count: 56, icon: FileText },
  { name: 'Phiếu yêu cầu triển khai dịch vụ', count: 89, icon: FileText },
  { name: 'Quy trình/quy định nội bộ về hợp đồng', count: 45, icon: FileText },
  { name: 'Tờ trình phê duyệt', count: 78, icon: FileText },
  { name: 'Công văn trao đổi', count: 112, icon: FileText },
  { name: 'Báo giá gửi khách', count: 97, icon: FileText },
  { name: 'Hồ sơ pháp lý của khách hàng/đối tác', count: 126, icon: FileText },
  { name: 'NDA', count: 64, icon: FileText },
  { name: 'Hợp đồng/Phụ lục/Đính kèm', count: 213, icon: FileText },
  { name: 'Dữ liệu thông tin khách hàng', count: 167, icon: FileText },
];

const DocumentLibrary = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="space-y-6">
      <DocumentLibraryHeader />
      <DocumentLibraryTabs 
        categories={{
          operational: operationalCategories,
          customer: customerCategories
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export default DocumentLibrary;
