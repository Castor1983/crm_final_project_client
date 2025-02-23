import { create } from 'zustand';

import { LoaderStateInterface } from '../interfaces/loaderState.interface.ts';

const useLoaderStore = create<LoaderStateInterface>()(set => ({
  loading: false,
  setLoading: (status: boolean) => set({ loading: status }),
}));

export default useLoaderStore;
