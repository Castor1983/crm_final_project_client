import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { FaUsersCog, FaSignOutAlt } from "react-icons/fa";

const HeaderComponent = () => {
    const navigate = useNavigate();
    const { manager, logout } = useAuthStore();

    return (
        <header className="bg-[#76b852] p-4 flex justify-between items-center w-[100%] ">
            <h1 className="text-white text-xl font-bold">Logo</h1>
            <div className="flex items-center gap-4">
                {manager?.role === "admin" && (
                    <div className="flex items-center gap-2">
                        <h2 className="text-white text-xl font-bold">admin</h2>
                        <button
                            onClick={() => navigate("/admin")}
                            className="bg-[#43a047] text-white p-2 rounded flex items-center gap-2"
                        >
                            <FaUsersCog size={20}/>
                        </button>
                    </div>
                )}
                <button
                    onClick={logout}
                    className="bg-[#43a047] text-white p-2 rounded flex items-center gap-2"
                >
                    <FaSignOutAlt size={20}/>
                </button>
            </div>
        </header>
    );
};

export default HeaderComponent;