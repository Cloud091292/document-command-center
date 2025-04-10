
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TemplateDetailsProps {
  formData: {
    name: string;
    description: string;
    category: string;
    department: string;
  };
  onChange: (data: Partial<TemplateDetailsProps['formData']>) => void;
}

export const TemplateDetails: React.FC<TemplateDetailsProps> = ({
  formData,
  onChange
}) => {
  // Mock categories and departments
  const categories = [
    'Hợp đồng & Thỏa thuận',
    'Tài liệu pháp lý & Tuân thủ',
    'Tài liệu tài chính & kế toán',
    'HR & Hồ sơ nhân viên',
    'Báo cáo hoạt động & Tài liệu dự án',
    'Mua sắm & Quản lý nhà cung cấp',
    'Tài liệu tiếp thị & bán hàng'
  ];

  const departments = [
    'Tài chính',
    'Nhân sự',
    'Pháp chế',
    'Marketing',
    'Vận hành',
    'Kinh doanh',
    'CNTT',
    'Lãnh đạo'
  ];

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Thông tin mẫu</h2>
          <p className="text-sm text-muted-foreground">Thông tin cơ bản về mẫu</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Tên mẫu</Label>
            <Input
              id="template-name"
              placeholder="Nhập tên mẫu"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-description">Mô tả</Label>
            <Textarea
              id="template-description"
              placeholder="Nhập mô tả ngắn về mẫu"
              className="min-h-[120px]"
              value={formData.description}
              onChange={(e) => onChange({ description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template-category">Danh mục</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => onChange({ category: value })}
              >
                <SelectTrigger id="template-category">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-department">Phòng ban</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => onChange({ department: value })}
              >
                <SelectTrigger id="template-department">
                  <SelectValue placeholder="Chọn phòng ban" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
