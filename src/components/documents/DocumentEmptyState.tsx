
import React from 'react';

interface DocumentEmptyStateProps {
  view: 'library' | 'bookmarks' | 'trash';
}

export function DocumentEmptyState({ view }: DocumentEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="rounded-full bg-muted p-6 mb-4">
        {view === 'trash' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        ) : view === 'bookmarks' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-medium mb-2">Không có tài liệu</h3>
      <p className="text-muted-foreground text-center max-w-sm">
        {view === 'trash' ? 'Thùng rác trống.' : 
         view === 'bookmarks' ? 'Bạn chưa đánh dấu tài liệu nào.' : 
         'Không có tài liệu nào trong thư mục này.'}
      </p>
    </div>
  );
}
