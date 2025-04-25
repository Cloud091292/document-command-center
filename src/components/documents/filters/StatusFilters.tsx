
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AccordionContent } from "@/components/ui/accordion";

interface StatusFiltersProps {
  statuses: string[];
  selectedStatuses: string[];
  onToggleStatus: (status: string) => void;
}

export function StatusFilters({ statuses, selectedStatuses, onToggleStatus }: StatusFiltersProps) {
  return (
    <AccordionContent>
      <div className="grid grid-cols-2 gap-2">
        {statuses.map((status) => (
          <div key={status} className="flex items-center space-x-2">
            <Checkbox
              id={`status-${status}`}
              checked={selectedStatuses.includes(status)}
              onCheckedChange={() => onToggleStatus(status)}
            />
            <Label htmlFor={`status-${status}`} className="text-sm">
              {status}
            </Label>
          </div>
        ))}
      </div>
    </AccordionContent>
  );
}
