
import React from 'react';

const TrashBin = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trash Bin</h1>
      <p className="text-muted-foreground">Review and manage deleted documents.</p>
      
      <div className="border rounded-lg p-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Trash Bin Section</h2>
        <p className="text-muted-foreground mb-4">This section will show recently deleted documents with options to restore or permanently delete them.</p>
      </div>
    </div>
  );
};

export default TrashBin;
