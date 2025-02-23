import { create } from 'zustand/index';

import { ManagerInterface } from '../interfaces/manager.interface.ts';
import { ManagersStateInterface } from '../interfaces/managersState.interface.ts';
import { StatsInterface } from '../interfaces/stats.interface.ts';

export const useManagersStore = create<ManagersStateInterface>(set => ({
  manager: {} as ManagerInterface,
  managers: [],
  stats: {} as StatsInterface,
  setManagers: (managers: ManagerInterface[]) => set({ managers }),
  setManager: (manager: ManagerInterface) => set({ manager }),
  setStats: (stats: StatsInterface) => set({ stats }),
}));
