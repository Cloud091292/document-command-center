
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
    'Finance',
    'HR',
    'Legal',
    'Marketing',
    'Sales'
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
          <h2 className="text-xl font-semibold mb-2">Template Permissions</h2>
          <p className="text-sm text-muted-foreground">Control who can use and edit this template</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="access-level">Access Level</Label>
            <Select
              value={formData.accessLevel}
              onValueChange={(value) => onChange({ accessLevel: value })}
            >
              <SelectTrigger id="access-level">
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organization">Organization-wide</SelectItem>
                <SelectItem value="department">Department-specific</SelectItem>
                <SelectItem value="team">Team-specific</SelectItem>
                <SelectItem value="user">User-specific</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.accessLevel === 'department' && (
            <div className="space-y-3">
              <Label>Departments with Access</Label>
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
            <Label>Edit Permissions</Label>
            <RadioGroup 
              value={formData.editPermission}
              onValueChange={(value) => onChange({ editPermission: value })}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="creator" id="edit-creator" />
                <Label htmlFor="edit-creator" className="text-sm font-normal">Creator Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="department-admins" id="edit-department-admins" />
                <Label htmlFor="edit-department-admins" className="text-sm font-normal">Department Admins</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="organization-admins" id="edit-organization-admins" />
                <Label htmlFor="edit-organization-admins" className="text-sm font-normal">Organization Admins</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};
