
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface TemplatePermissionsProps {
  formData: {
    accessLevel: string;
    departments: string[];
    editPermission: string;
  };
  onChange: (data: Partial<TemplatePermissionsProps['formData']>) => void;
}

export const TemplatePermissions: React.FC<TemplatePermissionsProps> = ({
  formData,
  onChange
}) => {
  const departments = [
    'Tài chính',
    'Nhân sự',
    'Pháp chế',
    'Marketing',
    'Kinh doanh'
  ];

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      onChange({
        departments: [...formData.departments, department]
      });
    } else {
      onChange({
        departments: formData.departments.filter(d => d !== department)
      });
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Quyền mẫu</h2>
          <p className="text-sm text-muted-foreground">Kiểm soát ai có thể sử dụng và chỉnh sửa mẫu này</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="access-level">Mức độ truy cập</Label>
            <Select
              value={formData.accessLevel}
              onValueChange={(value) => onChange({ accessLevel: value })}
            >
              <SelectTrigger id="access-level">
                <SelectValue placeholder="Chọn mức độ truy cập" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organization">Toàn tổ chức</SelectItem>
                <SelectItem value="department">Theo phòng ban</SelectItem>
                <SelectItem value="team">Theo nhóm</SelectItem>
                <SelectItem value="user">Theo người dùng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.accessLevel === 'department' && (
            <div className="space-y-3">
              <Label>Phòng ban có quyền truy cập</Label>
              <div className="space-y-2">
                {departments.map((department) => (
                  <div key={department} className="flex items-center space-x-2">
                    <Checkbox
                      id={`department-${department}`}
                      checked={formData.departments.includes(department)}
                      onCheckedChange={(checked) => handleDepartmentChange(department, checked === true)}
                    />
                    <Label
                      htmlFor={`department-${department}`}
                      className="text-sm font-normal"
                    >
                      {department}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label>Quyền chỉnh sửa</Label>
            <RadioGroup 
              value={formData.editPermission}
              onValueChange={(value) => onChange({ editPermission: value })}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="creator" id="edit-creator" />
                <Label htmlFor="edit-creator" className="text-sm font-normal">Chỉ người tạo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="department-admins" id="edit-department-admins" />
                <Label htmlFor="edit-department-admins" className="text-sm font-normal">Quản trị viên phòng ban</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="organization-admins" id="edit-organization-admins" />
                <Label htmlFor="edit-organization-admins" className="text-sm font-normal">Quản trị viên tổ chức</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};
