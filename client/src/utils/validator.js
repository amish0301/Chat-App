import { isValidUsername } from "6pp";

export const userNameValidator = (username) => {
  if (username.length && !isValidUsername(username))
    return { isValid: false, errorMessage: "Username is Invalid" };
};
