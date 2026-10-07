import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { MonthlyCashFlowPoint } from '../../data/types';
import { formatMoney } from '../../lib/money';
import { Button } from '../../components/Button/Button';
import { Table, Column } from '../../components/Table/Table';

export interface CashFlowChartProps {
  data: MonthlyCashFlowPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: MonthlyCashFlowPoint;
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const point = payload[0].payload;
  const currentNet = point.netFlowMinor;
  const compNet = point.comparisonNetFlowMinor;
  const diff = currentNet - compNet;

  return (
    <div className="bg-surface border border-line rounded-control p-3 shadow-elevation text-xs space-y-1">
      <div className="font-semibold text-ink flex items-center justify-between gap-4">
        <span>{point.monthLabel} 2026</span>
        {point.isCurrentPeriod && (
          <span className="px-1.5 py-0.2 bg-saffron text-ink font-semibold rounded-control text-[10px]">
            Now
          </span>
        )}
      </div>
      <div className="text-slate flex justify-between gap-4">
        <span>Current Net Flow:</span>
        <strong className="text-marine tabular-nums">{formatMoney(currentNet)}</strong>
      </div>
      <div className="text-slate flex justify-between gap-4">
        <span>Prior Period:</span>
        <span className="tabular-nums">{formatMoney(compNet)}</span>
      </div>
      <div className="text-slate flex justify-between gap-4 border-t border-line pt-1 mt-1">
        <span>Variance:</span>
        <span className={diff >= 0 ? 'text-gain font-medium' : 'text-loss font-medium'}>
          {diff >= 0 ? `+${formatMoney(diff)}` : formatMoney(diff)}
        </span>
      </div>
    </div>
  );
};

export const CashFlowChart: React.FC<CashFlowChartProps> = ({ data }) => {
  const [showTableAlternative, setShowTableAlternative] = useState(false);

  // Accessible columns for the alternative table
  const tableColumns: Column<MonthlyCashFlowPoint>[] = [
    { key: 'monthLabel', header: 'Month', width: '25%' },
    {
      key: 'netFlowMinor',
      header: 'Net Flow (USD)',
      align: 'right',
      render: (item) => formatMoney(item.netFlowMinor, { omitCurrencySymbol: true }),
    },
    {
      key: 'comparisonNetFlowMinor',
      header: 'Prior Year (USD)',
      align: 'right',
      render: (item) => formatMoney(item.comparisonNetFlowMinor, { omitCurrencySymbol: true }),
    },
    {
      key: 'isCurrentPeriod',
      header: 'Status',
      align: 'center',
      render: (item) =>
        item.isCurrentPeriod ? (
          <span className="inline-flex items-center gap-1 text-xs text-[#8A5A00] font-medium bg-saffron-tint px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
            Current period
          </span>
        ) : (
          <span className="text-xs text-slate">Closed</span>
        ),
    },
  ];

  return (
    <div className="bg-surface border border-line rounded-panel p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-2">
        <div>
          <h2 className="text-lg font-semibold text-ink">Net Cash Flow Trend</h2>
          <p className="text-xs text-slate mt-0.5">
            Solid line shows 2026 performance. Dashed line represents comparison prior period.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => setShowTableAlternative(!showTableAlternative)}
            className="text-xs h-8 px-2.5"
            aria-expanded={showTableAlternative}
          >
            {showTableAlternative ? 'View chart' : 'Accessible table'}
          </Button>
        </div>
      </div>

      {showTableAlternative ? (
        <div className="mt-4">
          <Table
            columns={tableColumns}
            data={data}
            keyExtractor={(item) => item.date}
          />
        </div>
      ) : (
        <div className="mt-4 w-full h-72">
          {/* Accessible summary for screen readers */}
          <div className="sr-only">
            Line chart showing monthly net cash flow from May to October 2026. Current period
            October has a net cash flow of {formatMoney(data[data.length - 1]?.netFlowMinor ?? 0)}.
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 16, right: 16, left: 0, bottom: 4 }}
            >
              {/* Horizontal gridlines only per brand guidelines */}
              <CartesianGrid
                stroke="var(--line)"
                strokeDasharray="0"
                vertical={false}
              />
              <XAxis
                dataKey="monthLabel"
                stroke="var(--slate)"
                tickLine={false}
                axisLine={{ stroke: 'var(--line)' }}
                tick={{ fill: 'var(--slate)', fontSize: 12 }}
              />
              <YAxis
                stroke="var(--slate)"
                tickLine={false}
                axisLine={{ stroke: 'var(--line)' }}
                tick={{ fill: 'var(--slate)', fontSize: 12 }}
                tickFormatter={(val: number) => `$${(val / 100000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              {/* Comparison period: dashed --slate */}
              <Line
                type="monotone"
                dataKey="comparisonNetFlowMinor"
                name="Prior Period"
                stroke="var(--slate)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={false}
              />
              {/* Main series: --marine */}
              <Line
                type="monotone"
                dataKey="netFlowMinor"
                name="Current Period"
                stroke="var(--marine)"
                strokeWidth={2.5}
                isAnimationActive={true}
                animationDuration={400}
                dot={(props: { cx: number; cy: number; payload: MonthlyCashFlowPoint }) => {
                  const { cx, cy, payload } = props;
                  // Only current/selected point uses --saffron per brand guidelines
                  if (payload.isCurrentPeriod) {
                    return (
                      <g key={`dot-${payload.date}`}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={6}
                          fill="var(--saffron)"
                          stroke="var(--surface)"
                          strokeWidth={2}
                        />
                        <circle
                          cx={cx}
                          cy={cy}
                          r={10}
                          fill="var(--saffron)"
                          opacity={0.25}
                        />
                      </g>
                    );
                  }
                  return (
                    <circle
                      key={`dot-${payload.date}`}
                      cx={cx}
                      cy={cy}
                      r={3.5}
                      fill="var(--marine)"
                      stroke="var(--surface)"
                      strokeWidth={1.5}
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
