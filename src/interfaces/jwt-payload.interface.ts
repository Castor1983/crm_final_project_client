import { ManagerRole } from '../enums/managerRole.enum.ts';

export interface IJwtPayload {
  managerId: string;
  surname: string;
  role: ManagerRole;
}
