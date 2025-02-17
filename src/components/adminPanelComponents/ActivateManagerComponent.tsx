import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {urls} from "../../common/urls.ts";
import {api} from "../../services/api.ts";

const ActivateManagerComponent: FC = () => {
    const { activateToken } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!activateToken) {
            setMessage("Error: Missing activation token.");
        }
    }, [activateToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.preventDefault()) //todo

        if (password !== confirmPassword) {
            setMessage("Passwords don't match.");
            return;
        }

        try {
             await api.post(urls.managers.activatePassword(activateToken), {
                password: password
            });

            setMessage("Password is successfully set!");
            setTimeout(() => navigate("/"), 2000)
        } catch (error) {
            setMessage("Error activation: " + (error.response?.data?.message || error.message));//todo
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#43a047]">
            {message && <p className="text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 bg-white rounded-2xl p-5">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-200 p-2 rounded"
                    required
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-200 p-2 rounded"
                    required
                />
                <button type="submit" className="bg-[#43a047] hover:bg-green-700 text-white px-4 py-2 rounded">
                    ACTIVATE
                </button>
            </form>
        </div>
    );
};

export default ActivateManagerComponent;