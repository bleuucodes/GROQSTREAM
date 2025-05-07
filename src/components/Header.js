import React from "react";
import UserIcon from "../assets/user.png";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <>
      <div className="w-screen flex justify-between absolute px-8 py-2 bg-gradient-to-b from-black z-10">
        <img
          className="w-44 "
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="NetflixLogo"
        />
        {user && (
          <div className="flex items-center p-2">
            <img
              className="w-8 h-8 rounded-sm mr-4"
              alt="usericon"
              src={UserIcon}
            />
            <button
              onClick={handleSignout}
              className="text-white bg-red-600 p-1 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
