import React from 'react';
import { Input } from '../../components/Input/Input';

export interface TransactionFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end bg-surface border border-line rounded-panel p-4">
      <div className="w-full sm:w-72">
        <Input
          id="tx-search"
          label="Search transactions"
          placeholder="e.g. Grocery, Market, Lease"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-56 flex flex-col gap-1">
        <label htmlFor="tx-category-select" className="text-xs font-medium text-slate">
          Category
        </label>
        <select
          id="tx-category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-10 px-3 text-sm bg-surface text-ink border border-line rounded-control focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-marine focus-visible:outline-offset-2"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
