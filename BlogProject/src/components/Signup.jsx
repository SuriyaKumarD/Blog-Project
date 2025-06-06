import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthService from "../appwrite/auth";
import login from "../store/authSlice";
import { useForm } from "react-hook-form";
import Logo from "./Logo";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await AuthService.createAccount(data);
      if (userData) {
        const userDataAfterSignUp = await AuthService.getCurrentUser();
        if (userDataAfterSignUp) {
          dispatch(login(userDataAfterSignUp));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%"></Logo>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in Into Your Account.
        </h2>
        <p className="mt-2 text-center text-base text-black/50">
          Already have an account? &nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all durationn-200 hover:underline"
          >
            Sign In
          </Link>
          {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
        </p>
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="FullName"
              placeholder="Enter your Name"
              {...register("name", {
                required: true,
              })}
            />
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
              label="Password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />
          </div>
          <Button type="Submit" className="w-full">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
