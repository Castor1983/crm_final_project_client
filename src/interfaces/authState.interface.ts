export interface AuthState {
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}