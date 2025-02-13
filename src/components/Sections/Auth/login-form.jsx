import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/apiCalls/authApiCalls";

// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Icons
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { TbLoader2 } from "react-icons/tb";

export function LoginForm({ className, ...props }) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const [passwordShowed, setPasswordShowed] = useState(false);
  const onsubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [error]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className={"shadow-lg shadow-tropical-indigo/60"}>
        <CardHeader>
          <CardTitle className="text-2xl text-space-cadet">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required:
                      "Your email is required to login to your account !",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email !",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={"main-label"}>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your email"
                          className={"main-input"}
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
                    required:
                      "Your password is required to login to your account !",
                    minLength: {
                      value: 8,
                      message: "Your password must be at least 8 characters !",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel htmlFor="password" className={"main-label"}>
                          Password
                        </FormLabel>
                        <Link
                          to="/forget-password"
                          className="ml-auto inline-block text-xs underline-offset-4 hover:underline hover:text-iris"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={passwordShowed ? "text" : "password"}
                            placeholder="Enter your password"
                            className={"main-input peer"}
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
                className={`auth-btn mt-4 ${
                  loading && "pointer-events-none opacity-90"
                }`}
              >
                {loading ? <TbLoader2 className={"animate-spin"} /> : "Login"}
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="underline underline-offset-4 hover:text-iris"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
