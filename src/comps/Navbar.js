import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  const Logout = () => {
    localStorage.removeItem("_cnkey");
  };
  return (
    <>
      <div className="w-full h-auto py-3 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <NavLink to={"/"}>
              <div className="flex items-center justify-center text-sm">
                <span className="text-blue-600 font-bold p-2 border-2 border-blue-600 rounded-full mr-1">
                  CN
                </span>{" "}
                CollegeNotes
              </div>
            </NavLink>
            <div className="flex items-center gap-5 text-sm">
              <NavLink
                className="font-bold hover:text-blue-600"
                to={"/aboutus"}
              >
                About
              </NavLink>
              {user == null ? (
                ""
              ) : user ? (
                <a href="/">
                  <button
                    onClick={Logout}
                    className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                    type="button"
                  >
                    <img className="w-5 h-5" src="/logout.svg" />
                  </button>
                </a>
              ) : (
                <NavLink to={"/auth/login"}>
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                    type="button"
                  >
                    Login
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
