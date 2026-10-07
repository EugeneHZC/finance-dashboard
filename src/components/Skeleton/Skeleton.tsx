import React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-line/60 rounded-control',
        className
      )}
      aria-hidden="true"
    />
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full space-y-3 p-4" aria-label="Loading table data" role="status">
      <Skeleton className="h-6 w-1/4" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
};

export const ChartSkeleton: React.FC = () => {
  return (
    <div className="w-full h-64 flex flex-col justify-end p-4 gap-2" aria-label="Loading chart" role="status">
      <div className="flex items-end justify-between h-48 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-32 rounded-control" />
        ))}
      </div>
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
};
