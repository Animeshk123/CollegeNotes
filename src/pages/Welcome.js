import { NavLink } from "react-router-dom";
import Navbar from "../comps/Navbar";

const Welcome = () => {
  return (
    <>
      <div className="w-full min-h-screen">
        <Navbar user={false} />
        <div className="setCenter setCenterWidth w-1/2 px-4">
          <h1 className="text-center text-3xl font-extrabold lg:text-5xl sm:text-4xl">
            Welcome To CollegeNotes Help Someone & Be Helped By Someone
          </h1>
          <NavLink to={"/auth/register"}>
            <button
              type="button"
              className="block mx-auto mt-8 p-2 px-4 bg-blue-600 text-white hover:bg-blue-500 rounded"
            >
              Join Now
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Welcome;
