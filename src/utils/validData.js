export const checkValidData = ( email, password) => {

//   const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );

//   if (!isNameValid) return "Name is not valid";
  if (!isEmailValid) return "Email Address is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
