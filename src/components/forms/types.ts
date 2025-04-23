
export interface Form {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string; // 'Đang sử dụng' | 'Sắp hết hạn' | 'Hết hiệu lực'
  version: string;
  author: string;
  effectiveFrom: string;
  effectiveTo: string;
  updatedAt: string;
  isFavorite: boolean;
}
