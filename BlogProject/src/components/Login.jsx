import React, { useState } from "react";
import { login as authLogin } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "./Button";
import Input from "./Input";
import { useForm } from "react-hook-form";
import Logo from "./Logo.jsx";

import authService from "../appwrite/auth";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const Login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%"></Logo>
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign in Into Your Account.
      </h2>
      <p className="mt-2 text-center text-base text-black/50">
        Dont have any account? &nbsp;
        <Link
          to="/signup"
          className="font-medium text-primary transition-all durationn-200 hover:underline"
        >
          Click to Sign Up
        </Link>
      </p>
      {error && <p className="text-red-700 text-center mt-8">{error}</p>}
      <form onSubmit={handleSubmit(Login)} className="mt-8">
        <div className="space-y-2">
          <Input
            label="Email:"
            placeholder="Enter your EmailID"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Please enter a valid email address",
              },
            })}
          />
          <Input
            label="Password:"
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="Submit" className="w-full">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
