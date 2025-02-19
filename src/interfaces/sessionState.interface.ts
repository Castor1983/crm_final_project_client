
export interface SessionStateInterface {
    isSessionExpired: boolean,
    setSessionExpired: () => void;
    resetSession:  () => void;
}