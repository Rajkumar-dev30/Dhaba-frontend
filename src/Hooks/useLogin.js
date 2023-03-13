import { useState } from "react";
import { useAuthContext } from "./useAuthContex";
import axios from "axios";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);

  const login = async (userId, password) => {
    setError(null);
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
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