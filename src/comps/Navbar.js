import { NavLink } from "react-router-dom";
const Navbar = ({ user }) => {
  return (
    <>
    <div className="w-full h-auto py-3 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {user ? (
              <></>
            ) : (
              <>
                <NavLink to={"/"}>
                  <div className="flex items-center justify-center text-sm">
                    <span className="text-blue-600 font-bold p-2 border-2 border-blue-600 rounded-full mr-1">
                      CN
                    </span>{" "}
                    CollegeNotes
                  </div>
                </NavLink>
                <div className="flex items-center gap-5 text-sm">
                  <NavLink className="font-bold hover:text-blue-600" to={"/aboutus"}>About</NavLink>
                  <NavLink to={"/auth/login"}>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500" type="button">Login</button>
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
