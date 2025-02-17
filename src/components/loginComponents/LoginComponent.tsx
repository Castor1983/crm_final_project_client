import {FC} from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/auth";
import {LoginForm} from "../../interfaces/loginForm.interface.ts";
import LoginFormComponent from "./LoginFormComponent.tsx";
import {urls} from "../../common/urls.ts";
import {api} from "../../services/api.ts";
import {useForm} from "react-hook-form";

const LoginComponent: FC = () => {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>();

    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await api.post(urls.auth.signIn, data);

            if (response.status === 201 && response.data.tokens.accessToken) {
                login(response.data.tokens.accessToken);
                navigate("/orders");
            }
        } catch (error: any) {//todo
            if (error.response && error.response.status === 401) {
                setError("password", { type: "manual", message: "Wrong email or password" });
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center ">
            <LoginFormComponent onSubmit={handleSubmit(onSubmit)}
                                register={register} //todo
                                errors={errors}  />
        </div>
    );
};

export default LoginComponent;