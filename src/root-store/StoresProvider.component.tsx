import React, { createContext } from 'react';

import { HomeManagerStore } from '../home-manager';

export const stores = {
  homesManager: new HomeManagerStore()
};

export type RootStore = typeof stores;

export const StateContext = createContext<RootStore>(stores);

export const StoresProvider = ({ children }: any) => {
  return <StateContext.Provider value={stores}>{children}</StateContext.Provider>;
};
