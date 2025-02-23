import { create } from 'zustand/index';

import { GroupInterface } from '../interfaces/group.interface.ts';
import { GroupsStateInterface } from '../interfaces/groupsState.interface.ts';

export const useGroupsStore = create<GroupsStateInterface>(set => ({
  groups: [],
  newGroup: '',
  setGroups: (groups: GroupInterface[]) => set({ groups }),
  setNewGroup: (newGroup: string) => set({ newGroup }),
}));
