import { create } from "zustand";
import {AuthState} from "../interfaces/authState.interface.ts";
import {persist} from "zustand/middleware";



export const useAuthStore = create<AuthState>()( persist(
    (set) => ({
        accessToken: null,
        login: (accessToken) => set({ accessToken }),
        logout: () => set({ accessToken: null }),
    }),
    {
        name: "auth-storage",
    }
));