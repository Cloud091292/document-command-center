
import React from 'react';
import { DocumentCard } from './DocumentCard';
import { FolderCard } from './FolderCard';
import { DocumentList } from './DocumentList';
import { DocumentEmptyState } from './DocumentEmptyState';
import { Folder, DocumentFile, ViewMode } from '@/types/document';

interface DocumentContentProps {
  viewMode: ViewMode;
  folders: Folder[];
  files: DocumentFile[];
  initialView: 'library' | 'bookmarks' | 'trash';
  onFolderClick: (folder: Folder) => void;
  onToggleBookmark: (id: string) => void;
  onRestore?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DocumentContent({
  viewMode,
  folders,
  files,
  initialView,
  onFolderClick,
  onToggleBookmark,
  onRestore,
  onDelete
}: DocumentContentProps) {
  if (folders.length === 0 && files.length === 0) {
    return <DocumentEmptyState view={initialView} />;
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map(folder => (
          <FolderCard 
            key={folder.id} 
            folder={folder} 
            onClick={() => onFolderClick(folder)}
            isTrash={initialView === 'trash'}
            onRestore={initialView === 'trash' ? () => onRestore?.(folder.id) : undefined}
            onDelete={initialView === 'trash' ? () => onDelete?.(folder.id) : undefined}
          />
        ))}
        {files.map(file => (
          <DocumentCard 
            key={file.id}
            file={file}
            onToggleBookmark={() => onToggleBookmark(file.id)}
            isTrash={initialView === 'trash'}
            onRestore={initialView === 'trash' ? () => onRestore?.(file.id) : undefined}
            onDelete={initialView === 'trash' ? () => onDelete?.(file.id) : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <DocumentList
      folders={folders}
      files={files}
      onFolderClick={onFolderClick}
      onToggleBookmark={onToggleBookmark}
      isTrash={initialView === 'trash'}
      onRestore={initialView === 'trash' ? onRestore : undefined}
      onDelete={initialView === 'trash' ? onDelete : undefined}
    />
  );
}
