import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useSessionStore from "../../store/session.ts";
import {useAuthStore} from "../../store/auth.ts";


const SessionWatcherComponent = () => {
    const navigate = useNavigate();
    const isSessionExpired = useSessionStore((state) => state.isSessionExpired);
    const {logout} = useAuthStore()

    useEffect(() => {
        if (isSessionExpired) {
            logout()
            navigate('/login?expSession=true');
        }
    }, [isSessionExpired, navigate]);

    return null;
};

export default SessionWatcherComponent;