import {useEffect} from "react";
import useSessionStore from "../../store/session.ts";


const SessionManagerComponent = () => {
    const setSessionExpired = useSessionStore((state) => state.setSessionExpired);

    useEffect(() => {
        let timer = setTimeout(() => {
            setSessionExpired();
        }, 10 * 60 * 1000);

        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setSessionExpired();
            }, 10 * 60 * 1000);
        };

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
        };
    }, [setSessionExpired]);

    return null;
};

export default SessionManagerComponent;