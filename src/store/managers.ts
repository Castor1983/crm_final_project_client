import {create} from "zustand/index";
import {ManagersStateInterface} from "../interfaces/managersState.interface.ts";
import {ManagerInterface} from "../interfaces/manager.interface.ts";
import {StatsInterface} from "../interfaces/stats.interface.ts";



export const useManagersStore = create<ManagersStateInterface>((set) => ({
    managers: [],
    stats:{} as StatsInterface,
    setManagers: (managers:ManagerInterface []) => set({ managers }),
    setStats: (stats: StatsInterface) => set({ stats }),

}));