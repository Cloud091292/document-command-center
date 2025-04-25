
import React from 'react';
import { ChevronRight } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface DocumentBreadcrumbProps {
  path: string[];
  onNavigate: (path: string[]) => void;
}

export function DocumentBreadcrumb({ path, onNavigate }: DocumentBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((segment, index) => {
          const currentPath = path.slice(0, index + 1);
          const isLastItem = index === path.length - 1;

          return (
            <React.Fragment key={`${segment}-${index}`}>
              {isLastItem ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    onClick={() => onNavigate(currentPath)}
                    className="cursor-pointer"
                  >
                    {segment}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
              
              {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
