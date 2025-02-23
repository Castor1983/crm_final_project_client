import { ManagerInterface } from './manager.interface.ts';
import { StatsInterface } from './stats.interface.ts';

export interface ManagersStateInterface {
  managers: ManagerInterface[];
  manager: ManagerInterface;
  stats: StatsInterface;
  setManagers: (managers: ManagerInterface[]) => void;
  setManager: (manager: ManagerInterface) => void;
  setStats: (stats: StatsInterface) => void;
}
