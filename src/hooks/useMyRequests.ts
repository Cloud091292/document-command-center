
import { useState, useEffect } from 'react';

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'InProgress';
export type RequestType = 'Approval' | 'E-Sign';

export interface Approver {
  name: string;
  status: RequestStatus;
  avatarUrl?: string;
}

export interface ApprovalStep {
  step: number;
  unit: string;
  handler: string;
  date: Date;
  comments?: string;
  attachments?: { name: string; url: string; size: string }[];
  status: RequestStatus;
}

export interface MyRequest {
  id: string;
  title: string;
  documentType: string;
  fileType: string;
  requestGroup: string;
  processingUnit: string;
  requestType: RequestType;
  requestDate: Date;
  dueDate: Date;
  status: RequestStatus;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  approvers: Approver[];
  approvalHistory: ApprovalStep[];
  sla: {
    daysLeft: number;
    isOverdue: boolean;
  };
}

// Mock data for my requests
const mockMyRequests: MyRequest[] = [
  {
    id: 'REQ001',
    title: 'Annual Budget Planning',
    documentType: 'Finance Document',
    fileType: 'XLSX',
    requestGroup: 'Finance',
    processingUnit: 'Finance Department',
    requestType: 'Approval',
    requestDate: new Date('2025-04-05'),
    dueDate: new Date('2025-04-15'),
    status: 'Pending',
    description: 'Annual budget planning document for fiscal year 2025 requiring approval.',
    fileUrl: '#',
    fileName: 'Annual_Budget_Planning_2025.xlsx',
    fileSize: '1.8 MB',
    approvers: [
      { name: 'Emily Clark', status: 'Approved' },
      { name: 'Robert Wilson', status: 'Pending' },
      { name: 'Lisa Anderson', status: 'Pending' }
    ],
    approvalHistory: [
      {
        step: 1,
        unit: 'Finance Department',
        handler: 'Emily Clark',
        date: new Date('2025-04-07'),
        comments: 'Initial review completed. Forwarding to next approver.',
        status: 'Approved'
      }
    ],
    sla: {
      daysLeft: 6,
      isOverdue: false
    }
  },
  {
    id: 'REQ002',
    title: 'Sales Presentation',
    documentType: 'Marketing Material',
    fileType: 'PPTX',
    requestGroup: 'Sales',
    processingUnit: 'Marketing Department',
    requestType: 'Approval',
    requestDate: new Date('2025-04-02'),
    dueDate: new Date('2025-04-09'),
    status: 'Approved',
    description: 'Sales presentation for the upcoming client meeting. Requires approval from Sales and Marketing departments.',
    fileUrl: '#',
    fileName: 'Sales_Presentation_Q2.pptx',
    fileSize: '5.2 MB',
    approvers: [
      { name: 'David Brown', status: 'Approved' },
      { name: 'Sarah Williams', status: 'Approved' }
    ],
    approvalHistory: [
      {
        step: 1,
        unit: 'Sales Department',
        handler: 'David Brown',
        date: new Date('2025-04-04'),
        comments: 'Content looks great. Approved.',
        status: 'Approved'
      },
      {
        step: 2,
        unit: 'Marketing Department',
        handler: 'Sarah Williams',
        date: new Date('2025-04-05'),
        comments: 'Branding is consistent with guidelines. Approved.',
        attachments: [
          { name: 'Branding_Notes.pdf', url: '#', size: '0.5 MB' }
        ],
        status: 'Approved'
      }
    ],
    sla: {
      daysLeft: 0,
      isOverdue: false
    }
  },
  {
    id: 'REQ003',
    title: 'Employee Onboarding Guide',
    documentType: 'HR Document',
    fileType: 'PDF',
    requestGroup: 'HR',
    processingUnit: 'Human Resources',
    requestType: 'E-Sign',
    requestDate: new Date('2025-03-25'),
    dueDate: new Date('2025-04-10'),
    status: 'Rejected',
    description: 'Updated employee onboarding guide with new policies. Requires e-signature from HR Director and CEO.',
    fileUrl: '#',
    fileName: 'Employee_Onboarding_Guide_2025.pdf',
    fileSize: '3.7 MB',
    approvers: [
      { name: 'John Doe', status: 'Rejected' },
      { name: 'Jane Smith', status: 'Pending' }
    ],
    approvalHistory: [
      {
        step: 1,
        unit: 'Human Resources',
        handler: 'John Doe',
        date: new Date('2025-04-01'),
        comments: 'Section 3.2 needs revision for clarity. Rejected for now.',
        status: 'Rejected'
      }
    ],
    sla: {
      daysLeft: 1,
      isOverdue: false
    }
  },
  {
    id: 'REQ004',
    title: 'Q3 Financial Report - 2023',
    documentType: 'Financial Report',
    fileType: 'PDF',
    requestGroup: 'Finance',
    processingUnit: 'Finance Department',
    requestType: 'E-Sign',
    requestDate: new Date('2025-03-20'),
    dueDate: new Date('2025-04-05'),
    status: 'InProgress',
    description: 'Comprehensive financial report for Q3 2023 including revenue analysis, expense breakdown, and projections for Q4.',
    fileUrl: '#',
    fileName: 'Q3_Financial_Report_2023.pdf',
    fileSize: '4.2 MB',
    approvers: [
      { name: 'Michael Johnson', status: 'Approved' },
      { name: 'Sarah Williams', status: 'InProgress' },
      { name: 'James Wilson', status: 'Pending' }
    ],
    approvalHistory: [
      {
        step: 1,
        unit: 'Finance Department',
        handler: 'Michael Johnson',
        date: new Date('2025-03-25'),
        comments: 'Numbers verified, looks good.',
        status: 'Approved'
      },
      {
        step: 2,
        unit: 'Department Manager Review',
        handler: 'Sarah Williams',
        date: new Date('2025-03-30'),
        status: 'InProgress'
      }
    ],
    sla: {
      daysLeft: -4,
      isOverdue: true
    }
  }
];

export const useMyRequests = () => {
  const [requests, setRequests] = useState<MyRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setRequests(mockMyRequests);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch requests');
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return {
    requests,
    isLoading,
    error
  };
};
