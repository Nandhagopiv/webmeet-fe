import { Fragment } from "react/jsx-runtime";
import Navbar from "./Navbar";
import { DataContext } from "../context/dataContextProrvider";
import { useContext } from "react";

const Myaccount = () => {
  const { user, setUser, allUsers, setAllUsers } = useContext(DataContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <Fragment>
      <Navbar one={false} two={false} three={false} four={true} five={false} />
      <main className="fixed left-[18%] w-5/6 flex justify-center h-full items-center bg-black">

        {user ? (
          <div className="bg-[#363636] shadow-md rounded-lg p-8 flex flex-col items-center space-y-5">
            <h1 className="text-2xl font-semibold text-gray-200">Logout of Your Account</h1>
            <p className="text-gray-200 text-center">
              Are you sure you want to log out? You’ll need to log in again to access your account.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#363636] shadow-md rounded-lg p-8 flex flex-col items-center space-y-5">
            <h1 className="text-2xl font-semibold text-gray-200">Login to Your Account</h1>
            <p className="text-gray-200 text-center">
              Click the button below to log in and access your account.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleLogin}
                className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default Myaccount;
