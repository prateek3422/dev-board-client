import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  name: string;

  avatar: {
    url: string;
  };
  role: string;
  email: string;

}
interface AuthState {
  auth: {
    isAuth: boolean;
    user: User;
  };
  signIn: (user: User) => void;
  signOut: () => void;
}

let initialState = {
  isAuth: false,
  user: {
    name: "",
    avatar: {
      url: "",
    },
    role: "",
    email: "",
  },
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        auth: initialState,
        signIn: (user) => set(() => ({ auth: { isAuth: true, user: user } })),
        signOut: () => set(() => ({ auth: initialState })),
      }),
      {
        name: "auth",
        getStorage: () => sessionStorage,
      }
    )
  )
);
