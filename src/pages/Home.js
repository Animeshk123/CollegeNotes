import Welcome from "./Welcome";
import { useEffect } from "react";

const Home = ({ user, SetProgress }) => {
  useEffect(() => {
    SetProgress(100);
  }, [SetProgress]);
  const User = user.user;
  return <>{User == null ? (""): User ? "hi user" : <Welcome />}</>;
};

export default Home;
