import {FC} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import {LoginForm} from "../../interfaces/loginForm.interface.ts";
import LoginFormComponent from "../loginFormComponents/LoginFormComponent.tsx";

const LoginComponent: FC = () => {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await axios.post("http://localhost:3001/api/auth/sign-in", data);

            if (response.status === 201 && response.data.tokens.accessToken) {
                login(response.data.tokens.accessToken);
                navigate("/orders");
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <LoginFormComponent onSubmit={onSubmit} />
        </div>
    );
};

export default LoginComponent;