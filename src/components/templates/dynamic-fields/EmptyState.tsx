
import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-8 border rounded-md">
      <p className="text-muted-foreground">Không có trường động được định nghĩa. Nhấp vào "Thêm trường" để tạo một trường.</p>
    </div>
  );
};
