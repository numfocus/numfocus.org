import type { ProjectFilterOptions, ProjectFilterValues } from 'env';
import { useMemo, useState } from 'react';

import ProjectDropdownFilters from './ProjectDropdownFilters';
import ProjectTextSearch from './ProjectTextSearch';
import ProjectTypeFilter from './ProjectTypeFilter';

export const initialFilters = {
  type: ['sponsored', 'affiliated'],
  features: [],
  industries: [],
  languages: [],
};

const filterContainerStyle =
  'mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4';
const filterLabelStyle =
  'block md:basis-15 lg:basis-30 grow-0 shrink-0 font-medium text-gray-900';

export default function ProjectFilters({
  activeFilters,
  filterOptions,
  searchQuery,
  setActiveFilters,
  setSearchQuery,
}: {
  activeFilters: ProjectFilterValues;
  filterOptions: ProjectFilterOptions;
  searchQuery: string;
  setActiveFilters: (filters: ProjectFilterValues) => void;
  setSearchQuery: (q: string) => void;
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
      <div className="bg-brand-gray-light px-8 py-12 text-sm">
        <div className="mx-auto w-11/12 max-w-screen-xl">
          <h5>Search and filter projects</h5>
          <div className={filterContainerStyle}>
            <p className={filterLabelStyle}>Search by name:</p>
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
            <p className={filterLabelStyle}>Filter by:</p>
            <ProjectDropdownFilters
              filterOptions={dropdownFilterOptions}
              activeFilters={activeFilters}
              onChange={setActiveFilter}
            />
            {/* Mobile */}
            <div className="py-2 md:hidden">
              <TypeFilter />
            </div>
            <button
              type="button"
              className="md:basis-30 text-left text-blue-500 hover:text-blue-700 disabled:text-gray-500 md:min-w-20 md:text-center lg:min-w-32"
              onClick={clearActiveFilters}
              disabled={
                !searchQuery &&
                Object.entries(activeFilters).every(([key, values]) =>
                  key === 'type' ? values.length === 2 : !values.length
                )
              }
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
