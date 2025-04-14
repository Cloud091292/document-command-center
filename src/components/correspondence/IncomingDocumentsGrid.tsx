
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, File, Send } from "lucide-react";
import { format } from "date-fns";
import { DocumentItem } from "@/hooks/useDocuments";

interface IncomingDocumentsGridProps {
  documents: DocumentItem[];
  isLoading: boolean;
  onViewDocument: (document: DocumentItem) => void;
}

export const IncomingDocumentsGrid: React.FC<IncomingDocumentsGridProps> = ({
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
  const getStatusBadgeClass = (status: string) => {
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
  const getStatusDisplayText = (status: string) => {
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

  const groupedByDepartment = documents.reduce((acc, doc) => {
    const department = doc.department || 'Chưa phân loại';
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(doc);
    return acc;
  }, {} as Record<string, DocumentItem[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedByDepartment).map(([department, docs]) => (
        <div key={department} className="space-y-4">
          <h3 className="text-lg font-medium">{department}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {docs.map((document) => (
              <Card key={document.id} className="overflow-hidden">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <File className="h-20 w-20 text-gray-400" />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium truncate" title={document.title}>
                      {document.title}
                    </h4>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{document.sender}</span>
                      <span>{format(document.dateReceived, "MMM dd, yyyy")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="text-xs">{document.classification}</Badge>
                      <Badge className={getStatusBadgeClass(document.status)}>
                        {getStatusDisplayText(document.status)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button size="sm" variant="outline" onClick={() => onViewDocument(document)}>
                    <Eye className="h-4 w-4 mr-1" /> Xem
                  </Button>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={document.fileUrl} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
