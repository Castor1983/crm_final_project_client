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
            <label className="block mb-2">Email</label>
            <input
                type="email" placeholder={'Email'}
                {...register("email", { required: "Min 1 char" })}
                className="w-full p-2  rounded mb-2 bg-gray-200"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <label className="block mb-2">Password</label>
            <input
                type="password" placeholder={'Password'}
                {...register("password", { required: "Password is required field" })}
                className="w-full p-2  rounded mb-2 bg-gray-200"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <button type="submit" className="w-full bg-[#43a047] text-white p-2 rounded mt-4">
                LOGIN
            </button>
        </form>
    );
};

export default LoginFormComponent;