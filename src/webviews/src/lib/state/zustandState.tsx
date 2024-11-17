import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'
import VSCodeAPI from '../VSCodeAPI'

type VSCodeStorage = {
  getItem: (name: string) => any | null
  setItem: (name: string, value: any) => void
  removeItem: (name: string) => void
}

export default function createVSCodeZustand<T extends object>(
  name: string,
  createState: StateCreator<T>
) {
  const storage: VSCodeStorage = {
    getItem: (name: string) => {
      const state = VSCodeAPI.getState();
      return state[name] || null;
    },
    setItem: (name: string, value: any) => {
      const currentState = VSCodeAPI.getState();
      if (JSON.stringify(currentState[name]) !== JSON.stringify(value)) {
        VSCodeAPI.setState({ ...currentState, [name]: value });
      }
    },
    removeItem: (name: string) => {
      const state = VSCodeAPI.getState();
      const newState = { ...state };
      delete newState[name];
      VSCodeAPI.setState(newState);
    },
  };

  const persistOptions: PersistOptions<T> = {
    name,
    storage: createJSONStorage(() => storage),
    partialize: (state) => {
      const persistedState = { ...state };
      Object.keys(persistedState).forEach((key) => {
        if (typeof persistedState[key as keyof T] === 'function') {
          delete persistedState[key as keyof T];
        }
      });
      return persistedState;
    },
  };

  return create<T>()(
    persist(createState, persistOptions)
  );
}
