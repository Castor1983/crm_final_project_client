import {FC} from "react";
import LoginComponent from "../../components/loginComponents/LoginComponent.tsx";



const LoginPage: FC = () => {

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <LoginComponent/>
        </div>
    );
};

export default LoginPage;