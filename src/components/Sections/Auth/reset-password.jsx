import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "@/assets/images/logo.png";
import { resetPassword } from "@/redux/apiCalls/authApiCalls";

export function ResetPasswordForm({ userId, token }) {
  const form = useForm();
  const { toast } = useToast();
  const { message, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onsubmit = (data) => {
    console.log(data);
    if (userId && token) {
      dispatch(resetPassword({ userId, token }, data.password));
    }
  };
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    } else if (message) {
      toast({
        variant: "success",
        title: message.title,
        description: message.description,
        className: "custom-toast-success",
      });
    }
  }, [message, error]);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link to={"/"}>
              <img
                src={logo}
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
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "The new password is required !",
                minLength: {
                  value: 8,
                  message: "The password must be at least 8 characters !",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={"password"} className={"main-label"}>
                    New Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        id={"password"}
                        className={"main-input peer"}
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a new password"
                        {...field}
                      />
                    </FormControl>
                    {showPassword ? (
                      <FaEyeSlash
                        size={16}
                        className={"icon-password"}
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <IoEyeSharp
                        size={16}
                        className={"icon-password"}
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <Button type="submit" className="auth-btn">
              Reset Password
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
