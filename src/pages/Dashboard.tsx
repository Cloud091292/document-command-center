
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  File,
  Download,
  Printer,
  MessageSquare,
  MoreVertical,
  ChevronDown,
  Clock,
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  Eye,
  PenTool,
  CheckSquare,
  Stamp,
  ArrowUpDown,
  ArrowDownUp,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for charts
const documentTrendData = [
  { day: '01', incoming: 4, outgoing: 3 },
  { day: '02', incoming: 3, outgoing: 2 },
  { day: '03', incoming: 5, outgoing: 4 },
  { day: '04', incoming: 7, outgoing: 6 },
  { day: '05', incoming: 6, outgoing: 4 },
  { day: '06', incoming: 8, outgoing: 5 },
  { day: '07', incoming: 9, outgoing: 7 },
  { day: '08', incoming: 7, outgoing: 8 },
  { day: '09', incoming: 11, outgoing: 9 },
  { day: '10', incoming: 10, outgoing: 7 },
  { day: '11', incoming: 13, outgoing: 11 },
  { day: '12', incoming: 12, outgoing: 10 },
  { day: '13', incoming: 15, outgoing: 12 },
  { day: '14', incoming: 14, outgoing: 13 },
];

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    action: 'Download',
    document: 'Annual Report 2024.pdf',
    user: 'John Smith',
    time: '10 minutes ago',
    icon: Download,
  },
  {
    id: 2,
    action: 'Print',
    document: 'Q1 Financial Statement.xlsx',
    user: 'Emily Johnson',
    time: '30 minutes ago',
    icon: Printer,
  },
  {
    id: 3,
    action: 'Comment',
    document: 'Marketing Plan.docx',
    user: 'Michael Brown',
    time: '1 hour ago',
    icon: MessageSquare,
  },
  {
    id: 4,
    action: 'Upload',
    document: 'Product Catalog.pdf',
    user: 'Sarah Davis',
    time: '2 hours ago',
    icon: Upload,
  },
  {
    id: 5,
    action: 'View',
    document: 'Client Contract.pdf',
    user: 'Robert Wilson',
    time: '3 hours ago',
    icon: Eye,
  },
];

// Mock data for latest documents
const latestDocuments = [
  {
    id: 1,
    name: 'Q2 Financial Report.xlsx',
    type: 'Excel',
    category: 'Financial',
    department: 'Finance',
    uploadedBy: 'John Smith',
    uploadDate: '2025-04-08',
  },
  {
    id: 2,
    name: 'Employee Handbook 2025.pdf',
    type: 'PDF',
    category: 'HR & Labor',
    department: 'HR',
    uploadedBy: 'Sarah Davis',
    uploadDate: '2025-04-07',
  },
  {
    id: 3,
    name: 'Project Proposal.docx',
    type: 'Word',
    category: 'Projects',
    department: 'Operations',
    uploadedBy: 'Michael Brown',
    uploadDate: '2025-04-07',
  },
  {
    id: 4,
    name: 'Client Agreement.pdf',
    type: 'PDF',
    category: 'Legal & Licensing',
    department: 'Legal',
    uploadedBy: 'Emily Johnson',
    uploadDate: '2025-04-06',
  },
  {
    id: 5,
    name: 'Marketing Campaign.pptx',
    type: 'PowerPoint',
    category: 'Marketing',
    department: 'Marketing',
    uploadedBy: 'Robert Wilson',
    uploadDate: '2025-04-05',
  },
];

// Mock data for pending approval documents
const pendingApproval = [
  {
    id: 1,
    name: 'Vendor Contract.pdf',
    type: 'PDF',
    category: 'Legal & Licensing',
    requestedBy: 'John Smith',
    department: 'Procurement',
    dateRequested: '2025-04-07',
    priority: 'High',
  },
  {
    id: 2,
    name: 'Budget Proposal.xlsx',
    type: 'Excel',
    category: 'Financial',
    requestedBy: 'Emily Johnson',
    department: 'Finance',
    dateRequested: '2025-04-06',
    priority: 'Medium',
  },
  {
    id: 3,
    name: 'Product Specification.docx',
    type: 'Word',
    category: 'Products & Services',
    requestedBy: 'Michael Brown',
    department: 'R&D',
    dateRequested: '2025-04-05',
    priority: 'Low',
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Documents</span>
                <span className="text-3xl font-bold">2,547</span>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Created Today</span>
                <span className="text-3xl font-bold">24</span>
              </div>
              <div className="h-12 w-12 bg-dms-success/10 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-dms-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Pending Approval</span>
                <span className="text-3xl font-bold">18</span>
              </div>
              <div className="h-12 w-12 bg-dms-warning/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-dms-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Approved Today</span>
                <span className="text-3xl font-bold">12</span>
              </div>
              <div className="h-12 w-12 bg-dms-blue/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-dms-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions performed on documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="h-9 w-9 bg-muted rounded-full flex items-center justify-center">
                    <activity.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.action} - {activity.document}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Document Trends Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Document Trends</CardTitle>
            <CardDescription>Incoming vs. outgoing documents this month</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={documentTrendData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="incoming"
                    stroke="#2563EB"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="outgoing" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Latest Documents */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Latest Uploaded Documents</CardTitle>
            <CardDescription>Recently uploaded documents to the system</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell className="font-medium flex items-center">
                      <File className="mr-2 h-4 w-4" />
                      {document.name}
                    </TableCell>
                    <TableCell>{document.type}</TableCell>
                    <TableCell>{document.category}</TableCell>
                    <TableCell>{document.department}</TableCell>
                    <TableCell>{document.uploadedBy}</TableCell>
                    <TableCell>{document.uploadDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            Print
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Comment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Pending Approval Documents */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Pending Approval</CardTitle>
            <CardDescription>Documents waiting for your approval</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date Requested</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApproval.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell className="font-medium">
                      <a href="#" className="flex items-center hover:underline">
                        <File className="mr-2 h-4 w-4" />
                        {document.name}
                      </a>
                    </TableCell>
                    <TableCell>{document.category}</TableCell>
                    <TableCell>{document.requestedBy}</TableCell>
                    <TableCell>{document.department}</TableCell>
                    <TableCell>{document.dateRequested}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          document.priority === 'High'
                            ? 'bg-dms-danger-light text-dms-danger-dark border-dms-danger-light'
                            : document.priority === 'Medium'
                            ? 'bg-dms-warning-light text-dms-warning-dark border-dms-warning-light'
                            : 'bg-dms-success-light text-dms-success-dark border-dms-success-light'
                        }
                      >
                        {document.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="default" className="h-8">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8">
                          <XCircle className="mr-1 h-3 w-3" />
                          Reject
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="h-8">
                              <span>Approval Type</span>
                              <ChevronDown className="ml-1 h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <PenTool className="mr-2 h-4 w-4" />
                              Digital Signature
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckSquare className="mr-2 h-4 w-4" />
                              Approval
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Stamp className="mr-2 h-4 w-4" />
                              Stamping
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
