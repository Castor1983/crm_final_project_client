import { create } from 'zustand';

import { SessionStateInterface } from '../interfaces/sessionState.interface.ts';

const useSessionStore = create<SessionStateInterface>()(set => ({
  isSessionExpired: false,
  setSessionExpired: () => set({ isSessionExpired: true }),
  resetSession: () => set({ isSessionExpired: false }),
}));

export default useSessionStore;
