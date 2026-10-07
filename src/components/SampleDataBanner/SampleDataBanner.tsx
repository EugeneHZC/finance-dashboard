import React from 'react';
import { Info } from 'lucide-react';

export const SampleDataBanner: React.FC = () => {
  return (
    <aside
      aria-label="Simulation notice"
      className="bg-marine-tint/60 border-b border-marine/20 px-4 py-1.5 flex items-center justify-between text-xs text-marine select-none"
    >
      <div className="flex items-center gap-2">
        <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>
          <strong>Sample data:</strong> Figures are simulated for demonstration. No real accounts or money are connected.
        </span>
      </div>
      <span className="font-semibold px-2 py-0.5 bg-surface text-marine border border-line rounded-control text-[11px] hidden sm:inline">
        Read-only
      </span>
    </aside>
  );
};
