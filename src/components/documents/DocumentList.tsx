
import React from 'react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Folder as FolderIcon, 
  Download, 
  Printer, 
  Share, 
  Bookmark, 
  BookmarkCheck,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { Folder, DocumentFile } from '@/types/document';

interface DocumentListProps {
  folders: Folder[];
  files: DocumentFile[];
  onFolderClick: (folder: Folder) => void;
  onToggleBookmark: (fileId: string) => void;
  isTrash?: boolean;
  onRestore?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DocumentList({ 
  folders, 
  files, 
  onFolderClick, 
  onToggleBookmark,
  isTrash,
  onRestore,
  onDelete
}: DocumentListProps) {
  // Function to get file type badge
  const getFileTypeBadge = (type: string) => {
    switch (type) {
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
        return <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded">{type.toUpperCase()}</span>;
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Tên</TableHead>
            <TableHead>Dung lượng</TableHead>
            <TableHead>Cập nhật lần cuối</TableHead>
            <TableHead>Người tạo</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {folders.length === 0 && files.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-muted p-3 mb-2">
                    <FolderIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Không có tài liệu nào</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {folders.map((folder) => (
                <TableRow 
                  key={folder.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onFolderClick(folder)}
                >
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center mr-3">
                        <FolderIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{folder.name}</div>
                        <div className="text-xs text-muted-foreground">{folder.itemCount} mục</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>--</TableCell>
                  <TableCell>--</TableCell>
                  <TableCell>--</TableCell>
                  <TableCell className="text-right">
                    {isTrash && onRestore && onDelete && (
                      <div className="flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onRestore(folder.id);
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
                            onDelete(folder.id);
                          }}
                          className="h-8 w-8 p-0 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Xóa vĩnh viễn</span>
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              
              {files.map((file) => (
                <TableRow key={file.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center mr-3">
                        <FileText className={`h-5 w-5 ${
                          file.type === 'pdf' ? 'text-red-500' : 
                          file.type === 'docx' ? 'text-blue-500' :
                          file.type === 'xlsx' ? 'text-green-500' :
                          file.type === 'jpg' || file.type === 'png' ? 'text-purple-500' :
                          'text-gray-500'
                        }`} />
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {file.name}
                          {getFileTypeBadge(file.type)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{format(file.updatedAt, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{file.createdBy}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      {isTrash && onRestore && onDelete ? (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onRestore(file.id);
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
                              onDelete(file.id);
                            }}
                            className="h-8 w-8 p-0 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Xóa vĩnh viễn</span>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(file.id);
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
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
