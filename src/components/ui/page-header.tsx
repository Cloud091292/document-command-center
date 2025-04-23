
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description?: string;
  children?: React.ReactNode;
  status?: string;
  statusVariant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "error" | "info";
}

export function PageHeader({
  heading,
  description,
  children,
  status,
  statusVariant = "default",
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
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
          {status && <Badge variant={statusVariant}>{status}</Badge>}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="mt-2 sm:mt-0 flex gap-2">{children}</div>}
    </div>
  );
}
