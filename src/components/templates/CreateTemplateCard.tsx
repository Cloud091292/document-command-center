
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CreateTemplateCardProps {
  onClick: () => void;
}

export const CreateTemplateCard: React.FC<CreateTemplateCardProps> = ({ onClick }) => {
  return (
    <Card className="overflow-hidden flex flex-col justify-center items-center text-center p-10">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Plus className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Tạo mẫu mới</h3>
      <p className="text-sm text-muted-foreground mb-6">Tạo mẫu tài liệu tùy chỉnh cho tổ chức của bạn</p>
      <Button onClick={onClick} className="mt-auto">Tạo mẫu</Button>
    </Card>
  );
};
