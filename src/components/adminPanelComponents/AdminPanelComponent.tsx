import {FC, useEffect, useState} from "react";
import axios from "axios";
import {useAuthStore} from "../../store/auth.ts";
import {useManagersStore} from "../../store/managers.ts";

const AdminPanelComponent: FC =() => {
    const {accessToken} = useAuthStore()
    const { stats, setStats, managers, setManagers} = useManagersStore()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div>
            <h1>Orders Statistic</h1>
            <p>
                total: {stats.total} | In work: {stats.in_work} | null: {stats.null_count} |
                Agree: {stats.agree} | Disagree: {stats.disagree} |
                Dubbing: {stats.dubbing} | New: {stats.new}
            </p>

            <h2>Managers</h2>
            {managers.length > 0 ? (
                managers.map((manager) => (
                    <div key={manager.id} className="border p-4 my-2">
                        <p>id: {manager.id}</p>
                        <p>email: {manager.email}</p>
                        <p>name: {manager.name}</p>
                        <p>surname: {manager.surname}</p>
                        <p>is_active: {manager.is_active ? "true" : "false"}</p>
                        <p>last_login: {manager.last_login || "null"}</p>
                        <p>total: {manager.orderStats.total || "null"}</p>
                    </div>
                ))
            ) : (
                <p>No managers found</p>
            )}
        </div>
    );
};

export default AdminPanelComponent