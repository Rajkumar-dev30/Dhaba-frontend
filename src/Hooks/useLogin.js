import { useState } from "react";
import { useAuthContext } from "./useAuthContex";
import axios from "axios";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);

  const login = async (userId, password) => {
    setError(null);
    // let user = JSON.parse(localStorage.getItem("user"));
    // const token = user.token;
    // console.log(token)
    try {
      const data = await axios.post(
        `https://kingsdhabaserver.onrender.com/admin/login`,
        { userId, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("user", JSON.stringify(data.data));
      dispatch({ type: "LOGIN", payload: data.data });
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return { login, error };
};

