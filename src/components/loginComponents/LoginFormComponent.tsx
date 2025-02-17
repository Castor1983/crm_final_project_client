import React from "react";
import { useForm } from "react-hook-form";


interface LoginFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    register: ReturnType<typeof useForm>["register"];
    errors: ReturnType<typeof useForm>["formState"]["errors"];
}

const LoginFormComponent: React.FC<LoginFormProps> = ({ onSubmit, errors, register }) => {

    return (
        <form onSubmit={onSubmit} className="bg-white p-8 shadow-md rounded-lg w-96">
            <label className="block mb-2">Email</label>
            <input
                type="email" placeholder={'Email'}
                {...register("email", { required: "Min 1 char", pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email"
                    } }, )}
                className="w-full p-2  rounded mb-2 bg-gray-200"
            />
            {errors.email && <p className="text-red-500">{String(errors.email.message)}</p>}

            <label className="block mb-2">Password</label>
            <input
                type="password" placeholder={'Password'}
                {...register("password", { required: "Password is a required field" })}
                className="w-full p-2  rounded mb-2 bg-gray-200"
            />
            {errors.password && <p className="text-red-500">{String(errors.password.message)}</p>}

            <button type="submit" className="w-full bg-[#43a047] hover:bg-green-700 text-white p-2 rounded mt-4">
                LOGIN
            </button>
        </form>
    );
};

export default LoginFormComponent;