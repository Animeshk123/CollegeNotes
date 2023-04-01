import Welcome from "./Welcome";
import { useEffect } from "react";
import College from "./College";

const Home = ({ user, SetProgress }) => {
  useEffect(() => {
    SetProgress(100);
  }, [SetProgress]);
  const User = user.user;
  return <>{User == null ? (""): User ? <College SetProgress={SetProgress} user={User}/> : <Welcome />}</>;
};

export default Home;
