import {FC, useEffect, useState} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useManagersStore} from "../../store/managers.ts";
import ManagerComponent from "./ManagerComponent.tsx";
import CreateManagerWindow from "./CreateManagerWindow.tsx";
import {managersUrl} from "../../common/urls.ts";
import {apiAuth} from "../../services/api.ts";

const AdminPanelComponent: FC =() => {
    const { stats, setStats, managers, setManagers} = useManagersStore()
    const [isOpen, setIsOpen] = useState(false);

    const fetchManagers = async () => {
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
    useEffect(() => {
        fetchManagers();
    }, []);

    return (
        <div className="w-[100%] flex-auto pl-40 pr-40">
            <h1 className="text-center">Orders Statistic</h1>

            <p className="text-center">
                total: {stats.total} In work: {stats.in_work} null: {stats.null_count}
                Agree: {stats.agree} Disagree: {stats.disagree}
                Dubbing: {stats.dubbing}  New: {stats.new}
            </p>
            <button onClick={() => setIsOpen(true)} className="bg-[#43a047] text-white px-4 py-1 text-[12px] rounded hover:bg-green-700">
                CREATE
            </button>
            {managers.length > 0 ? (
                managers.map((manager) => (
                    <ManagerComponent key={manager.id} manager={manager} onUpdate={fetchManagers}/>

                ))
            ) : (
                <p>No managers found</p>
            )}
            {isOpen && (<CreateManagerWindow isOpen={isOpen} setIsOpen={setIsOpen} />)}
        </div>
    );
};

export default AdminPanelComponent