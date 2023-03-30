const AuthC = ({ children, auth,OnSubmit }) => {
  return (
    <form onSubmit={OnSubmit} className="setCenter shadow-lg rounded p-6 xl:w-1/3 lg:w-2/4 md:w-2/3 w-full">
      <div className="flex items-center justify-center gap-2 mb-8">
        <h1 className="font-bold p-1 border-2 border-blue-500 text-blue-500 rounded-full">
          CN
        </h1>
        <h1 className="capitalize font-bold">{auth}</h1>
      </div>
      {children}
    </form>
  );
};
export default AuthC;
