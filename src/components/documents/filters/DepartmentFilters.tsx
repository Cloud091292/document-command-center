
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AccordionContent } from "@/components/ui/accordion";

interface DepartmentFiltersProps {
  departments: string[];
  selectedDepartments: string[];
  onToggleDepartment: (department: string) => void;
}

export function DepartmentFilters({ departments, selectedDepartments, onToggleDepartment }: DepartmentFiltersProps) {
  return (
    <AccordionContent>
      <div className="grid grid-cols-2 gap-2">
        {departments.map((department) => (
          <div key={department} className="flex items-center space-x-2">
            <Checkbox
              id={`department-${department}`}
              checked={selectedDepartments.includes(department)}
              onCheckedChange={() => onToggleDepartment(department)}
            />
            <Label htmlFor={`department-${department}`} className="text-sm">
              {department}
            </Label>
          </div>
        ))}
      </div>
    </AccordionContent>
  );
}
