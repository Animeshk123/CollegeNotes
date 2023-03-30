import { createContext, useEffect, useState } from "react";

const Auth = createContext();

const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState({ user: null });
  const key = localStorage.getItem("_cnkey") || null;

  const getUser = async () => {
    if (key) {
      const ApiReq = await fetch(
        `${process.env.REACT_APP_HOST}/login?key=${key}`,
        {
          method: "GET",
        }
      );
      const ApiRes = await ApiReq.json();
      if (ApiReq.status === 200) {
        setAuth(ApiRes);
      } else {
        setAuth({ user: false });
      }
    } else {
        setAuth({user:false});
    }
  };

  useEffect(() => {
    getUser();
  },[]);

  return <Auth.Provider value={{ auth, setAuth }}>{children}</Auth.Provider>;
};

export default AuthContext;
export { Auth };
