import { useContext } from 'react';
import { RootStore, StateContext } from './StoresProvider.component';

export const useStores = () => {
  return useContext(StateContext) as RootStore;
};

export const useHomesManagerStore = () => useStores().homesManager;
