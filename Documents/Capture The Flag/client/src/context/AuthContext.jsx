// import { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // stores logged-in user info

//   const login = (userData) => {
//     setUser(userData); // save user to global state
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // easy hook to use auth anywhere
// export const useAuth = () => useContext(AuthContext);


import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // wait for /me request

  // 🔥 Auto-check session on first load
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me"); // backend verifies cookie
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await api.post("/auth/logout"); // clears cookie backend
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
