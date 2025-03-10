import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface User {
  Fullname: string;
  Username: string;
  avatar: {
    url: string;
  };
  role: string;
  email: string;
  _id: string;
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
    _id: "",
    Fullname: "",
    Username: "",
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
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
