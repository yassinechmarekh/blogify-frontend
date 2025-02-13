import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";
import { ToastAction } from "@/components/ui/toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "@/redux/apiCalls/authApiCalls";
import { TbLoader2 } from "react-icons/tb";

const ForgetPasswordForm = ({ className, ...props }) => {
  const form = useForm();
  const { message, error, loading } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const onsubmit = (data) => {
    console.log(data);
    dispatch(forgetPassword(data.email));
  };
  useEffect(() => {
    if (message) {
      toast({
        variant: "success",
        title: message.title,
        description: message.description,
        className: "custom-toast-success",
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [message, error]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)}>
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
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required:
                    "Your email is required to send a link to update password !",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email !",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={"email"} className={"main-label"}>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id={"email"}
                        className={"main-input"}
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`auth-btn ${
                  loading && "pointer-events-none opacity-90"
                }`}
              >
                {loading ? (
                  <TbLoader2 className={"animate-spin"} />
                ) : (
                  "Forget Password"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPasswordForm;
