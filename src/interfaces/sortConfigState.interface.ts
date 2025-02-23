import { SortConfigInterface } from './sortConfig.interface.ts';
import { DescAscEnum } from '../enums/desc-asc.enum.ts';

export interface SortConfigStateInterface {
  sortConfig: {
    column: string;
    direction: DescAscEnum;
  };
  setSortConfig: (sortConfig: SortConfigInterface) => void;
}
