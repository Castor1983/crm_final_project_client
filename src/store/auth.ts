import { create } from "zustand";
import {AuthState} from "../interfaces/authState.interface.ts";



export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({ accessToken: token }),
    login: (token) => set({ accessToken: token }),
    logout: () => set({ accessToken: null }),
}));