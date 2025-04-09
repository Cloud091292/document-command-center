
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';

interface TemplateContentProps {
  formData: {
    type: string;
    content: string;
  };
  onChange: (data: Partial<TemplateContentProps['formData']>) => void;
}

export const TemplateContent: React.FC<TemplateContentProps> = ({
  formData,
  onChange
}) => {
  const handleUpload = () => {
    // In a real implementation, this would open a file picker
    onChange({ type: 'upload' });
  };

  const handleStartFromScratch = () => {
    onChange({ type: 'scratch' });
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Template Content</h2>
          <p className="text-sm text-muted-foreground">Create the content of your template</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <Button 
              variant={formData.type === 'upload' ? 'default' : 'outline'} 
              onClick={handleUpload}
              className="flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
            <Button 
              variant={formData.type === 'scratch' ? 'default' : 'outline'} 
              onClick={handleStartFromScratch}
              className="flex items-center"
            >
              <FileText className="h-4 w-4 mr-2" />
              Start from Scratch
            </Button>
          </div>

          <div className="mt-8 border rounded-md p-12 flex flex-col items-center justify-center">
            {formData.content ? (
              <div className="w-full">
                {/* This would be a document viewer or editor in a real implementation */}
                <p className="text-sm">Document content preview would appear here</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-6">
                  <FileText className="h-16 w-16 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Content Yet</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Upload a document or start from scratch to create your template
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" disabled={!formData.content}>
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
