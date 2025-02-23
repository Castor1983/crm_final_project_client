import { GroupInterface } from './group.interface.ts';

export interface GroupsStateInterface {
  groups: GroupInterface[];
  newGroup: string;
  setGroups: (groups: GroupInterface[]) => void;
  setNewGroup: (newGroup: string) => void;
}
