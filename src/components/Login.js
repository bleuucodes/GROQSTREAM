import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_small.jpg"
          alt="Login Background Image"
          className="h-screen w-screen object-cover"
        />
      </div>
      <form className="rounded-md absolute py-8 px-12 text-white bg-[#000000d7] w-[28rem] my-32 mx-auto right-0 left-0">
        <div className="w-80 m-4">
          <h1 className="font-bold text-3xl my-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="border border-[#ffffff6a] bg-transparent p-4 my-2 w-full rounded-sm"
            />
          )}

          <input
            type="text"
            placeholder="Email or mobile number"
            className="border border-[#ffffff6a] bg-transparent p-4 my-2 w-full rounded-sm"
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-[#ffffff6a] bg-transparent p-4 my-2 w-full rounded-sm"
          />

          <button className=" rounded-sm p-2 my-2 font-semibold bg-[#f31d1d] text-white w-full">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign up now."
              : "Already registered! Sign in now."}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
