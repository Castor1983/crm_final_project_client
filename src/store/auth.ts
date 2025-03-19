import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthState } from '../interfaces/authState.interface.ts';
import { IJwtPayload } from '../interfaces/jwt-payload.interface.ts';
import { fetchRefresh } from '../requests/requests.ts';

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      manager: null,
      refreshTimer: null,

      login: accessToken => {
        const decoded: IJwtPayload = jwtDecode(accessToken);
        set({ manager: decoded, accessToken });

        const { refreshTimer } = useAuthStore.getState();
        if (refreshTimer) clearTimeout(refreshTimer);
        const now = Math.floor(Date.now() / 1000);
        const refreshTime = (decoded.exp - 60 - now) * 1000;

        if (refreshTime > 0) {
          const timer = setTimeout(() => {
            fetchRefresh();
          }, refreshTime);

          set({ refreshTimer: timer });
        }
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
