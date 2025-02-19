import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useSessionStore from "../../store/session.ts";


const SessionWatcherComponent = () => {
    const navigate = useNavigate();
    const isSessionExpired = useSessionStore((state) => state.isSessionExpired);

    useEffect(() => {
        if (isSessionExpired) {
            navigate('/login?expSession=true');
        }
    }, [isSessionExpired, navigate]);

    return null;
};

export default SessionWatcherComponent;