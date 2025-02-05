import React from "react";
import { useForm } from "react-hook-form";

import {LoginForm} from "../../interfaces/loginForm.interface.ts";


interface LoginFormProps {
    onSubmit: (data: LoginForm) => void;
}

const LoginFormComponent: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 shadow-md rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Вхід</h2>

            <label className="block mb-2">Email</label>
            <input
                type="email"
                {...register("email", { required: "Email обов'язковий" })}
                className="w-full p-2 border rounded mb-2"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <label className="block mb-2">Пароль</label>
            <input
                type="password"
                {...register("password", { required: "Пароль обов'язковий" })}
                className="w-full p-2 border rounded mb-2"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
                Увійти
            </button>
        </form>
    );
};

export default LoginFormComponent;