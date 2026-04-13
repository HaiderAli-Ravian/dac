'use client';

import { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { Navbar } from '@/components/shared/Navbar';
import { VehicleCard } from '@/components/listing/VehicleCard';
import { VehicleCardSkeleton } from '@/components/listing/VehicleCardSkeleton';
import { SearchBar } from '@/components/listing/SearchBar';
import { SortSelect } from '@/components/listing/SortSelect';
import { TypeFilter } from '@/components/listing/TypeFilter';
import { EmptyState } from '@/components/listing/EmptyState';
import { ErrorState } from '@/components/listing/ErrorState';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useVehicles } from '@/hooks/useVehicles';
import { SortOption } from '@/types/vehicle';

const PAGE_SIZE = 8;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [debouncedSearch] = useDebounce(searchQuery, 300);

  const { data, isLoading, isFetching, isError, refetch } = useVehicles({
    search: debouncedSearch,
    sort: sortOption,
    type: typeFilter,
    page: currentPage,
    limit: PAGE_SIZE,
  });

  const vehicles = data?.data ?? [];
  const totalPages = data?.pages ?? 0;
  const totalResults = data?.total ?? 0;

  const handleSearchChange = (v: string) => {
    setSearchQuery(v);
    setCurrentPage(1);
  };

  const handleSortChange = (v: SortOption) => {
    setSortOption(v);
    setCurrentPage(1);
  };

  const handleTypeChange = (v: string) => {
    setTypeFilter(v);
    setCurrentPage(1);
  };

  const handlePageClick = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers = useMemo((): (number | 'ellipsis')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | 'ellipsis')[] = [1];
    if (currentPage > 3) pages.push('ellipsis');
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
    return pages;
  }, [totalPages, currentPage]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-10 px-4">
        <div className="max-w-7xl mx-auto text-white">
          <h1 className="text-3xl font-bold">Vehicle Inventory</h1>
          <p className="mt-2 text-blue-100">Browse our complete catalog of vehicles</p>
        </div>
      </section>

      {/* Controls */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
          <div className="flex items-center gap-3">
            <TypeFilter value={typeFilter} onChange={handleTypeChange} />
            <SortSelect value={sortOption} onChange={handleSortChange} />
          </div>
          {!isLoading && !isError && (
            <span className="text-sm text-slate-500 shrink-0">
              {totalResults} {totalResults === 1 ? 'result' : 'results'}
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${
            isFetching && !isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'
          }`}
        >
          {isLoading &&
            Array.from({ length: PAGE_SIZE }).map((_, i) => <VehicleCardSkeleton key={i} />)}

          {isError && <ErrorState onRetry={refetch} />}

          {!isLoading && !isError && vehicles.length === 0 && (
            <EmptyState onClear={() => handleSearchChange('')} />
          )}

          {!isLoading &&
            !isError &&
            vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
        </div>

        {/* Pagination */}
        {!isLoading && !isError && totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={handlePageClick(Math.max(1, currentPage - 1))}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                {pageNumbers.map((page, idx) =>
                  page === 'ellipsis' ? (
                    <PaginationItem key={`ellipsis-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={handlePageClick(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={handlePageClick(Math.min(totalPages, currentPage + 1))}
                    aria-disabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
    </div>
  );
}
