
import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  heading,
  description,
  children,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="mt-2 sm:mt-0 flex gap-2">{children}</div>}
    </div>
  );
}
