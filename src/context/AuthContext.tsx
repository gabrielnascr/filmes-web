import React, { createContext, useContext, useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { toast } from "react-toastify";

import AuthService from "../services/auth";
import { useRouter } from "next/router";

type AuthProviderProps = {
  children: React.ReactNode;
};

interface User {
  id: number;
  name: string;
  email: string;
}

interface SignInRequestProps {
  email: string;
  password: string;
}


interface AuthContextType {
  user: User;
  isLoading: boolean;
  signIn: (data: SignInRequestProps) => Promise<void>;
  logout: () => void;
  addUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({ children }: AuthProviderProps) {
  const route = useRouter();

  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    const { "@filmesweb.token": storedToken } = parseCookies();
    const { "@filmesweb.user": storedUser } = parseCookies();

    if (storedToken && storedUser) {
      (async function () {
        await AuthService.getProfile().then((response) => {
          setUser(response.data);
        });
      })();
    }

    setIsLoading(false);
  }, []);

  async function signIn(data: SignInRequestProps) {
    await AuthService.authenticate(data)
      .then(({ loggedUser, token }) => {
        setUser(loggedUser);
        setCookie(undefined, "@filmesweb.token", token, {
          maxAge: 60 * 60 * 24,
        });
        setCookie(undefined, "@filmesweb.user", JSON.stringify(loggedUser), {
          maxAge: 60 * 60 * 24,
        });

        toast("Você foi autenticado com sucesso", { type: "success" });

        route.push("/");
      })
      .catch(() => {
        toast("Credenciais inválidas", { type: "error" });
      });
  }

  async function logout() {
    destroyCookie(undefined, "@filmesweb.token");
    destroyCookie(undefined, "@filmesweb.user");

    route.push("/login");
    setUser({} as User);
  }

  function addUser(user: User) {
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, logout, addUser }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("");
  }

  return context;
};

export { AuthProvider, useAuth };
