import {api, apiAuth} from "../services/api.ts";
import {managersUrl, urls} from "../common/urls.ts";
import {GroupInterface} from "../interfaces/group.interface.ts";

import {LoginForm} from "../interfaces/loginForm.interface.ts";
import {toast} from "react-toastify";
import {StatsInterface} from "../interfaces/stats.interface.ts";
import {ManagerInterface} from "../interfaces/manager.interface.ts";


const fetchGroups = async (setGroups : (groups: GroupInterface[]) => void) => {
    try {
        const groupsResponse = await apiAuth.get(urls.orders.groups);
        setGroups(groupsResponse.data);
    } catch (error) {
        console.error("Error when removing a group:", error);
    }
}

const fetchOrdersExportToExcel = async (params: { [p: string]: string }) => {
    return  await apiAuth.get(urls.orders.exportToExcel, {
        params: params,
    });
}

const fetchAuth = async (data: LoginForm) => {
    return await api.post(urls.auth.signIn, data);
}

const fetchManagers = async (setStats: (stats: StatsInterface) => void, setManagers: (managers: ManagerInterface[]) => void) => {
    try {
        const  managersResponse = await
            apiAuth.get(managersUrl);

        setStats(managersResponse.data.orderStats);
        setManagers(managersResponse.data.data);
    } catch (err) {
        console.error("Error fetching managers:", err);
        toast.error("Failed to load managers", {autoClose: 3000});
    }
};

 const fetchCreateManager = async (manager: ManagerInterface) => {
     await apiAuth.post( managersUrl, manager)
 }

 const fetchActivateManager = async (managerId: string) => {
    return  await apiAuth.post(urls.managers.activateManager(managerId))
}

const fetchRecoveryPassword = async (managerId: string) => {
  return  await apiAuth.post(urls.managers.deactivate(managerId))
}

const fetchBanManager = async (managerId: string) => {
    await apiAuth.patch(urls.managers.ban(managerId));
}

const fetchUnbanManager = async (managerId: string) => {
    await apiAuth.patch(urls.managers.unban(managerId));
}

const fetchActivatePassword = async (activateToken: string | undefined, password: string) => {
    await api.post(urls.managers.activatePassword(activateToken), {
        password: password
    });
}


export {
    fetchGroups,
    fetchOrdersExportToExcel,
    fetchAuth,
    fetchManagers,
    fetchCreateManager,
    fetchActivateManager,
    fetchRecoveryPassword,
    fetchBanManager,
    fetchUnbanManager,
    fetchActivatePassword
}