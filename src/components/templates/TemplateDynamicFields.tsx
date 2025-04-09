
import React, { useState } from 'react';
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
import { Plus, X, Edit, Trash } from 'lucide-react';

interface DynamicField {
  id: number;
  name: string;
  type: string;
  description: string;
}

interface TemplateDynamicFieldsProps {
  fields: DynamicField[];
  onChange: (fields: DynamicField[]) => void;
}

export const TemplateDynamicFields: React.FC<TemplateDynamicFieldsProps> = ({
  fields,
  onChange
}) => {
  const [isAddingField, setIsAddingField] = useState(false);
  const [editingField, setEditingField] = useState<DynamicField | null>(null);
  const [newField, setNewField] = useState<Partial<DynamicField>>({
    name: '',
    type: 'text',
    description: ''
  });

  const handleAddField = () => {
    setNewField({
      name: '',
      type: 'text',
      description: ''
    });
    setIsAddingField(true);
  };

  const handleEditField = (field: DynamicField) => {
    setEditingField(field);
    setNewField({ ...field });
    setIsAddingField(true);
  };

  const handleSaveField = () => {
    if (!newField.name || !newField.type) return;

    if (editingField) {
      // Update existing field
      onChange(
        fields.map(field => 
          field.id === editingField.id 
            ? { ...field, ...newField as DynamicField } 
            : field
        )
      );
    } else {
      // Add new field
      const id = Math.max(0, ...fields.map(f => f.id)) + 1;
      onChange([...fields, { id, ...newField as Omit<DynamicField, 'id'> } as DynamicField]);
    }

    setIsAddingField(false);
    setEditingField(null);
  };

  const handleRemoveField = (id: number) => {
    onChange(fields.filter(field => field.id !== id));
  };

  const handleCloseDialog = () => {
    setIsAddingField(false);
    setEditingField(null);
  };

  const fieldTypeLabels: Record<string, string> = {
    'text': 'Text field',
    'number': 'Numeric field',
    'date': 'Date field',
    'select': 'Selection field',
    'checkbox': 'Checkbox field'
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Dynamic Fields</h2>
          <p className="text-sm text-muted-foreground">Define dynamic fields that can be filled when using this template</p>
        </div>

        <Button onClick={handleAddField} className="mb-4">
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>

        <div className="space-y-4">
          {fields.length === 0 ? (
            <div className="text-center py-8 border rounded-md">
              <p className="text-muted-foreground">No dynamic fields defined. Click "Add Field" to create one.</p>
            </div>
          ) : (
            fields.map((field) => (
              <div key={field.id} className="border rounded-md p-4">
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
                      onClick={() => handleEditField(field)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive" 
                      onClick={() => handleRemoveField(field.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <Dialog open={isAddingField} onOpenChange={setIsAddingField}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingField ? 'Edit Field' : 'Add New Field'}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="field-name">Field Name</Label>
                <Input
                  id="field-name"
                  placeholder="e.g., Client Name"
                  value={newField.name}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="field-type">Field Type</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value) => setNewField({ ...newField, type: value })}
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
                  value={newField.description}
                  onChange={(e) => setNewField({ ...newField, description: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button onClick={handleSaveField}>
                Save Field
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
