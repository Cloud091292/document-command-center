
import React from 'react';
import { DocumentFile } from '@/types/document';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Printer, 
  Share, 
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';

interface DocumentCardProps {
  file: DocumentFile;
  onToggleBookmark: () => void;
  isTrash?: boolean;
  onRestore?: () => void;
  onDelete?: () => void;
}

export function DocumentCard({ file, onToggleBookmark, isTrash, onRestore, onDelete }: DocumentCardProps) {
  // Function to determine file icon based on type
  const getFileIcon = () => {
    switch (file.type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'docx':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'xlsx':
        return <FileText className="h-6 w-6 text-green-500" />;
      case 'jpg':
      case 'png':
        return <FileText className="h-6 w-6 text-purple-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  // Function to get file type badge
  const getFileTypeBadge = () => {
    switch (file.type) {
      case 'pdf':
        return <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-800 rounded">PDF</span>;
      case 'docx':
        return <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">DOCX</span>;
      case 'xlsx':
        return <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded">XLSX</span>;
      case 'jpg':
        return <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded">JPG</span>;
      case 'png':
        return <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded">PNG</span>;
      default:
        return <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded">{file.type.toUpperCase()}</span>;
    }
  };

  return (
    <Card className={`hover:border-primary/50 transition-all group ${isTrash ? 'bg-muted/30' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center mr-3">
              {getFileIcon()}
            </div>
            <div>
              <h3 className="font-medium text-sm line-clamp-1">{file.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {getFileTypeBadge()}
                <span className="text-xs text-muted-foreground">{file.size}</span>
              </div>
            </div>
          </div>
          
          {!isTrash && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark();
              }}
              className="h-8 w-8 p-0"
            >
              {file.bookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              <span className="sr-only">
                {file.bookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
              </span>
            </Button>
          )}
        </div>
        
        <div className="mt-3 text-xs">
          <div className="flex justify-between text-muted-foreground mb-1">
            <span>Cập nhật:</span>
            <span>{format(file.updatedAt, 'dd/MM/yyyy')}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Người tạo:</span>
            <span>{file.createdBy}</span>
          </div>
        </div>
        
        {isTrash && onRestore && onDelete ? (
          <div className="flex justify-end mt-3 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onRestore();
              }}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="sr-only">Khôi phục</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="h-8 w-8 p-0 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Xóa vĩnh viễn</span>
            </Button>
          </div>
        ) : (
          <div className="flex justify-end mt-3 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
            >
              <Download className="h-4 w-4" />
              <span className="sr-only">Tải xuống</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
            >
              <Printer className="h-4 w-4" />
              <span className="sr-only">In</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
            >
              <Share className="h-4 w-4" />
              <span className="sr-only">Chia sẻ</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
