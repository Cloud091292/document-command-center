
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DocumentItem } from "@/hooks/useDocuments";

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
                <Badge
                  className={
                    document.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : document.status === "Processed"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }
                >
                  {document.status === "Pending" ? "Đang chờ" : 
                   document.status === "Processed" ? "Đã xử lý" : "Đã chuyển tiếp"}
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
