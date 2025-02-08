import {IJwtPayload} from "./jwt-payload.interface.ts";

export interface AuthState {
    manager: IJwtPayload | null;
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}