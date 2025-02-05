import { useAuthStore } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl mb-4">Dashboard</h2>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;