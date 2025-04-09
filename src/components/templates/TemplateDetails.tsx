
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
    'Contracts & Agreements',
    'Legal & Compliance Documents',
    'Financial & Accounting Documents',
    'HR & Employee Records',
    'Operational Reports & Project Documentation',
    'Procurement & Vendor Management',
    'Marketing & Sales Materials'
  ];

  const departments = [
    'Finance',
    'HR',
    'Legal',
    'Marketing',
    'Operations',
    'Sales',
    'IT',
    'Executive'
  ];

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Template Information</h2>
          <p className="text-sm text-muted-foreground">Basic information about the template</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              placeholder="Enter template name"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-description">Description</Label>
            <Textarea
              id="template-description"
              placeholder="Enter a brief description of the template"
              className="min-h-[120px]"
              value={formData.description}
              onChange={(e) => onChange({ description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template-category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => onChange({ category: value })}
              >
                <SelectTrigger id="template-category">
                  <SelectValue placeholder="Select category" />
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
              <Label htmlFor="template-department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => onChange({ department: value })}
              >
                <SelectTrigger id="template-department">
                  <SelectValue placeholder="Select department" />
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
