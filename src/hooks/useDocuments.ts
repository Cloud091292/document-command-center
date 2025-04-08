
import { useState, useEffect } from 'react';

// Mock document data
const mockDocuments = [
  {
    id: '1',
    title: 'Budget Proposal 2025',
    description: 'Annual budget proposal for fiscal year 2025 requiring review and approval.',
    classification: 'Financial',
    sender: 'Finance Department',
    dateReceived: new Date('2024-04-05'),
    status: 'Pending' as const,
    referenceCode: 'FIN-2025-001',
    fileUrl: '#',
    fileType: 'pdf',
    department: 'Finance',
  },
  {
    id: '2',
    title: 'Employee Handbook Update',
    description: 'Updated employee handbook with new policies on remote work and benefits.',
    classification: 'HR',
    sender: 'Human Resources',
    dateReceived: new Date('2024-04-03'),
    status: 'Processed' as const,
    referenceCode: 'HR-2024-045',
    fileUrl: '#',
    fileType: 'docx',
    department: 'Human Resources',
  },
  {
    id: '3',
    title: 'Vendor Agreement - Tech Solutions Inc',
    description: 'Service level agreement with Tech Solutions for IT support services.',
    classification: 'Legal',
    sender: 'Tech Solutions Inc.',
    dateReceived: new Date('2024-04-02'),
    status: 'Forwarded' as const,
    referenceCode: 'LEG-2024-032',
    fileUrl: '#',
    fileType: 'pdf',
    department: 'Legal',
  },
  {
    id: '4',
    title: 'Marketing Campaign Proposal',
    description: 'Q2 marketing campaign proposal for product launch.',
    classification: 'Marketing',
    sender: 'Marketing Department',
    dateReceived: new Date('2024-04-01'),
    status: 'Pending' as const,
    referenceCode: 'MKT-2024-012',
    fileUrl: '#',
    fileType: 'pptx',
    department: 'Marketing',
  },
  {
    id: '5',
    title: 'Safety Compliance Report',
    description: 'Quarterly safety compliance report for manufacturing facilities.',
    classification: 'Operations',
    sender: 'Operations Department',
    dateReceived: new Date('2024-03-28'),
    status: 'Processed' as const,
    referenceCode: 'OPS-2024-089',
    fileUrl: '#',
    fileType: 'xlsx',
    department: 'Operations',
  },
  {
    id: '6',
    title: 'Project Timeline Update',
    description: 'Updated timeline for the ERP implementation project.',
    classification: 'Project',
    sender: 'Project Management Office',
    dateReceived: new Date('2024-03-25'),
    status: 'Pending' as const,
    referenceCode: 'PMO-2024-054',
    fileUrl: '#',
    fileType: 'xlsx',
    department: 'IT',
  },
];

type DocumentType = 'incoming' | 'outgoing' | 'all';

export type Document = typeof mockDocuments[0];

export const useDocuments = (type: DocumentType = 'all') => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setDocuments(mockDocuments);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch documents');
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [type]);

  return {
    documents,
    isLoading,
    error,
  };
};
