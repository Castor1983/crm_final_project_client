import { create } from 'zustand/index';

import { DescAscEnum } from '../enums/desc-asc.enum.ts';
import { SortConfigStateInterface } from '../interfaces/sortConfigState.interface.ts';

export const useSortConfigStore = create<SortConfigStateInterface>(set => ({
  sortConfig: {
    column: '',
    direction: DescAscEnum.DESC,
  },
  setSortConfig: sortConfig => set({ sortConfig }),
}));
