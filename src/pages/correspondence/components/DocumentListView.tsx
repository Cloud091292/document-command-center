
import React from 'react';
import { format } from 'date-fns';
import { Clock, Download, Eye, Send } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { OutgoingDocument } from '../types/documents';
import { isApproachingDeadline, getStatusBadgeVariant, getPriorityBadgeVariant } from '../utils/documentUtils';

interface DocumentListViewProps {
  documents: OutgoingDocument[];
  onViewDocument: (document: OutgoingDocument) => void;
}

export function DocumentListView({ documents, onViewDocument }: DocumentListViewProps) {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trích yếu</TableHead>
            <TableHead>Số công văn</TableHead>
            <TableHead>Loại văn bản</TableHead>
            <TableHead>Đơn vị nhận</TableHead>
            <TableHead>Ngày ban hành</TableHead>
            <TableHead>Hạn xử lý</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ưu tiên</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length > 0 ? (
            documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {doc.title}
                    {isApproachingDeadline(doc.deadline) && (
                      <Clock className="h-4 w-4 text-amber-500 ml-2" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{doc.referenceCode}</TableCell>
                <TableCell>{doc.classification}</TableCell>
                <TableCell>{doc.destinationUnit}</TableCell>
                <TableCell>{format(new Date(doc.dateSent), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{format(new Date(doc.deadline), 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(doc.status)}>{doc.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityBadgeVariant(doc.priority)}>{doc.priority}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onViewDocument(doc)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-6">
                Không tìm thấy công văn nào phù hợp với điều kiện tìm kiếm
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
