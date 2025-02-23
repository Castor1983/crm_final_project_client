import { DescAscEnum } from '../enums/desc-asc.enum.ts';

export interface SortConfigInterface {
  column: string;
  direction: DescAscEnum;
}
