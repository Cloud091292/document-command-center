
import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-8 border rounded-md">
      <p className="text-muted-foreground">No dynamic fields defined. Click "Add Field" to create one.</p>
    </div>
  );
};
