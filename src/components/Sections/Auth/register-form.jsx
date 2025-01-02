import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

function RegisterForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onsubmit = (data) => {
    console.log(data);
    if (data) {
      toast({
        variant: "success",
        title: "Account create succussfully.",
        description: "Your account has been create successfully, please login !",
        className: "custom-toast-success"
      });
    }
  };
  const { toast } = useToast();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  useEffect(() => {
    if (errors.username) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.username.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => usernameRef.current.focus()}
          >
            Try again
          </ToastAction>
        ),
      });
    } else if (errors.email) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.email.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => emailRef.current.focus()}
          >
            Try again
          </ToastAction>
        ),
      });
    } else if (errors.password) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.password.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => passwordRef.current.focus()}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  }, [errors.username, errors.email, errors.password]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className={"shadow-lg shadow-tropical-indigo/60"}>
        <CardHeader>
          <CardTitle className="text-2xl text-space-cadet">Register</CardTitle>
          <CardDescription>
            Enter your username, email and password below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className={"text-space-cadet"}>
                  Username
                </Label>
                <Input
                  {...register("username", {
                    required:
                      "Your username is required to create an account !",
                  })}
                  ref={usernameRef}
                  id="username"
                  type="text"
                  className={
                    "focus-visible:ring-iris focus-visible:placeholder:text-iris focus-visible:text-iris"
                  }
                  placeholder={"Your username"}
                  onChange={(e) => setValue("username", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className={"text-space-cadet"}>
                  Email
                </Label>
                <Input
                  {...register("email", {
                    required: "Your email is required to create an account !",
                  })}
                  ref={emailRef}
                  onChange={(e) => setValue("email", e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className={
                    "focus-visible:ring-iris focus-visible:placeholder:text-iris focus-visible:text-iris"
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password", {
                    required: "Password is required field !",
                    minLength: {
                      value: 8,
                      message: "Your password must be at least 8 characters !",
                    },
                  })}
                  ref={passwordRef}
                  onChange={(e) => setValue("password", e.target.value)}
                  id="password"
                  type="password"
                  className={
                    "focus-visible:ring-iris focus-visible:placeholder:text-iris focus-visible:text-iris"
                  }
                  placeholder={"Create a password"}
                />
              </div>
              <Button type="submit" className="auth-btn">
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              I have already an account{" "}
              <Link
                to="/login"
                className="underline underline-offset-4 hover:text-iris"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;
