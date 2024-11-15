import React, { useState, useEffect } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Card className="w-80 h-80 flex items-center my-5">
        <p className="mt-5">Login</p>

        <div className="my-5">
          {/* Input Email */}
          <div className="my-3">
            <Input
              isRequired
              size="sm"
              label="Email"
              variant="bordered"
              placeholder="Enter your email"></Input>
          </div>
          {/* Input PassWord */}
          <div className="my-3">
            <Input
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
              className="max-w-xs"
            />
          </div>
        </div>
        <Button className="w-40" size="md">
          Sign In
        </Button>
      </Card>
      <p className="text-xs ">Don't have an account?
        <span><a href="#"> Sign up</a></span>
        
         </p>
    </div>
  );
}
