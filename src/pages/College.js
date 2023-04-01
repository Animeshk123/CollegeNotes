import Input from "../comps/Input";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../comps/Navbar";

const College = ({ user, SetProgress }) => {
  const [value, setValue] = useState("");
  const [colleges, setColleges] = useState([]);
  const [oriColleges, setOriColleges] = useState([]);
  const [SearchError, setSearchError] = useState({
    error: false,
    message: "",
  });
  const Open = {
    status: true,
    Icon: "/up.svg",
  };
  const Close = {
    status: false,
    Icon: "/down.svg",
  };
  const [DropDownState, setDropDownState] = useState(Close);
  const handleChange = (e) => {
    setValue(e.target.value);
    SetProgress(40);
    if (e.target.value) {
      setSearchError({
        error: false,
        message: "Please Enter a valid Name...",
      });

      const FillterColleges = colleges.filter((college) => {
        return (
          college.collegeName
            .toUpperCase()
            .includes(e.target.value.toUpperCase()) ||
          college.collegeCity
            .toUpperCase()
            .includes(e.target.value.toUpperCase()) ||
          college.collegeState
            .toUpperCase()
            .includes(e.target.value.toUpperCase()) ||
          college.collegeCountry
            .toUpperCase()
            .includes(e.target.value.toUpperCase()) ||
          college.collegeCode
            .toUpperCase()
            .includes(e.target.value.toUpperCase())
        );
      });
      if (FillterColleges.length > 0) {
        setSearchError({
          error: false,
          message: "Please Enter a valid Name...",
        });
        setColleges(FillterColleges);
      } else {
        setSearchError({
          error: true,
          message: "Please Enter a valid Name...",
        });
        setColleges(oriColleges);
      }

      setDropDownState(Open);
    } else {
      setDropDownState(Close);
      setColleges(oriColleges);
      setSearchError({
        error: true,
        message: "Please Enter a valid Name...",
      });
    }
    SetProgress(100);
  };
  const openDropdown = () => {
    if (DropDownState.status) {
      setDropDownState(Close);
    } else {
      setDropDownState(Open);
    }
  };

  const getColleges = async () => {
    const ApiReq = await fetch(
      `${process.env.REACT_APP_HOST}/register/colleges`
    );
    const ApiRes = await ApiReq.json();
    setColleges(ApiRes);
    setOriColleges(ApiRes);
  };
  useEffect(() => {
    SetProgress(50);
    getColleges();
    SetProgress(100);
  }, []);
  return (
    <>
      <Navbar user={user} />
      <div className="w-full h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-center mt-32 text-3xl font-extrabold lg:text-5xl sm:text-4xl">
            Select Your College
          </h1>
          <form className="mt-12">
            <div className="block max-w-xl mx-auto relative">
              <Input
                Type="text"
                placeholder="Type Your College Name here..."
                value={value}
                Name="Search"
                required={true}
                OnChange={handleChange}
                error={SearchError.error}
                errorMessage={SearchError.message}
              />
              <button
                className={`absolute ${
                  SearchError.error ? "Verti" : ""
                } verticalCenter right-14 sm:right-16 mr-2`}
                type="button"
                onClick={openDropdown}
              >
                <img
                  src={DropDownState.Icon}
                  alt="expend more"
                  className="w-5 h-5"
                />
              </button>
            </div>
            <div
              className={`${
                DropDownState.status ? "block" : "hidden"
              } max-h-52 overflow-auto mx-auto w-3/4 sm:max-w-md bg-whitesmoke rounded-lg shadow-lg p-2`}
            >
              {colleges.map((college) => {
                return (
                  <NavLink
                    className="block w-full py-1 mb-2 rounded-lg px-3 hover:bg-slate-300 hover:border-l-4 hover:border-blue-600"
                    key={college.id}
                  >
                    <div className="w-full flex items-center justify-between gap-4">
                      <img
                        className="w-10 rounded-full h-10 object-cover"
                        src={college.collegePhoto}
                        alt={college.collegeName}
                      />
                      <div className="flex-1">
                        <h1 className="capitalize font-bold">
                          {college.collegeName}
                        </h1>
                        <p className="text-xs capitalize">
                          {college.collegeCity}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
              <div className="block p-2 bg-slate-200 rounded-full">
                <p className="text-xs text-center font-bold">
                  Not Getting Your College ?{" "}
                  <NavLink className="text-blue-600" to={"/register/college"}>
                    click here...
                  </NavLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default College;
