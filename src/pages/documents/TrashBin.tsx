
import React from 'react';

const TrashBin = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Thùng rác</h1>
      <p className="text-muted-foreground">Xem lại và quản lý các tài liệu đã xóa.</p>
      
      <div className="border rounded-lg p-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Phần thùng rác</h2>
        <p className="text-muted-foreground mb-4">Phần này sẽ hiển thị các tài liệu đã xóa gần đây với các tùy chọn để khôi phục hoặc xóa vĩnh viễn.</p>
      </div>
    </div>
  );
};

export default TrashBin;
