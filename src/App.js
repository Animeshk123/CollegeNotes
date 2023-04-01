import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Auth } from "./Context/AuthContext";
import { useContext } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import RegisterCollege from "./pages/RegisterCollege";

const App = () => {
  const AuthData = useContext(Auth);
  const [progress, setProgress] = useState(0);
  return (
    <>
      <LoadingBar
        color="red"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              user={AuthData.auth}
              progress={progress}
              SetProgress={setProgress}
            />
          }
        />
        <Route
          exact
          path="/register/college"
          element={
            <RegisterCollege
              user={AuthData.auth}
              progress={progress}
              setProgress={setProgress}
            />
          }
        />
        <Route
          exact
          path="/auth/login"
          element={<Login progress={progress} SetProgress={setProgress} />}
        />
        <Route
          exact
          path="/auth/register"
          element={<Register progress={progress} SetProgress={setProgress} />}
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
