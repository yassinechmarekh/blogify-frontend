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
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function LoginForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onsubmit = (data) => {
    console.log(data);
  };
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { toast } = useToast();
  useEffect(() => {
    if (errors.email) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.email?.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              emailRef.current.focus();
            }}
          >
            Try again
          </ToastAction>
        ),
      });
    } else if (errors.password) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.password?.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              passwordRef.current.focus();
            }}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  }, [errors.email, errors.password]);
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
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className={"text-space-cadet"}>
                  Email
                </Label>
                <Input
                  {...register("email", {
                    required:
                      "Your email is required to login to your account !",
                  })}
                  ref={emailRef}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className={"focus-visible:ring-iris focus-visible:placeholder:text-iris focus-visible:text-iris"}
                  onChange={(e) => setValue("email", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/reset-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:text-iris"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  {...register("password", {
                    required:
                      "Your password is required to login to your account !",
                    minLength: {
                      value: 8,
                      message: "Your password must be at least 8 characters !",
                    },
                  })}
                  ref={passwordRef}
                  id="password"
                  type="password"
                  className={"focus-visible:ring-iris focus-visible:placeholder:text-iris focus-visible:text-iris"}
                  onChange={(e) => setValue("password", e.target.value)}
                />
              </div>
              <Button type="submit" className="auth-btn">
                Login
              </Button>
            </div>
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
        </CardContent>
      </Card>
    </div>
  );
}
