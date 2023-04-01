import { useEffect, useState } from "react";
import AuthC from "../comps/AuthC";
import { Navigate } from "react-router-dom";
import Input from "../comps/Input";
import { useNavigate } from "react-router-dom";
const RegisterCollege = ({ user, progress, setProgress }) => {
  useEffect(() => {
    setProgress(100);
  }, []);
  const Offensive = [
    /sex/gi,
    /porn/gi,
    /pornography/gi,
    /bitch/gi,
    /dick/gi,
    /Fuck/gi,
    /asshole/gi,
  ];
  const navigate = useNavigate();
  const [collegeData, setCollegeData] = useState({
    collegeName: "",
    collegeCity: "",
    collegeState: "",
    collegeCountry: "",
    collegeCode: "",
    collegePhoto: "",
  });
  const [error, setError] = useState({
    collegeName: {
      error: false,
      message: "",
    },
    collegeCity: {
      error: false,
      message: "",
    },
    collegeState: {
      error: false,
      message: "",
    },
    collegeCountry: {
      error: false,
      message: "",
    },
    collegeCode: {
      error: false,
      message: "",
    },
    collegePhoto: {
      error: false,
      message: "",
    },
  });
  const handleChange = (e) => {
    setCollegeData({
      ...collegeData,
      [e.target.name]: e.target.value,
    });
    if (e.target.value == "" || !(e.target.value)) {
      setError({
        ...error,
        [e.target.name]: {
          error: false,
          message: "Offensive Words!!",
        },
      });
    } else {
      for (let i = 0; i < Offensive.length; i++) {
        const offensiveWordsFound = e.target.value.match(Offensive[i]);
        if (offensiveWordsFound && offensiveWordsFound.length > 0) {
          setError({
            ...error,
            [e.target.name]: {
              error: true,
              message: "Offensive Words!!",
            },
          });
          setCollegeData({
            ...collegeData,
            [e.target.name] : ""
          })
        }
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(50);
    setError({
      collegeName: {
        error: false,
        message: "",
      },
      collegeCity: {
        error: false,
        message: "",
      },
      collegeState: {
        error: false,
        message: "",
      },
      collegeCountry: {
        error: false,
        message: "",
      },
      collegeCode: {
        error: false,
        message: "",
      },
      collegePhoto: {
        error: false,
        message: "",
      },
    });
    const ApiReq = await fetch(
      `${process.env.REACT_APP_HOST}/register/college`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collegeName: collegeData.collegeName,
          collegeCity: collegeData.collegeCity,
          collegeState: collegeData.collegeState,
          collegeCountry: collegeData.collegeCountry,
          collegeCode: collegeData.collegeCode,
          collegePhoto: collegeData.collegePhoto,
        }),
      }
    );
    setProgress(80);
    const ApiRes = await ApiReq.json();
    if (ApiReq.status == 201) {
      navigate("/");
    } else {
      setError({
        collegeName: {
          error: true,
          message: "SomeThing Went Wrong Please try again later",
        },
        collegeCity: {
          error: true,
          message: "SomeThing Went Wrong Please try again later",
        },
        collegeState: {
          error: true,
          message: "SomeThing Went Wrong Please try again later",
        },
        collegeCountry: {
          error: true,
          message: "SomeThing Went Wrong Please try again later",
        },
        collegeCode: {
          error: true,
          message: "SomeThing Went Wrong Please try again later",
        },
        collegePhoto: {
          error: true,
          message: "SomeThing Went Wrong Please try again later",
        },
      });
    }
  };
  const User = user.user;
  return (
    <>
      {User == null ? (
        ""
      ) : User ? (
        <>
          <AuthC OnSubmit={handleSubmit} auth="Register College">
            <Input
              Type="text"
              Name="collegeName"
              placeholder="Enter College Name Here..."
              required={true}
              value={collegeData.collegeName}
              OnChange={handleChange}
              error={error.collegeName.error}
              errorMessage={error.collegeName.message}
            />
            <Input
              Type="text"
              Name="collegeCity"
              placeholder="Enter College City Here..."
              required={true}
              value={collegeData.collegeCity}
              OnChange={handleChange}
              error={error.collegeCity.error}
              errorMessage={error.collegeCity.message}
            />
            <Input
              Type="text"
              Name="collegeState"
              placeholder="Enter College State Here..."
              required={true}
              value={collegeData.collegeState}
              OnChange={handleChange}
              error={error.collegeState.error}
              errorMessage={error.collegeState.message}
            />
            <Input
              Type="text"
              Name="collegeCountry"
              placeholder="Enter College Country Here..."
              required={true}
              value={collegeData.collegeCountry}
              OnChange={handleChange}
              error={error.collegeCountry.error}
              errorMessage={error.collegeCountry.message}
            />
            <Input
              Type="number"
              Name="collegeCode"
              placeholder="Enter College Code or Area Pin Code here..."
              required={true}
              value={collegeData.collegeCode}
              OnChange={handleChange}
              error={error.collegeCode.error}
              errorMessage={error.collegeCode.message}
            />
            <Input
              Type="text"
              Name="collegePhoto"
              placeholder="Paste Your College photo's Link Here..."
              required={true}
              value={collegeData.collegePhoto}
              OnChange={handleChange}
              error={error.collegePhoto.error}
              errorMessage={error.collegePhoto.message}
            />
            <button
              className="block mx-auto py-2 text-white rounded hover:bg-blue-500 px-4 w-4/5 mt-6 bg-blue-600"
              type="submit"
            >
              Regsiter College
            </button>
          </AuthC>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RegisterCollege;
