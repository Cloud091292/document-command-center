
import { useState } from 'react';
import { toast } from 'sonner';

interface DocumentUploadOptions {
  name: string;
  file: File;
  metadata: Record<string, any>;
}

export const useDocumentUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadDocument = async (options: DocumentUploadOptions) => {
    try {
      setIsUploading(true);
      
      // TODO: Implement actual file upload logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      
      toast.success("Tài liệu đã được tải lên thành công");
      return true;
    } catch (error) {
      toast.error("Không thể tải lên tài liệu. Vui lòng thử lại");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadDocument
  };
};
