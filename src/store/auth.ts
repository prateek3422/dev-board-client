import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  fullname: string;
  LoginType: string;
  username: string;
  avatar: {
    url: string;
    public_id: string;
  };
  role: string;
  email: string;
  isEmailVerified: boolean;
  refreshToken: string;
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
    fullname: "",
    username: "",
    avatar: {
      url: "",
      public_id: "",
    },
    role: "",
    email: "",
    isEmailVerified: false,
    refreshToken: "",
    LoginType: "",
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
