import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Componnets
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Icons
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/apiCalls/authApiCalls";
import { TbLoader2 } from "react-icons/tb";

function RegisterForm({ className, ...props }) {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.auth);
  const onsubmit = (user) => {
    console.log(user);
    dispatch(registerUser(user));
  };
  useEffect(() => {
    if (message) {
      toast({
        variant: "success",
        title: "Account create succussfully.",
        description: message,
        className: "custom-toast-success",
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [error, message]);
  const [passwordShowed, setPasswordShowed] = useState(false);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <div className={"space-y-3"}>
                <FormField
                  control={form.control}
                  name="username"
                  rules={{
                    required:
                      "Your username is required to create an account !",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={"main-label"} htmlFor="username">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          type="text"
                          className={"main-input"}
                          placeholder="Enter your username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.username?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required:
                      "Your username is required to create an account !",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email !",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={"main-label"} htmlFor="email">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          className={"main-input"}
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.email?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: "Password is required field !",
                    minLength: {
                      value: 8,
                      message: "Your password must be at least 8 characters !",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={"main-label"} htmlFor="password">
                        Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={passwordShowed ? "text" : "password"}
                            id="password"
                            className={"main-input"}
                            placeholder="Create a password"
                            {...field}
                          />
                        </FormControl>
                        {passwordShowed ? (
                          <FaEyeSlash
                            size={16}
                            className={"icon-password"}
                            onClick={() => setPasswordShowed(false)}
                          />
                        ) : (
                          <IoEyeSharp
                            size={16}
                            className={"icon-password"}
                            onClick={() => setPasswordShowed(true)}
                          />
                        )}
                      </div>
                      <FormMessage>
                        {form.formState.errors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className={`auth-btn mt-4 ${
                  loading && "pointer-events-none opacity-90"
                }`}
              >
                {loading ? <TbLoader2 className={"animate-spin"} /> : "Register"}
              </Button>
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
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;
