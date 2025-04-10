
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TemplateDetails } from './TemplateDetails';
import { TemplateContent } from './TemplateContent';
import { TemplateDynamicFields } from './dynamic-fields';
import { TemplatePermissions } from './TemplatePermissions';
import { ChevronLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTemplateCreated: () => void;
  templateId?: string;
}

export const TemplateDialog: React.FC<TemplateDialogProps> = ({
  open,
  onOpenChange,
  onTemplateCreated,
  templateId
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    details: {
      name: '',
      description: '',
      category: '',
      department: ''
    },
    content: {
      type: 'upload', // or 'scratch'
      content: ''
    },
    dynamicFields: [
      { id: 1, name: 'Tên khách hàng', type: 'text', description: 'Trường văn bản cho tên khách hàng' },
      { id: 2, name: 'Giá trị hợp đồng', type: 'number', description: 'Trường số cho giá trị hợp đồng' },
      { id: 3, name: 'Ngày bắt đầu', type: 'date', description: 'Trường ngày cho ngày bắt đầu hợp đồng' }
    ],
    permissions: {
      accessLevel: 'department',
      departments: ['Tài chính'],
      editPermission: 'creator'
    }
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // API call would go here in a real implementation
      console.log('Saving template:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onTemplateCreated();
      toast({
        title: "Thành công",
        description: "Mẫu đã được lưu thành công.",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu mẫu. Vui lòng thử lại.",
        variant: "destructive",
      });
      console.error('Error saving template:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const updateFormData = (section: keyof typeof formData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center">
            <Button
              variant="ghost" 
              size="icon" 
              onClick={handleCancel} 
              className="mr-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <SheetTitle>Tạo mẫu</SheetTitle>
          </div>
        </SheetHeader>
        
        <Tabs 
          defaultValue="details" 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="flex-1 flex flex-col"
        >
          <div className="border-b px-6">
            <TabsList className="bg-transparent h-auto p-0 justify-start space-x-6">
              <TabsTrigger 
                value="details" 
                className="py-3 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none"
              >
                Thông tin mẫu
              </TabsTrigger>
              
              <TabsTrigger 
                value="content" 
                className="py-3 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none"
              >
                Nội dung mẫu
              </TabsTrigger>
              
              <TabsTrigger 
                value="fields" 
                className="py-3 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none"
              >
                Trường động
              </TabsTrigger>
              
              <TabsTrigger 
                value="permissions" 
                className="py-3 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none"
              >
                Quyền
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-auto">
            <TabsContent value="details" className="mt-0 p-0 h-full">
              <TemplateDetails 
                formData={formData.details} 
                onChange={(data) => updateFormData('details', data)} 
              />
            </TabsContent>
            
            <TabsContent value="content" className="mt-0 p-0 h-full">
              <TemplateContent 
                formData={formData.content} 
                onChange={(data) => updateFormData('content', data)} 
              />
            </TabsContent>
            
            <TabsContent value="fields" className="mt-0 p-0 h-full">
              <TemplateDynamicFields 
                fields={formData.dynamicFields} 
                onChange={(fields) => setFormData(prev => ({ ...prev, dynamicFields: fields }))} 
              />
            </TabsContent>
            
            <TabsContent value="permissions" className="mt-0 p-0 h-full">
              <TemplatePermissions 
                formData={formData.permissions} 
                onChange={(data) => updateFormData('permissions', data)} 
              />
            </TabsContent>
          </div>
        </Tabs>
        
        <div className="border-t p-4 flex justify-end gap-2 mt-auto">
          <Button variant="outline" onClick={handleCancel}>
            Hủy
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Đang lưu..." : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Lưu mẫu
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
