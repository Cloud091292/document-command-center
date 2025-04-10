
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DynamicField } from './types';

interface FieldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  field: Partial<DynamicField>;
  onFieldChange: (field: Partial<DynamicField>) => void;
  onSave: () => void;
  isEditing: boolean;
}

export const FieldDialog: React.FC<FieldDialogProps> = ({
  open,
  onOpenChange,
  field,
  onFieldChange,
  onSave,
  isEditing
}) => {
  const handleCloseDialog = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Field' : 'Add New Field'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="field-name">Field Name</Label>
            <Input
              id="field-name"
              placeholder="e.g., Client Name"
              value={field.name}
              onChange={(e) => onFieldChange({ ...field, name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="field-type">Field Type</Label>
            <Select
              value={field.type}
              onValueChange={(value) => onFieldChange({ ...field, type: value })}
            >
              <SelectTrigger id="field-type">
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="select">Dropdown</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="field-description">Description</Label>
            <Input
              id="field-description"
              placeholder="e.g., Field for client name"
              value={field.description}
              onChange={(e) => onFieldChange({ ...field, description: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Field
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
