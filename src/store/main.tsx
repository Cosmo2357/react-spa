import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface MainState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

export const useMainStore = create<MainState>(
  
  (set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated?: boolean;
}

interface UserState {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

export const useUserDataStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      login: (userData) =>
        set(() => ({
          user: { ...userData, isAuthenticated: true },
        })),

      logout: () =>
        set(() => ({
          user: null,
        })),

      updateUser: (updatedData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedData } : state.user,
        })),
    }),
    {
      name: "user-storage", // unique name
      //getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
