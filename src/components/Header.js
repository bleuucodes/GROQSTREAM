import React, { useEffect } from "react";
import UserIcon from "../assets/user.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../store/gptSlice";
import { changeLanguage } from "../store/configSlice";

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
    <div className="w-screen  absolute px-3 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
      <img className="w-32 md:w-44 mx-0" src={LOGO} alt="NetflixLogo" />
      {user && (
        <div className="flex items-center justify-center">
          {showGptSearch && (
            <select
              className="px-2 py-1 w-28 mx-3 bg-gray-900 text-white "
              onChange={handleLanguageChange}
              defaultValue=""
            >
              <option value="" disabled>
                 Language
              </option>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select> 
          )}
          <img
            className="w-8 h-8 rounded-sm mr-3"
            alt="usericon"
            src={UserIcon}
          />
          <button
            className="py-1 px-3 mr-3 bg-[#166d67] text-white rounded-sm"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page" :"GPT Search"}
          </button>

          <button
            onClick={handleSignout}
            className="text-white px-2 py-1 rounded-sm cursor-pointer bg-[#9d1515] "
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
