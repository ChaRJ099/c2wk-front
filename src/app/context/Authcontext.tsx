"use client";
import React, { useReducer, createContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { CredentialsInterface, User, UserIDs } from "../interfaces/interfaces";
import { useRouter, usePathname } from "next/navigation";
import { getOneUser } from "../services/auth.services";

const apiUrl = "http://20.119.34.167:5001";

const initialState = {
  user: null,
};

export type AuthContextType = {
  user: any;
  login: (credentials: CredentialsInterface) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [userIDs, setUserIDs] = React.useState<UserIDs>({
    id: 0,
    mail: "",
  });
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const login = async (credentials: CredentialsInterface) => {
    await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data);
        const decoded: any = jwtDecode(data);

        setUserIDs({ id: decoded.id, mail: decoded.mail });
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const redirectToHome = () => {
      router.push("/");
    };
    if (userIDs.id !== 0) {
      getOneUser(userIDs.id)
        .then((response) => response.json())
        .then((data: User) => {
          if (!data) {
            router.replace("/connexion");
          } else {
            dispatch({
              type: "LOGIN",
              payload: { mail: userIDs.mail, id: userIDs.id },
            });
          }
          if (data.role === "user") {
            redirectToHome();
          }
          if (data.role === "admin") {
            setIsAdmin(true);
            router.push("/admin");
          }
        });
    }
  }, [router, userIDs]);

  useEffect(() => {
    if (!isAdmin && pathname.includes("admin")) {
      // router.replace("/");
    }
  }, [pathname, isAdmin, router]);

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
