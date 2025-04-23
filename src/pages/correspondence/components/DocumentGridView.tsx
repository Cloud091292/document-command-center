
import React from 'react';
import { format } from 'date-fns';
import { Clock, Download, Eye, FileText, Send } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OutgoingDocument } from '../types/documents';
import { isApproachingDeadline, getStatusBadgeVariant, getPriorityBadgeVariant } from '../utils/documentUtils';

interface DocumentGridViewProps {
  documents: OutgoingDocument[];
  onViewDocument: (document: OutgoingDocument) => void;
}

export function DocumentGridView({ documents, onViewDocument }: DocumentGridViewProps) {
  if (documents.length === 0) {
    return (
      <div className="col-span-full border rounded-md p-8 text-center">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium mb-1">Không tìm thấy công văn</h3>
        <p className="text-muted-foreground">Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm khác</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <div 
          key={doc.id} 
          className="border rounded-md p-4 hover:border-primary/50 hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => onViewDocument(doc)}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="font-medium">{doc.title}</h3>
              {isApproachingDeadline(doc.deadline) && (
                <Clock className="h-4 w-4 text-amber-500 ml-2" />
              )}
            </div>
            <Badge variant={getStatusBadgeVariant(doc.status)}>{doc.status}</Badge>
          </div>
          
          <div className="flex items-center justify-between my-2">
            <Badge variant="outline" className="text-xs">{doc.classification}</Badge>
            <Badge variant={getPriorityBadgeVariant(doc.priority)}>{doc.priority}</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mt-2">
            <div>
              <p><strong>Số công văn:</strong></p>
              <p>{doc.referenceCode}</p>
            </div>
            <div>
              <p><strong>Đơn vị nhận:</strong></p>
              <p>{doc.destinationUnit}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mt-2">
            <div>
              <p><strong>Ngày ban hành:</strong></p>
              <p>{format(new Date(doc.dateSent), 'dd/MM/yyyy')}</p>
            </div>
            <div>
              <p><strong>Hạn xử lý:</strong></p>
              <p>{format(new Date(doc.deadline), 'dd/MM/yyyy')}</p>
            </div>
          </div>
          
          <div className="mt-3 pt-2 border-t flex justify-end space-x-2">
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
