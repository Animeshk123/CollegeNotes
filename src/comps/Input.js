import { useState } from "react";

const Input = (props) => {
  const showPassword = {
    Icon: "/off.svg",
    Type: "text",
  };

  const hidePassword = {
    Icon: "/on.svg",
    Type: props.Type,
  };

  const [InputStyle, setInputStyle] = useState(hidePassword);
  const changeInput = () => {
    if (InputStyle.Type === "password") {
      setInputStyle(showPassword);
    } else {
      setInputStyle(hidePassword);
    }
  };
  return (
    <div className="w-4/5 mb-3 mx-auto relative">
      <input
        className={`block py-2 w-full px-4 border-2 bg-slate-200 focus:bg-white ${
          !props.error
            ? "border-slate-400 focus:border-slate-800"
            : "border-red-500"
        } outline-none rounded mx-auto`}
        type={InputStyle.Type}
        name={props.Name}
        placeholder={props.placeholder}
        required={props.required}
        value={props.value}
        onChange={props.OnChange}
      />
      {(props.Name === "Password" || props.Name === "CPassword") && (
        <button
          type="button"
          className={`absolute right-3 z-10 cursor-pointer ${props.error ? "Verti":""} verticalCenter`}
          onClick={changeInput}
        >
          <img className="w-5 h-5" src={InputStyle.Icon} alt="show" />
        </button>
      )}

      <p
        className={`w-full text-xs ${
          props.error ? "block" : "hidden"
        } mx-auto mt-1 text-red-500`}
      >
        {props.errorMessage}
      </p>
    </div>
  );
};

export default Input;
