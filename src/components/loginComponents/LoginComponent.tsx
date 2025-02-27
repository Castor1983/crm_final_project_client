import {FC} from "react";

import {LoginForm} from "../../interfaces/loginForm.interface.ts";
import LoginFormComponent from "./LoginFormComponent.tsx";
import {useForm} from "react-hook-form";
import {fetchAuth} from "../../requests/requests.ts";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/auth.ts";
import {AxiosError} from "axios";


const LoginComponent: FC = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>();
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await fetchAuth(data)
            if (response.status === 201 && response.data.tokens.accessToken) {
                login(response.data.tokens.accessToken);
                navigate("/orders");
        }
    } catch (error) {
        const err = error as AxiosError
        if (err.response && (err.response.status === 401 || err.response.status === 404)) {
            setError("password", { type: "manual", message: "Wrong email or password" });
        }
    }

    };

    return (
        <div className="flex min-h-screen items-center justify-center ">
            <LoginFormComponent onSubmit={handleSubmit(onSubmit)}
                                register={register}
                                errors={errors}  />
        </div>
    );
};

export default LoginComponent;