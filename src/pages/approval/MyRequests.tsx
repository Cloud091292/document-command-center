
import React from 'react';

const MyRequests = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Requests</h1>
      <p className="text-muted-foreground">View and manage your approval requests.</p>
      
      <div className="border rounded-lg p-16 text-center">
        <h2 className="text-xl font-semibold mb-2">My Requests Section</h2>
        <p className="text-muted-foreground mb-4">This section will show all your approval requests with status tracking and management options.</p>
      </div>
    </div>
  );
};

export default MyRequests;
