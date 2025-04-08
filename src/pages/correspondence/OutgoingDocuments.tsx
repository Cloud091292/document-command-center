
import React from 'react';

const OutgoingDocuments = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Outgoing Documents</h1>
      <p className="text-muted-foreground">Manage outgoing correspondence and documents.</p>
      
      <div className="border rounded-lg p-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Outgoing Documents Section</h2>
        <p className="text-muted-foreground mb-4">This section will handle all outgoing documents with creation, classification and sending options.</p>
      </div>
    </div>
  );
};

export default OutgoingDocuments;
