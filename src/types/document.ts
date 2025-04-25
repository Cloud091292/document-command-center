
export interface DocumentFile {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'jpg' | 'png' | 'txt' | 'other';
  size: string;
  updatedAt: Date;
  createdBy: string;
  path: string[];
  bookmarked: boolean;
}

export interface Folder {
  id: string;
  name: string;
  itemCount: number;
  subfolders: Folder[];
  files: DocumentFile[];
  path: string[];
}

export interface DocumentSection {
  id: string;
  name: string;
  folders: Folder[];
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';
export type DocumentType = 'operational' | 'customer';
