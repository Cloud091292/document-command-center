
import { useState, useEffect } from 'react';

export type ApprovalPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Attachment {
  name: string;
  url: string;
  size: string;
}

export interface PendingApproval {
  id: string;
  title: string;
  documentType: string;
  fileType: string;
  sender: {
    name: string;
    department: string;
    avatar?: string;
  };
  requestDate: Date;
  dueDate: Date;
  priority: ApprovalPriority;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  comments: Array<{
    user: string;
    text: string;
    date: Date;
    avatar?: string;
  }>;
  attachments: Attachment[];
  references?: Array<{
    id: string;
    title: string;
    url: string;
  }>;
  approvalStep: {
    current: number;
    total: number;
    name: string;
  }; 
  sla: {
    daysLeft: number;
    isOverdue: boolean;
  };
}

// Mock data for pending approvals
const mockPendingApprovals: PendingApproval[] = [
  {
    id: 'PA001',
    title: 'Đề xuất mua sắm thiết bị văn phòng Q2/2025',
    documentType: 'Đề xuất mua sắm',
    fileType: 'PDF',
    sender: {
      name: 'Nguyễn Văn A',
      department: 'Phòng Hành chính',
    },
    requestDate: new Date('2025-04-20'),
    dueDate: new Date('2025-04-25'),
    priority: 'Medium',
    description: 'Đề xuất mua sắm thiết bị văn phòng cho quý 2 năm 2025 bao gồm máy tính, màn hình và các thiết bị ngoại vi.',
    fileUrl: '#',
    fileName: 'De_xuat_mua_sam_Q2_2025.pdf',
    fileSize: '2.4 MB',
    comments: [
      {
        user: 'Trần Thị B',
        text: 'Đã kiểm tra danh sách thiết bị, đề nghị bổ sung thêm webcam cho phòng họp.',
        date: new Date('2025-04-21'),
      }
    ],
    attachments: [
      { name: 'Danh_sach_thiet_bi.xlsx', url: '#', size: '0.5 MB' },
      { name: 'Bao_gia_thiet_bi.pdf', url: '#', size: '1.2 MB' },
    ],
    references: [
      { id: 'REF001', title: 'Kế hoạch ngân sách 2025', url: '#' },
      { id: 'REF002', title: 'Quy trình mua sắm', url: '#' }
    ],
    approvalStep: {
      current: 2,
      total: 3,
      name: 'Phê duyệt của Trưởng phòng Tài chính',
    },
    sla: {
      daysLeft: 2,
      isOverdue: false
    }
  },
  {
    id: 'PA002',
    title: 'Hợp đồng cung cấp dịch vụ bảo trì máy lạnh 2025',
    documentType: 'Hợp đồng',
    fileType: 'DOCX',
    sender: {
      name: 'Lê Thị C',
      department: 'Phòng Hành chính',
    },
    requestDate: new Date('2025-04-18'),
    dueDate: new Date('2025-04-22'),
    priority: 'High',
    description: 'Hợp đồng ký kết với Công ty TNHH Kỹ thuật ABC về việc cung cấp dịch vụ bảo trì hệ thống máy lạnh trong năm 2025.',
    fileUrl: '#',
    fileName: 'Hop_dong_bao_tri_may_lanh_2025.docx',
    fileSize: '1.8 MB',
    comments: [],
    attachments: [
      { name: 'Phu_luc_1.pdf', url: '#', size: '0.7 MB' },
      { name: 'Bao_cao_danh_gia.pdf', url: '#', size: '1.0 MB' },
    ],
    approvalStep: {
      current: 1,
      total: 2,
      name: 'Phê duyệt của Giám đốc',
    },
    sla: {
      daysLeft: -1,
      isOverdue: true
    }
  },
  {
    id: 'PA003',
    title: 'Đơn xin nghỉ phép của Nguyễn Văn D',
    documentType: 'Đơn nghỉ phép',
    fileType: 'PDF',
    sender: {
      name: 'Nguyễn Văn D',
      department: 'Phòng Kỹ thuật',
    },
    requestDate: new Date('2025-04-22'),
    dueDate: new Date('2025-04-23'),
    priority: 'Urgent',
    description: 'Đơn xin nghỉ phép từ ngày 25/04/2025 đến ngày 30/04/2025 với lý do cá nhân.',
    fileUrl: '#',
    fileName: 'Don_xin_nghi_phep_NguyenVanD.pdf',
    fileSize: '0.3 MB',
    comments: [
      {
        user: 'Phạm Thị E',
        text: 'Đã xác nhận lịch công việc, không ảnh hưởng đến deadline dự án.',
        date: new Date('2025-04-22'),
      }
    ],
    attachments: [],
    approvalStep: {
      current: 1,
      total: 1,
      name: 'Phê duyệt của Trưởng phòng',
    },
    sla: {
      daysLeft: 1,
      isOverdue: false
    }
  },
  {
    id: 'PA004',
    title: 'Kế hoạch marketing Q3/2025',
    documentType: 'Kế hoạch',
    fileType: 'PPTX',
    sender: {
      name: 'Trần Văn F',
      department: 'Phòng Marketing',
    },
    requestDate: new Date('2025-04-15'),
    dueDate: new Date('2025-04-30'),
    priority: 'Medium',
    description: 'Kế hoạch triển khai các hoạt động marketing cho quý 3 năm 2025, bao gồm chiến dịch quảng cáo và khuyến mãi.',
    fileUrl: '#',
    fileName: 'Ke_hoach_marketing_Q3_2025.pptx',
    fileSize: '5.2 MB',
    comments: [
      {
        user: 'Hoàng Văn G',
        text: 'Cần xem xét lại ngân sách cho hoạt động quảng cáo online.',
        date: new Date('2025-04-18'),
      },
      {
        user: 'Trần Văn F',
        text: 'Đã điều chỉnh ngân sách theo góp ý.',
        date: new Date('2025-04-19'),
      }
    ],
    attachments: [
      { name: 'Ngan_sach_chi_tiet.xlsx', url: '#', size: '0.8 MB' },
    ],
    references: [
      { id: 'REF003', title: 'Báo cáo thị trường Q2/2025', url: '#' },
      { id: 'REF004', title: 'Kế hoạch kinh doanh 2025', url: '#' }
    ],
    approvalStep: {
      current: 2,
      total: 3,
      name: 'Phê duyệt của Giám đốc Marketing',
    },
    sla: {
      daysLeft: 8,
      isOverdue: false
    }
  }
];

export const usePendingApprovals = () => {
  const [approvals, setApprovals] = useState<PendingApproval[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setApprovals(mockPendingApprovals);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch pending approvals');
        setIsLoading(false);
      }
    };

    fetchApprovals();
  }, []);

  return {
    approvals,
    isLoading,
    error
  };
};
