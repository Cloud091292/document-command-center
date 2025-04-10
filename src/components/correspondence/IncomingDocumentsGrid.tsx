
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
