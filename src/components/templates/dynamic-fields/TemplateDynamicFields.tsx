
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FieldDialog } from './FieldDialog';
import { FieldItem } from './FieldItem';
import { EmptyState } from './EmptyState';
import { DynamicField } from './types';

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
            <EmptyState />
          ) : (
            fields.map((field) => (
              <FieldItem
                key={field.id}
                field={field}
                onEdit={handleEditField}
                onRemove={handleRemoveField}
              />
            ))
          )}
        </div>

        <FieldDialog
          open={isAddingField}
          onOpenChange={setIsAddingField}
          field={newField}
          onFieldChange={setNewField}
          onSave={handleSaveField}
          isEditing={!!editingField}
        />
      </div>
    </div>
  );
};
