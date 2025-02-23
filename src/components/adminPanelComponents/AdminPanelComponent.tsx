import {FC, useEffect, useState} from "react";

import "react-toastify/dist/ReactToastify.css";

import {useManagersStore} from "../../store/managers.ts";
import ManagerComponent from "./ManagerComponent.tsx";
import CreateManagerWindow from "./CreateManagerWindow.tsx";
import {fetchManagers} from "../../requests/requests.ts";
import {buttonClass} from "../../styles/styles.ts";

const AdminPanelComponent: FC =() => {
    const { stats, setStats, managers, setManagers} = useManagersStore()
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchManagers(setStats, setManagers);
    }, []);

    return (
        <div className="w-[100%] flex-auto pl-40 pr-40">
            <h1 className="text-center">Orders Statistic</h1>

            <p className="text-center">
                total: {stats.total} In work: {stats.in_work} null: {stats.null_count}
                Agree: {stats.agree} Disagree: {stats.disagree}
                Dubbing: {stats.dubbing}  New: {stats.new}
            </p>
            <button onClick={() => setIsOpen(true)} className={buttonClass}>
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