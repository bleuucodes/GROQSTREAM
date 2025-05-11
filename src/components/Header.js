import React, { useEffect } from "react";
import UserIcon from "../assets/user.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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
        const { uid, email, displayName, photoURL } = user;
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
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="w-screen flex justify-between absolute px-8 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-44 " src={LOGO} alt="NetflixLogo" />
      {user && (
        <div className="flex items-center">
          {showGptSearch && (
            <select
              className="px-2 py-1 m-2 bg-gray-900 text-white "
              onChange={handleLanguageChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select Language
              </option>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select> 
          )}
          <img
            className="w-8 h-8 rounded-sm mr-4"
            alt="usericon"
            src={UserIcon}
          />
          <button
            className="py-1 px-6 mr-4 bg-[#0f791fdb] text-white rounded-sm"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page" :"GPT Search"}
          </button>

          <button
            onClick={handleSignout}
            className="text-white px-2 py-1 rounded-sm cursor-pointer bg-[#e7d7d73c] "
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
