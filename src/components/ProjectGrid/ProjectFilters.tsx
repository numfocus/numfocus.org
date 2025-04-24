import { useMemo, useState } from 'react';
import type {
  ProjectFilterOptions,
  ProjectFilterValues,
} from 'env';

import ProjectDropdownFilters from './ProjectDropdownFilters';
import ProjectTextSearch from './ProjectTextSearch';
import ProjectTypeFilter from './ProjectTypeFilter';

export const initialFilters = {
  type: ['sponsored', 'affiliated'],
  features: [],
  industries: [],
  languages: [],
};

const filterContainerStyle = "mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
const filterLabelStyle = "block md:basis-30 grow-0 shrink-0 font-medium text-gray-900"

export default function ProjectFilters({
  activeFilters,
  filterOptions,
  searchQuery,
  setActiveFilters,
  setSearchQuery
}: {
  activeFilters: ProjectFilterValues;
  filterOptions: ProjectFilterOptions;
  searchQuery: string
  setActiveFilters: (filters: ProjectFilterValues) => void
  setSearchQuery: (q: string) => void
}) {
  const { type: typeFilterOptions, ...dropdownFilterOptions } = filterOptions;

  const setActiveFilter = (key: string, items: any) => {
    setActiveFilters({ ...activeFilters, [key]: items });
  };

  const clearActiveFilters = () => {
    setActiveFilters({ ...initialFilters });
    setSearchQuery('');
  };

  const TypeFilter = () => (
    <ProjectTypeFilter
      filterOptions={typeFilterOptions || []}
      activeFilterValues={activeFilters.type}
      onChange={(items) => setActiveFilter('type', items)}
    />
  );

  return (
    <div>
      <div className="my-4 px-4 py-6 bg-teal-50 text-sm">
        <div className="max-w-screen-xl w-11/12 mx-auto">
          <h5>Search and filter projects</h5>
          <div className={filterContainerStyle}>
            <p className={filterLabelStyle}>
              Search by name:
            </p>
            <ProjectTextSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {/* Desktop */}
            <div className="hidden md:block">
              <TypeFilter />
            </div>
          </div>
          <div className={filterContainerStyle}>
            <p className={filterLabelStyle}>
              Filter by:
            </p>
            <ProjectDropdownFilters
              filterOptions={dropdownFilterOptions}
              activeFilters={activeFilters}
              onChange={setActiveFilter}
            />
            {/* Mobile */}
            <div className="md:hidden py-2">
              <TypeFilter />
            </div>
            <button
              className="min-w-32 md:basis-30 text-left md:text-center text-blue-500 hover:text-blue-700 disabled:text-gray-500"
              onClick={clearActiveFilters}
              disabled={
                !searchQuery && Object.entries(activeFilters).every(([key, values]) => key === 'type' ? values.length === 2 : !values.length )}
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
