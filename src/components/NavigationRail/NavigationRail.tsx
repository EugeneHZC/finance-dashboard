import React from 'react';
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Landmark,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export type NavItemKey = 'overview' | 'transactions' | 'budgets' | 'accounts';

export interface NavigationRailProps {
  currentTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  currentTab,
  onSelectTab,
  isDarkMode,
  onToggleTheme,
}) => {
  const navItems: { key: NavItemKey; label: string; icon: React.ReactNode }[] = [
    {
      key: 'overview',
      label: 'Overview',
      icon: <LayoutDashboard className="w-5 h-5 shrink-0" />,
    },
    {
      key: 'transactions',
      label: 'Transactions',
      icon: <Receipt className="w-5 h-5 shrink-0" />,
    },
    {
      key: 'budgets',
      label: 'Budgets',
      icon: <PieChart className="w-5 h-5 shrink-0" />,
    },
    {
      key: 'accounts',
      label: 'Accounts',
      icon: <Landmark className="w-5 h-5 shrink-0" />,
    },
  ];

  return (
    <aside
      aria-label="Sidebar navigation"
      className="w-16 lg:w-[232px] shrink-0 border-r border-line bg-surface flex flex-col justify-between transition-all duration-150 ease-out z-20 min-h-screen"
    >
      <div>
        {/* Brand header */}
        <div className="h-16 flex items-center px-4 lg:px-6 border-b border-line gap-3">
          <div className="w-7 h-7 rounded-control bg-marine text-white flex items-center justify-center font-bold text-sm tracking-tight shrink-0 select-none">
            FD
          </div>
          <div className="hidden lg:flex flex-col overflow-hidden">
            <span className="font-semibold text-sm text-ink truncate leading-tight">
              Finance Ledger
            </span>
            <span className="text-[11px] text-slate truncate">
              Personal Position
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-2 lg:p-3 space-y-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelectTab(item.key)}
                className={cn(
                  'w-full min-h-[40px] flex items-center gap-3 px-3 py-2 rounded-control text-sm font-medium transition-colors duration-150 ease-out select-none cursor-pointer',
                  isActive
                    ? 'bg-marine-tint text-marine font-semibold'
                    : 'text-slate hover:text-ink hover:bg-canvas'
                )}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
              >
                {item.icon}
                <span className="hidden lg:inline truncate">{item.label}</span>
                {isActive && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-saffron hidden lg:block shrink-0"
                    aria-label="Active indicator"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer controls: theme toggle */}
      <div className="p-2 lg:p-3 border-t border-line">
        <button
          type="button"
          onClick={onToggleTheme}
          className="w-full min-h-[40px] flex items-center gap-3 px-3 py-2 rounded-control text-sm font-medium text-slate hover:text-ink hover:bg-canvas transition-colors duration-150 ease-out cursor-pointer"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-saffron shrink-0" />
          ) : (
            <Moon className="w-5 h-5 shrink-0" />
          )}
          <span className="hidden lg:inline text-xs">
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </span>
        </button>
      </div>
    </aside>
  );
};
