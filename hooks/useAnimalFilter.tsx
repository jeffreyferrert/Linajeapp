import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AnimalPostOut,
  LineagePostOut,
  PagedAnimalPostOut,
} from '@/api/domain';
import { useAutoAPI } from '@/hooks/useAutoAPI';
import { IAnimalAPI } from '@/api/domain';

interface FilterState {
  dateRange: {
    startDate: string | undefined;
    endDate: string | undefined;
  };
  sex: 'M' | 'F' | undefined;
  search: string | undefined;
  lineagesId: number[] | undefined;
}

export const useAnimalFilter = (animalInstance: IAnimalAPI) => {
  const [animals, setAnimals] = useState<AnimalPostOut[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [lineages, setLineages] = useState<LineagePostOut[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { startDate: undefined, endDate: undefined },
    sex: undefined,
    search: undefined,
    lineagesId: undefined,
  });

  const animalsRef = useRef(animals);
  animalsRef.current = animals;

  const { getAnimals, filterAnimals } = useAutoAPI(animalInstance);

  useEffect(() => {
    const fetchLineages = async () => {
      const response = await animalInstance.getLineages();
      setLineages(response);
    };
    fetchLineages();
  }, [animalInstance]);

  const fetchAnimals = useCallback(
    async (pageNum: number, appliedFilters: FilterState) => {
      const { dateRange, sex, search, lineagesId } = appliedFilters;
      const isFiltered =
        dateRange.startDate ||
        dateRange.endDate ||
        sex ||
        search ||
        (lineagesId ?? []).length > 0;

      try {
        let response: PagedAnimalPostOut;
        if (isFiltered) {
          response = await filterAnimals(
            pageNum,
            dateRange.startDate,
            dateRange.endDate,
            search,
            lineagesId,
            sex,
          );
        } else {
          response = await getAnimals(pageNum);
        }

        return response;
      } catch (error) {
        console.error('Error fetching animals:', error);
        return { count: 0, items: [] };
      }
    },
    [filterAnimals, getAnimals],
  );

  const loadAnimals = useCallback(
    async (pageNum: number, isLoadMore: boolean = false) => {
      setLoadingMore(true);
      const response = await fetchAnimals(pageNum, filters);

      if (response && response.items) {
        setAnimals((prev) => {
          const updatedAnimals = isLoadMore
            ? [...prev, ...response.items]
            : response.items;

          const totalLoaded = updatedAnimals.length;
          setHasMore(totalLoaded < response.count);
          return updatedAnimals;
        });
        setPage(pageNum);
      } else {
        if (!isLoadMore) setAnimals([]);
        setHasMore(false);
      }
      setLoadingMore(false);
    },
    [fetchAnimals, filters],
  );

  const loadMoreAnimals = useCallback(() => {
    if (loadingMore || !hasMore) return;
    loadAnimals(page + 1, true);
  }, [loadingMore, hasMore, page, loadAnimals]);

  const applyFilter = useCallback(
    (filterType: keyof FilterState, value: any) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
      setPage(1);
      setAnimals([]);
    },
    [],
  );

  const clearFilter = useCallback((filterType: keyof FilterState) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      switch (filterType) {
        case 'dateRange':
          newFilters.dateRange = { startDate: '', endDate: '' };
          break;
        case 'sex':
          newFilters.sex = undefined;
          break;
        case 'search':
          newFilters.search = '';
          break;
        case 'lineagesId':
          newFilters.lineagesId = [];
          break;
        default:
          break;
      }
      return newFilters;
    });
    setPage(1);
    setAnimals([]);
  }, []);

  useEffect(() => {
    loadAnimals(1);
  }, [loadAnimals, filters]);

  return {
    animals,
    hasMore,
    loadingMore,
    loadMoreAnimals,
    applyFilter,
    clearFilter,
    filters,
    lineages,
    setLineages,
  };
};
