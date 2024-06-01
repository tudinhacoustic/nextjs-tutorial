import { handleLogin } from "../actions";
import React from "react";

const Cookies = async () => {
  const user = { email: "tudinh" };
  await handleLogin(user);
  return <div>Cookies</div>;
};

export default Cookies;
