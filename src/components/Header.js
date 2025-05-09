import React, { useEffect } from "react";
import UserIcon from "../assets/user.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const { uid, email, displayName,photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //Unsubscribe when component unmounts
    return () => unsubscribe()
  }, []);

  return (
    <>
      <div className="w-screen flex justify-between absolute px-8 py-2 bg-gradient-to-b from-black z-10">
        <img
          className="w-44 "
          src={LOGO} 
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
