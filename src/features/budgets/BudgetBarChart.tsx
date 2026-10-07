import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Budget } from '../../data/types';
import { formatMoney } from '../../lib/money';

export interface BudgetBarChartProps {
  budgets: Budget[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: Budget;
  }>;
}

const CustomBudgetTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const budget = payload[0].payload;
  const percent = Math.round((budget.spentMinor / budget.limitMinor) * 100);
  const remaining = budget.limitMinor - budget.spentMinor;

  return (
    <div className="bg-surface border border-line rounded-control p-3 shadow-elevation text-xs space-y-1">
      <div className="font-semibold text-ink">{budget.category}</div>
      <div className="text-slate flex justify-between gap-4">
        <span>Spent:</span>
        <strong className="text-marine tabular-nums">{formatMoney(budget.spentMinor)}</strong>
      </div>
      <div className="text-slate flex justify-between gap-4">
        <span>Budget Limit:</span>
        <span className="tabular-nums">{formatMoney(budget.limitMinor)}</span>
      </div>
      <div className="text-slate flex justify-between gap-4 border-t border-line pt-1 mt-1">
        <span>{remaining >= 0 ? 'Remaining:' : 'Over by:'}</span>
        <span
          className={`tabular-nums font-semibold ${
            remaining >= 0 ? 'text-gain' : 'text-loss'
          }`}
        >
          {formatMoney(Math.abs(remaining))} ({percent}%)
        </span>
      </div>
    </div>
  );
};

export const BudgetBarChart: React.FC<BudgetBarChartProps> = ({ budgets }) => {
  const chartData = budgets.map((b) => ({
    ...b,
    spentFormatted: b.spentMinor / 100,
    limitFormatted: b.limitMinor / 100,
  }));

  return (
    <div className="bg-surface border border-line rounded-panel p-6">
      <div className="pb-4 border-b border-line">
        <h2 className="text-base font-semibold text-ink">Category Spend vs Target</h2>
        <p className="text-xs text-slate mt-0.5">
          Zero-based horizontal comparison of current monthly spend against budget limits.
        </p>
      </div>

      <div className="mt-4 w-full h-80">
        <div className="sr-only">
          Horizontal bar chart comparing category spend with budget targets.
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 12, right: 24, left: 24, bottom: 4 }}
          >
            {/* Horizontal gridlines only per brand guidelines */}
            <CartesianGrid
              stroke="var(--line)"
              strokeDasharray="0"
              horizontal={true}
              vertical={false}
            />
            {/* X-axis starts at zero for bars */}
            <XAxis
              type="number"
              domain={[0, 'auto']}
              stroke="var(--slate)"
              tickLine={false}
              axisLine={{ stroke: 'var(--line)' }}
              tick={{ fill: 'var(--slate)', fontSize: 12 }}
              tickFormatter={(val: number) => `$${val.toLocaleString()}`}
            />
            <YAxis
              type="category"
              dataKey="category"
              stroke="var(--slate)"
              tickLine={false}
              axisLine={{ stroke: 'var(--line)' }}
              tick={{ fill: 'var(--ink)', fontSize: 13, fontWeight: 500 }}
              width={110}
            />
            <Tooltip content={<CustomBudgetTooltip />} />
            {/* Limit Reference Bar */}
            <Bar
              dataKey="limitFormatted"
              name="Budget Limit"
              fill="var(--line)"
              radius={[0, 4, 4, 0]}
              barSize={16}
            />
            {/* Actual Spend Bar */}
            <Bar
              dataKey="spentFormatted"
              name="Actual Spend"
              fill="var(--marine)"
              radius={[0, 4, 4, 0]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
