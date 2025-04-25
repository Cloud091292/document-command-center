
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AccordionContent } from "@/components/ui/accordion";

interface FileTypeFiltersProps {
  fileTypes: string[];
  selectedFileTypes: string[];
  onToggleFileType: (fileType: string) => void;
}

export function FileTypeFilters({ fileTypes, selectedFileTypes, onToggleFileType }: FileTypeFiltersProps) {
  return (
    <AccordionContent>
      <div className="grid grid-cols-2 gap-2">
        {fileTypes.map((fileType) => (
          <div key={fileType} className="flex items-center space-x-2">
            <Checkbox
              id={`fileType-${fileType}`}
              checked={selectedFileTypes.includes(fileType)}
              onCheckedChange={() => onToggleFileType(fileType)}
            />
            <Label htmlFor={`fileType-${fileType}`} className="text-sm">
              {fileType.toUpperCase()}
            </Label>
          </div>
        ))}
      </div>
    </AccordionContent>
  );
}
