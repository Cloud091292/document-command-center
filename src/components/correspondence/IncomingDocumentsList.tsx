
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DocumentItem, DocumentStatus } from "@/hooks/useDocuments";

interface IncomingDocumentsListProps {
  documents: DocumentItem[];
  isLoading: boolean;
  onViewDocument: (document: DocumentItem) => void;
}

export const IncomingDocumentsList: React.FC<IncomingDocumentsListProps> = ({
  documents,
  isLoading,
  onViewDocument,
}) => {
  if (isLoading) {
    return <div className="flex justify-center p-8">Đang tải tài liệu...</div>;
  }

  if (documents.length === 0) {
    return <div className="text-center p-8">Không tìm thấy tài liệu.</div>;
  }

  // Helper function to determine badge color based on status
  const getStatusBadgeClass = (status: DocumentStatus) => {
    switch (status) {
      case 'Chưa hoàn trả':
      case 'Tiếp nhận':
        return "bg-yellow-100 text-yellow-800";
      case 'Hiệu lực':
      case 'Đã hoàn trả':
        return "bg-green-100 text-green-800";
      case 'Hết hiệu lực':
      case 'Hủy bỏ':
      case 'Khoanh nợ hồ sơ':
        return "bg-red-100 text-red-800";
      case 'Cho mượn':
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to get status display text
  const getStatusDisplayText = (status: DocumentStatus) => {
    switch (status) {
      case 'Chưa hoàn trả':
        return "Đang chờ";
      case 'Đã hoàn trả':
        return "Đã xử lý";
      case 'Cho mượn':
        return "Đã chuyển tiếp";
      default:
        return status;
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Phân loại</TableHead>
            <TableHead>Người gửi</TableHead>
            <TableHead>Ngày nhận</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Mã tham chiếu</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell className="font-medium">{document.title}</TableCell>
              <TableCell>{document.classification}</TableCell>
              <TableCell>{document.sender}</TableCell>
              <TableCell>{format(document.dateReceived, "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <Badge className={getStatusBadgeClass(document.status)}>
                  {getStatusDisplayText(document.status)}
                </Badge>
              </TableCell>
              <TableCell>{document.referenceCode}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="ghost" onClick={() => onViewDocument(document)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Send className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <a href={document.fileUrl} download>
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
