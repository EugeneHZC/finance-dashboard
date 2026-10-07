import React, { useState, useEffect } from 'react';
import { NavigationRail, NavItemKey } from './components/NavigationRail/NavigationRail';
import { SampleDataBanner } from './components/SampleDataBanner/SampleDataBanner';
import { OverviewPage } from './features/overview/OverviewPage';
import { TransactionsPage } from './features/transactions/TransactionsPage';
import { BudgetsPage } from './features/budgets/BudgetsPage';
import { AccountsPage } from './features/accounts/AccountsPage';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavItemKey>('overview');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return (
      localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-sans">
      {/* 1. Mandatory Sample Data Label banner */}
      <SampleDataBanner />

      {/* 2. Main layout: Navigation Rail + Main Content */}
      <div className="flex flex-1 min-h-[calc(100vh-33px)]">
        {/* Navigation Rail: 232px collapsing to 64px below 1024px */}
        <NavigationRail
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />

        {/* Content Area: Max width 1280px, responsive down to 360px */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 w-full max-w-[1280px] mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto focus:outline-none"
        >
          {currentTab === 'overview' && <OverviewPage onNavigate={setCurrentTab} />}
          {currentTab === 'transactions' && <TransactionsPage />}
          {currentTab === 'budgets' && <BudgetsPage />}
          {currentTab === 'accounts' && <AccountsPage />}
        </main>
      </div>
    </div>
  );
};
