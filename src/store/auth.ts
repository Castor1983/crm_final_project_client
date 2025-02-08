import { create } from "zustand";
import {AuthState} from "../interfaces/authState.interface.ts";
import {persist} from "zustand/middleware";
import {jwtDecode} from "jwt-decode";
import {IJwtPayload} from "../interfaces/jwt-payload.interface.ts";



export const useAuthStore = create<AuthState>()( persist(
    (set) => ({
        accessToken: null,
        manager: null,
        login: (accessToken) => {
            const decoded: IJwtPayload = jwtDecode(accessToken);
            set({ manager: decoded });
            set({accessToken})
        },
        logout: () => set({ accessToken: null }),
    }),
    {
        name: "auth-storage",
    }
));