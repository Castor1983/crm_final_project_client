export interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    login: (token: string) => void; // Функция для логина
    logout: () => void;
}