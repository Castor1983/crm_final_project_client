import { DescAscEnum } from '../enums/desc-asc.enum.ts';
import { SortConfigInterface } from './sortConfig.interface.ts';

export interface SortConfigStateInterface {
  sortConfig: {
    column: string;
    direction: DescAscEnum;
  };
  setSortConfig: (sortConfig: SortConfigInterface) => void;
}
