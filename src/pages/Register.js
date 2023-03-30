import AuthC from "../comps/AuthC";
import Input from "../comps/Input";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Auth } from "../Context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ SetProgress }) => {
  const AuthStauts = useContext(Auth);
  const navigate = useNavigate();

  useEffect(() => {
    SetProgress(100);
  }, [SetProgress]);
  const [Data, setData] = useState({
    Email: "",
    Password: "",
    CPassword: "",
  });
  const [EmailError, setEmailError] = useState({
    error: false,
    message: "",
  });
  const [PasswordError, setPasswordError] = useState({
    error: false,
    message: "",
  });
  const [CPasswordError, setCPasswordError] = useState({
    error: false,
    message: "",
  });
  const handleChange = (e) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Data.Password !== Data.CPassword) {
      setCPasswordError({
        error: true,
        message: "Passwords Should match!!",
      });
    } else {
      setCPasswordError({
        error: false,
        message: "",
      });
      setPasswordError({
        error: false,
        message: "",
      });
      setEmailError({
        error: false,
        message: "",
      });
      SetProgress(40);
      const ApiReq = await fetch(`${process.env.REACT_APP_HOST}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Data.Email, password: Data.Password }),
      });
      SetProgress(80);
      const ApiRes = await ApiReq.json();
      if (ApiReq.status === 201) {
        localStorage.setItem("_cnkey", ApiRes.key);
        AuthStauts.setAuth({
          user: true,
          key: ApiRes.key,
        });
        navigate("/");
      } else {
        if (ApiRes.error.code) {
          setEmailError({
            error: true,
            message: ApiRes.error.message,
          });
        } else {
          console.log(ApiRes);
        }
      }
    }
    SetProgress(100);
  };
  return (
    <>
      <div className="container px-4">
        <AuthC OnSubmit={handleSubmit} auth="Register">
          <Input
            Type="email"
            Name="Email"
            placeholder="Enter Your Email..."
            required={true}
            value={Data.Email}
            OnChange={handleChange}
            error={EmailError.error}
            errorMessage={EmailError.message}
          />
          <Input
            Type="password"
            Name="Password"
            placeholder="Enter Your Password..."
            required={true}
            value={Data.Password}
            OnChange={handleChange}
            error={PasswordError.error}
            errorMessage={PasswordError.message}
          />
          <Input
            Type="password"
            Name="CPassword"
            placeholder="Confirm Your Password..."
            required={true}
            value={Data.CPassword}
            OnChange={handleChange}
            error={CPasswordError.error}
            errorMessage={CPasswordError.message}
          />

          <button
            className="block mx-auto py-2 text-white rounded hover:bg-blue-500 px-4 w-4/5 mt-6 bg-blue-600"
            type="submit"
          >
            Register
          </button>
          <p className="mt-4 text-center text-sm">
            Already have an Account ?{" "}
            <NavLink to={"/auth/login"} className="text-blue-600">
              click here
            </NavLink>
          </p>
        </AuthC>
      </div>
    </>
  );
};

export default Register;
