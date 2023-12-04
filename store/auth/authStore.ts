import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

type AuthState = {
  token: string | null;
  setToken: (newToken: string) => Promise<void>;
  removeToken: () => Promise<void>;
  initializeToken: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: async (newToken: string) => {
    await SecureStore.setItemAsync("user_token", newToken);
    set({ token: newToken });
  },
  removeToken: async () => {
    await SecureStore.deleteItemAsync("user_token");
    set({ token: null });
  },
  initializeToken: async () => {
    const storedToken = await SecureStore.getItemAsync("user_token");
    if (storedToken) {
      set({ token: storedToken });
    }
  },
}));

export const isSignedIn = () => {
  const state = useAuthStore.getState();
  return Boolean(state.token);
};

export default useAuthStore;
