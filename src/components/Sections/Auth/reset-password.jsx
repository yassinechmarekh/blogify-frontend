import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";
import { ToastAction } from "@/components/ui/toast";

export function ResetPasswordForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const onsubmit = (data) => {
    console.log(data);
    if (data) {
      toast({
        variant: "success",
        title: "Check your email to reset password.",
        description:
          "You can change your password through the link sent to your email !",
        className: "custom-toast-success",
      });
    }
  };
  const emailRef = useRef(null);
  useEffect(() => {
    if (errors.email) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.email.message,
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
    }
  }, [errors.email]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link to={"/"}>
              <img
                src="./logo.png"
                alt="blogify icon"
                className={"w-8 hover:opacity-80 my-transition"}
              />
            </Link>
            <h1 className="text-xl font-bold">Welcome to Blogify</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="underline underline-offset-4 hover:text-iris"
              >
                Sign up
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className={
                  "focus-visible:ring-iris focus-visible:placeholder:text-iris focus-visible:text-iris"
                }
                ref={emailRef}
                {...register("email", {
                  required:
                    "Your email is required to send a link to update password !",
                })}
                onChange={(e) => setValue("email", e.target.value)}
              />
            </div>
            <Button type="submit" className="auth-btn">
              Reset Password
            </Button>
          </div>
        </div>
      </form>
      {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}
