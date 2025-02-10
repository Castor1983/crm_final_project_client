import {ManagerInterface} from "./manager.interface.ts";
import {StatsInterface} from "./stats.interface.ts";


export interface ManagersStateInterface {
    managers: ManagerInterface [],
    stats: StatsInterface,
    setManagers: (managers: ManagerInterface[]) => void,
    setStats: (stats: StatsInterface) => void
}