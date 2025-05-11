import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validData";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import UserIcon from "../assets/user.png"
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSignButtonClick = () => {
    //Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // SignIN Signup form
    if (!isSignInForm) {
      //signup user
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
        name.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: {UserIcon},
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " signedup__" + errorMessage);
        });
    } else {
      //sigin
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " signedin__" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BG_URL}
          alt="Login Background Image"
          className="min-h-screen min-w-screen object-cover"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-md absolute py-8 px-12 text-white bg-[#000000d7] w-[28rem] my-32 mx-auto right-0 left-0"
      >
        <div className="w-80 m-4">
          <h1 className="font-bold text-3xl my-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="border border-[#ffffff6a] bg-transparent p-4 my-2 w-full rounded-sm"
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email or mobile number"
            className="border border-[#ffffff6a] bg-transparent p-4 my-2 w-full rounded-sm"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="border border-[#ffffff6a] bg-transparent p-4 my-2 w-full rounded-sm"
          />

          <p className="py-2 text-red-600">{errorMessage}</p>

          <button
            className=" rounded-sm p-2 my-2 font-semibold bg-[#f31d1d] text-white w-full"
            onClick={handleSignButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign up now."
              : "Already registered? Sign in now."}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
