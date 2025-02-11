import {FC, useEffect, useState} from "react";
import axios from "axios";
import {useAuthStore} from "../../store/auth.ts";
import {useManagersStore} from "../../store/managers.ts";
import ManagerComponent from "./ManagerComponent.tsx";
import CreateManagerWindow from "./CreateManagerWindow.tsx";

const AdminPanelComponent: FC =() => {
    const {accessToken} = useAuthStore()
    const { stats, setStats, managers, setManagers} = useManagersStore()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const  managersResponse = await
                    axios.get('http://localhost:3001/api/managers', {//TODO
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    } );

                setStats(managersResponse.data.orderStats);
                setManagers(managersResponse.data.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex-col items-center bg-white w-[100vh]">
            <h1>Orders Statistic</h1>

            <p>
                total: {stats.total} In work: {stats.in_work} null: {stats.null_count}
                Agree: {stats.agree} Disagree: {stats.disagree}
                Dubbing: {stats.dubbing}  New: {stats.new}
            </p>
            <button onClick={() => setIsOpen(true)} className="bg-[#43a047] text-white px-4 py-2 rounded hover:bg-green-700">
                CREATE
            </button>
            {managers.length > 0 ? (
                managers.map((manager) => (
                    <ManagerComponent key={manager.id} manager={manager}/>

                ))
            ) : (
                <p>No managers found</p>
            )}
            {isOpen && (<CreateManagerWindow isOpen={isOpen} setIsOpen={setIsOpen} />)}
        </div>
    );
};

export default AdminPanelComponent