
import { format, isAfter, isBefore } from "date-fns";

export const isApproachingDeadline = (deadline: string) => {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const daysRemaining = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  return daysRemaining <= 3 && daysRemaining >= 0;
};

export const getPriorityBadgeVariant = (priority: string) => {
  switch(priority) {
    case 'Hỏa tốc': return 'error';
    case 'Khẩn': return 'warning';
    default: return 'default';
  }
};

export const getStatusBadgeVariant = (status: string) => {
  switch(status) {
    case 'Đã gửi': return 'success';
    case 'Đang xử lý': return 'info';
    case 'Chờ phê duyệt': return 'warning';
    case 'Đã huỷ': return 'destructive';
    default: return 'secondary';
  }
};
