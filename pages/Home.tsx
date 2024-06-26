/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useState } from "react";
import Input from "@/components/Input";

export default function Home() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "registre" : "login"
    );
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleuserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-center bg-no-repeat bg-cover">
      <div className="bg-black w-full justify-center h-full lg:bg-opacity-50">
        <nav className=" px-12 py-7">
          <img className="w-48" src="/images/logo.png" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black md:w-full bg-opacity-70 px-16 py-5 self-center mt-2 lg:w-2/4 lg:max-w-md rounded-md ">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Registre"}
            </h2>
            <div className=" flex flex-col gap-4">
              {variant === "registre" && (
                <Input
                  id="name"
                  value={username}
                  label="username"
                  onChange={handleuserNameChange}
                  type="username"
                />
              )}
              <Input
                id="email"
                value={email}
                label="Email"
                onChange={handleEmailChange}
                type="email"
              />
              <Input
                id="password"
                value={password}
                label="Password"
                onChange={handlePasswordChange}
                type="password"
              />
            </div>
            <button className="bg-red-600  w-full  py-3  text-white rounded-md  mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "login " : "Registre"}
            </button>
            <p className="text-neutral-500 mt-12  ">
              {variant === "login"
                ? "First time using Netflix ?"
                : "Already Have an account ?"}
              <span
                onClick={toggleVariant}
                className="cursor-pointer text-white ml-2"
              >
                Create an account{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
