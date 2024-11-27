import React, { useState, useEffect } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [userForm, setUserForm] = useState();

  const navigate = useNavigate();

  // Handle Actions

 
  function handleInputEmail(e) {
    setUserForm({ ...userForm, email: e.target.value });
  }

  function handleInputPassword(e) {
    setUserForm({ ...userForm, password: e.target.value });
  }

  const handleLogin = async () => {
    try {
      // const response = await fetch("https://task4-backend-ebgi.onrender.com/api/users/login",
      const response = await fetch("https://task4-backend-ebgi.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userForm.email,
          password: userForm.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Successful login: " + JSON.stringify(data));
        toast.success('Successsfully Login!')

        navigate("/table", { state: { email: userForm.email } });
      } else {
        console.log("Error: " + data.message);
        toast.error("Error: " + data.message)
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col px-4 md:px-0">
      <Card className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto flex items-center my-10 md:my-5 p-4 md:px-10 px-6">
        <p className="mt-5 text-center text-lg sm:text-xl">Login</p>

        <div className="my-5 w-full">
          {/* Input Email */}
          <div className="my-3 w-full">
            <Input
              value={userForm?.email}
              onChange={handleInputEmail}
              isRequired
              size="sm"
              label="Email"
              variant="bordered"
              placeholder="Enter your email"
              className="w-full text-sm sm:text-base"
            />
          </div>
          {/* Input Password */}
          <div className="my-3 w-full">
            <Input
              value={userForm?.password}
              onChange={handleInputPassword}
              isRequired
              size="sm"
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility">
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="w-full text-sm sm:text-base"
            />
          </div>
        </div>
        <Button className="w-full md:w-40" size="md" onClick={handleLogin}>
          {/* <Link to="/table" className="w-full text-center text-sm sm:text-base"> */}
          Sign In
          {/* </Link> */}
        </Button>
      </Card>
      <p className="text-xs text-center mt-4 sm:text-sm">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-500 hover:underline font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
