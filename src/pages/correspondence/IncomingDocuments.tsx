
import React from 'react';

const IncomingDocuments = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Incoming Documents</h1>
      <p className="text-muted-foreground">Manage incoming correspondence and documents.</p>
      
      <div className="border rounded-lg p-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Incoming Documents Section</h2>
        <p className="text-muted-foreground mb-4">This section will handle all incoming documents with upload, classification and forwarding options.</p>
      </div>
    </div>
  );
};

export default IncomingDocuments;
