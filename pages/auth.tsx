/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from "react";
import Input from "@/components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // Changed from username to name
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "registre" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const registre = useCallback(async () => {
    try {
      await axios.post("/api/registre", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-center bg-no-repeat bg-cover">
      <div className="bg-black w-full justify-center h-full lg:bg-opacity-50">
        <nav className="px-12 py-7"></nav>
        <div className="flex justify-center">
          <div className="bg-black md:w-full bg-opacity-70 px-16 py-5 self-center mt-2 lg:w-2/4 lg:max-w-md rounded-md ">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Registre"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "registre" && (
                <Input
                  id="name"
                  value={name}
                  label="Name"
                  onChange={handleNameChange}
                  type="text"
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
            <button
              onClick={variant === "login" ? login : registre}
              className="bg-red-600 w-full py-3 text-white rounded-md mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "login" : "Registre"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="cursor-pointer text-white ml-2"
              >
                {variant === "login" ? "Create an account" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
