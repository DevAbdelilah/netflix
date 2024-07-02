/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from "react";
import Input from "@/components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Auth() {
  const router = useRouter();
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
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

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
        <nav className="px-12 py-7">
          <img className="w-48" src="/images/logo.png" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black md:w-full bg-opacity-70 px-16 py-5 self-center mt-2 lg:w-2/4 lg:max-w-md rounded-md ">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Registre"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "registre" && (
                <Input
                  id="name"
                  value={name} // Changed from username to name
                  label="Name" // Changed from username to name
                  onChange={handleNameChange} // Changed from handleuserNameChange to handleNameChange
                  type="text" // Changed from username to text
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
