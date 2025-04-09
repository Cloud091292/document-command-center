import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Download, File, Printer, Send, Share2 } from "lucide-react";
import { format } from "date-fns";
import { Document as DocumentType } from "@/hooks/useDocuments";

interface DocumentDetailViewProps {
  document: DocumentType;
  onClose: () => void;
}

export const DocumentDetailView: React.FC<DocumentDetailViewProps> = ({
  document,
  onClose,
}) => {
  const handleForward = () => {
    console.log("Forward document:", document.id);
    // Implement forward functionality
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      {/* Document Preview */}
      <div className="flex-1 mb-4 overflow-hidden rounded-md border bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <File className="mx-auto h-16 w-16 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Document preview not available
          </p>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
              Open Document
            </a>
          </Button>
        </div>
      </div>

      {/* Document Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{document.title}</h3>
          <p className="text-sm text-muted-foreground">
            Received on {format(document.dateReceived, "MMMM d, yyyy")}
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge
              className={
                document.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : document.status === "Processed"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }
            >
              {document.status}
            </Badge>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Classification</span>
            <span className="text-sm font-medium">{document.classification}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Sender</span>
            <span className="text-sm font-medium">{document.sender}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Department</span>
            <span className="text-sm font-medium">{document.department || 'Unassigned'}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Reference Code</span>
            <span className="text-sm font-medium">{document.referenceCode}</span>
          </div>
        </div>
        
        {document.description && (
          <>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{document.description}</p>
            </div>
          </>
        )}

        <Separator />
        
        {/* Action Buttons */}
        <div className="flex justify-between gap-2">
          <Button 
            className="flex-1" 
            variant="default"
            onClick={handleForward}
          >
            <Send className="h-4 w-4 mr-2" /> Forward
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" asChild>
              <a href={document.fileUrl} download>
                <Download className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
