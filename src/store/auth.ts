import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

import { AuthState } from '../interfaces/authState.interface.ts';
import { IJwtPayload } from '../interfaces/jwt-payload.interface.ts';

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      manager: null,
      login: accessToken => {
        const decoded: IJwtPayload = jwtDecode(accessToken);
        set({ manager: decoded });
        set({ accessToken });
      },
      logout: () => {
        localStorage.removeItem('auth-storage');
        set({ accessToken: null, manager: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        accessToken: state.accessToken,
        manager: state.manager,
      }),
    },
  ),
);
