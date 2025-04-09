
import { useState, useEffect } from 'react';

export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected' | 'InProgress' | 'Returned';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ApprovalStep {
  step: number;
  unit: string;
  handler: string;
  date: Date;
  comments?: string;
  attachments?: { name: string; url: string; size: string }[];
  status: ApprovalStatus;
}

export interface ApprovalDocument {
  id: string;
  title: string;
  requester: string;
  requesterUnit: string;
  type: string;
  requestDate: Date;
  dueDate: Date;
  priority: Priority;
  status: ApprovalStatus;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  approvalHistory: ApprovalStep[];
  reference?: string;
}

// Mock data for pending approvals
const mockApprovalDocuments: ApprovalDocument[] = [
  {
    id: 'AP001',
    title: 'Budget Approval for Q2 Marketing Campaign',
    requester: 'John Smith',
    requesterUnit: 'Marketing Department',
    type: 'Budget Request',
    requestDate: new Date('2025-04-05'),
    dueDate: new Date('2025-04-15'),
    priority: 'High',
    status: 'Pending',
    description: 'Approval needed for the Q2 marketing campaign budget allocation. Total budget: $150,000.',
    fileUrl: '#',
    fileName: 'Q2_Marketing_Budget.pdf',
    fileSize: '2.3 MB',
    approvalHistory: [
      {
        step: 1,
        unit: 'Marketing Department',
        handler: 'Jane Doe',
        date: new Date('2025-04-03'),
        comments: 'Initial review completed. Forwarding to finance.',
        attachments: [
          { name: 'Initial_Review.docx', url: '#', size: '1.2 MB' }
        ],
        status: 'Approved'
      },
      {
        step: 2,
        unit: 'Finance Department',
        handler: 'Michael Chen',
        date: new Date('2025-04-05'),
        comments: 'Budget allocation reviewed. Awaiting final approval.',
        status: 'InProgress'
      }
    ]
  },
  {
    id: 'AP002',
    title: 'Vendor Contract Renewal - Tech Solutions Inc',
    requester: 'Sarah Wilson',
    requesterUnit: 'Procurement Department',
    type: 'Contract',
    requestDate: new Date('2025-04-02'),
    dueDate: new Date('2025-04-20'),
    priority: 'Medium',
    status: 'InProgress',
    description: 'Annual contract renewal with Tech Solutions Inc for IT support services. Contract value: $75,000/year.',
    fileUrl: '#',
    fileName: 'TechSolutions_Contract_2025.pdf',
    fileSize: '3.5 MB',
    approvalHistory: [
      {
        step: 1,
        unit: 'Procurement Department',
        handler: 'Robert Jones',
        date: new Date('2025-04-02'),
        comments: 'Contract terms verified.',
        status: 'Approved'
      },
      {
        step: 2,
        unit: 'Legal Department',
        handler: 'Lisa Brown',
        date: new Date('2025-04-04'),
        comments: 'Legal review completed. Needs revision on clause 5.3.',
        attachments: [
          { name: 'Legal_Review.pdf', url: '#', size: '0.8 MB' }
        ],
        status: 'Returned'
      }
    ],
    reference: 'CONT-2025-042'
  },
  {
    id: 'AP003',
    title: 'New Employee Onboarding - Developer Team',
    requester: 'David Miller',
    requesterUnit: 'Human Resources',
    type: 'HR Request',
    requestDate: new Date('2025-04-01'),
    dueDate: new Date('2025-04-10'),
    priority: 'Critical',
    status: 'Pending',
    description: 'Approval needed for hiring 3 new developers. Budget impact: $350,000 annually.',
    fileUrl: '#',
    fileName: 'Developer_Team_Expansion.pdf',
    fileSize: '1.8 MB',
    approvalHistory: [
      {
        step: 1,
        unit: 'Human Resources',
        handler: 'Emma Johnson',
        date: new Date('2025-04-01'),
        comments: 'Position requirements confirmed.',
        status: 'Approved'
      }
    ]
  },
  {
    id: 'AP004',
    title: 'Office Renovation Proposal',
    requester: 'Thomas Lee',
    requesterUnit: 'Facilities Management',
    type: 'Capital Expense',
    requestDate: new Date('2025-03-25'),
    dueDate: new Date('2025-04-25'),
    priority: 'Low',
    status: 'Pending',
    description: 'Proposal for renovating the 3rd floor office space. Estimated cost: $120,000.',
    fileUrl: '#',
    fileName: 'Office_Renovation_Proposal.pdf',
    fileSize: '5.2 MB',
    approvalHistory: [
      {
        step: 1,
        unit: 'Facilities Management',
        handler: 'Amanda White',
        date: new Date('2025-03-25'),
        comments: 'Proposal prepared and submitted.',
        attachments: [
          { name: 'Floor_Plan.pdf', url: '#', size: '2.1 MB' },
          { name: 'Cost_Breakdown.xlsx', url: '#', size: '1.3 MB' }
        ],
        status: 'Approved'
      }
    ]
  },
  {
    id: 'AP005',
    title: 'Annual Leave Policy Update',
    requester: 'Olivia Martinez',
    requesterUnit: 'Human Resources',
    type: 'Policy',
    requestDate: new Date('2025-03-20'),
    dueDate: new Date('2025-04-15'),
    priority: 'Medium',
    status: 'InProgress',
    description: 'Updates to the annual leave policy including new carryover rules and expanded parental leave.',
    fileUrl: '#',
    fileName: 'Annual_Leave_Policy_Update.docx',
    fileSize: '1.5 MB',
    approvalHistory: [
      {
        step: 1,
        unit: 'Human Resources',
        handler: 'James Wilson',
        date: new Date('2025-03-20'),
        comments: 'Policy drafted and reviewed internally.',
        status: 'Approved'
      },
      {
        step: 2,
        unit: 'Legal Department',
        handler: 'Patricia Clark',
        date: new Date('2025-03-30'),
        comments: 'Legal review completed with minor suggestions.',
        attachments: [
          { name: 'Legal_Review_Comments.docx', url: '#', size: '0.5 MB' }
        ],
        status: 'Approved'
      },
      {
        step: 3,
        unit: 'Executive Committee',
        handler: 'Richard Evans',
        date: new Date('2025-04-05'),
        status: 'Pending'
      }
    ]
  }
];

export const useApprovalDocuments = () => {
  const [documents, setDocuments] = useState<ApprovalDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setDocuments(mockApprovalDocuments);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch approval documents');
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return {
    documents,
    isLoading,
    error,
    updateDocumentStatus: (id: string, status: ApprovalStatus, comment?: string) => {
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === id 
            ? {
                ...doc, 
                status,
                approvalHistory: [
                  ...doc.approvalHistory,
                  {
                    step: doc.approvalHistory.length + 1,
                    unit: 'Current Department',
                    handler: 'Current User',
                    date: new Date(),
                    comments: comment || '',
                    status
                  }
                ]
              } 
            : doc
        )
      );
    }
  };
};
