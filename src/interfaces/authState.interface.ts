import { IJwtPayload } from './jwt-payload.interface.ts';

export interface AuthState {
  manager: IJwtPayload | null;
  accessToken: string | null;
  refreshTimer: NodeJS.Timeout | null;
  login: (token: string) => void;
  logout: () => void;
}
