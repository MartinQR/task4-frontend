import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Input, Button, AvatarIcon, Avatar } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon";
import toast from "react-hot-toast";

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // Handle Functions

  function handleInputFirstName(e) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

    if (regex.test(e.target.value)) {
      setUser({ ...user, firstName: e.target.value });
    }
  }

  function handleInputLastName(e) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

    if (regex.test(e.target.value)) {
      setUser({ ...user, lastName: e.target.value });
    }
  }

  function handleInputEmail(e) {
    setUser({ ...user, email: e.target.value });
  }

  function handleInputPassword(e) {
    setUser({ ...user, password: e.target.value });
  }

  const handleSubmit = async () => {
    try {
      // const response = await fetch("http://localhost:5000/api/users/register",

      // 'https://task4-backend-ebgi.onrender.com/api/users/register'

      const response = await fetch(
        "https://task4-backend-ebgi.onrender.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password: user.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Successfully registered user: " + JSON.stringify(data));
        toast.success("Successfully registered user!");
        navigate("/");
      } else {
        console.log("Error: " + data.message);
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center h-screen flex-col ">
      <Card className="w-64 sm:w-72 md:w-80 h-auto flex items-center my-5">
        <p className="mt-5">Don't have an account? Sign up!</p>

        <div className="my-5">
          <div className="flex items-center justify-center">
            <Avatar
              icon={<AvatarIcon />}
              classNames={{
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                icon: "text-black/80",
              }}
            />
          </div>
          {/* Input Name */}
          <div className="my-3">
            <Input
              value={user?.firstName}
              isRequired
              size="sm"
              label="First Name "
              variant="bordered"
              placeholder="Enter your name"
              onChange={handleInputFirstName}></Input>
          </div>
          <div className="my-3">
            <Input
              value={user?.lastName}
              isRequired
              size="sm"
              label="Last Name"
              variant="bordered"
              placeholder="Enter your name"
              onChange={handleInputLastName}></Input>
          </div>
          {/* Input Email */}
          <div className="my-3">
            <Input
              isRequired
              size="sm"
              label="Email"
              variant="bordered"
              placeholder="Enter your email"
              onChange={handleInputEmail}></Input>
          </div>
          {/* Input PassWord */}
          <div className="my-3">
            <Input
              isRequired
              size="sm"
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              onChange={handleInputPassword}
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
              className="max-w-xs"
            />
          </div>
        </div>
        <Button onClick={handleSubmit} className="w-40 mb-5" size="md">
          Create Account
        </Button>
      </Card>
      <p className="text-xs">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-blue-500 hover:underline no-underline font-semibold">
          Log In
        </Link>
      </p>
    </div>
  );
}
