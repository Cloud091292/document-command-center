import React from 'react';
import { format } from 'date-fns';
import { Clock, Download, FileText, Send } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { OutgoingDocument } from '../types/documents';
import { isApproachingDeadline, getStatusBadgeVariant, getPriorityBadgeVariant } from '../utils/documentUtils';

interface DocumentDetailSheetProps {
  document: OutgoingDocument | null;
  onClose: () => void;
}

export function DocumentDetailSheet({ document, onClose }: DocumentDetailSheetProps) {
  if (!document) return null;

  return (
    <Sheet open={!!document} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <span>{document.title}</span>
            <Badge variant={getPriorityBadgeVariant(document.priority)}>
              {document.priority}
            </Badge>
          </SheetTitle>
          <SheetDescription>
            Số công văn: {document.referenceCode} | Số nội bộ: {document.internalNumber}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="border rounded-md p-6 bg-muted/30 flex items-center justify-center min-h-[300px]">
            <FileText className="h-16 w-16 text-muted-foreground" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Loại văn bản</h4>
              <p className="text-sm text-muted-foreground">{document.classification}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Trạng thái</h4>
              <Badge variant={getStatusBadgeVariant(document.status)}>
                {document.status}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Đơn vị nhận</h4>
              <p className="text-sm text-muted-foreground">{document.destinationUnit}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Ngày ban hành</h4>
              <p className="text-sm text-muted-foreground">
                {format(new Date(document.dateSent), 'dd/MM/yyyy')}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Hạn xử lý</h4>
              <div className="flex items-center">
                <p className="text-sm text-muted-foreground">
                  {format(new Date(document.deadline), 'dd/MM/yyyy')}
                </p>
                {isApproachingDeadline(document.deadline) && (
                  <Clock className="h-4 w-4 text-amber-500 ml-2" />
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Trạng thái phát hành</h4>
              <p className="text-sm text-muted-foreground">{document.releaseStatus}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Luồng xử lý</h4>
            <div className="relative pl-6 border-l border-dashed border-muted-foreground/50 space-y-4">
              <div className="relative">
                <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">Tạo công văn</p>
                  <p className="text-xs text-muted-foreground">Nguyễn Văn A - 01/04/2025 08:30</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">Phê duyệt công văn</p>
                  <p className="text-xs text-muted-foreground">Trần Thị B - 01/04/2025 10:15</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">Phát hành</p>
                  <p className="text-xs text-muted-foreground">Lê Văn C - 01/04/2025 14:30</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4 flex justify-between">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Tải xuống
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <Send className="h-4 w-4 mr-2" />
                Chuyển tiếp
              </Button>
              <Button>
                Giao việc
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
