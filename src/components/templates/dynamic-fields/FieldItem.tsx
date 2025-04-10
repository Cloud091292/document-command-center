
import React from 'react';
import { Button } from '@/components/ui/button';
import { DynamicField, fieldTypeLabels } from './types';

interface FieldItemProps {
  field: DynamicField;
  onEdit: (field: DynamicField) => void;
  onRemove: (id: number) => void;
}

export const FieldItem: React.FC<FieldItemProps> = ({
  field,
  onEdit,
  onRemove
}) => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{field.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {fieldTypeLabels[field.type]} for {field.description.toLowerCase()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(field)}
          >
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-destructive hover:text-destructive" 
            onClick={() => onRemove(field.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};
