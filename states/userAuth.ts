import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  nascimento: string;
  numero: string;
  avatar: string;
  is_active: boolean;
  empresas: []
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: any) => void;
  logout: () => void;
}

interface AuthPreRegister {
  preRegistration: any | null;
  setPreRegister: (preRegistration: any) => void;
  clearPreRegister: () => void;
}

export const usePreRegister = create<AuthPreRegister>()(
  persist(
    (set) => ({
      preRegistration: null,
      setPreRegister: (preRegistration) => set({ preRegistration }),
      clearPreRegister: () => set({ preRegistration: null }),
    }),
    { name: "horizonPreRegistration" },
  ),
);

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: "horizon-auth" },
  ),
);