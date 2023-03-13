import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import "./LoginUi.css";
import profile from "../../../assets/kingDhaba-sample.png";
import axios from "axios";

// IMPORTING DIFFERENT COMPONENTS
import { useLogin } from "../../../Hooks/useLogin";

const LoginUi = ()=> {
  const { login, error } = useLogin();
  const navigate = useNavigate();
  const [logError, setLogError] = useState(null);

  const [loginDetails, setLoginDetails] = useState({
    userId: "admin",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginDetails.password) {
      setLogError("Please enter a password");
      return;
    }
    
    await login(loginDetails.userId, loginDetails.password); 
    if (localStorage.getItem("user")) {
      navigate("/admin/dashboard");
    }
  };

  
  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <h1>Admin</h1>
            <br />
            <div>
              <input
                type="text"
                placeholder="userId"
                readOnly={true}
                className="name"
                name="userId"
                value={loginDetails.userId}
                onChange={handleChange}
              />
            </div>
            <div className="second-input">
              <Input
              className="name"
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginDetails.password}
                onChange={handleChange}
                placeholder="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      className="eye"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                // className="passInp"
              />
            </div>
             {logError && (
              <div style={{color:"red"}}>{logError}</div>
            )} 
            
            <div className="login-button">
              <button className="log-button" onClick={handleSubmit}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUi;
