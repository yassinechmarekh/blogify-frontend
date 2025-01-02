import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Components
import { ToastAction } from "@/components/ui/toast";

function Newsletter() {
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
        title: "Email added succussfully.",
        description: "Your email is added to our newsletter !",
        className: "custom-toast-success"
      });
    }
  };
  const { toast } = useToast();
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
            onClick={() => emailRef.current.focus()}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  }, [errors.email]);
  return (
    <div className={"py-20 w-full sm:w-3/4 md:w-3/5 xl:w-2/5 mx-auto text-center"}>
      <div className="container">
        <h1 className={"text-3xl text-space-cadet font-semibold"}>
          Subscribe to our Newsletter
        </h1>
        <p className={"my-4"}>
          Subscribe to our email newsletter to get the latest posts delivered
          right to your email.
        </p>
        <form className={"relative mb-2"} onSubmit={handleSubmit(onsubmit)}>
          <input
            {...register("email", {
              required: "Your email is required to get our newsletter !",
            })}
            type="email"
            placeholder="Enter Your Email"
            className={
              "w-full py-3 px-4 border outline-none rounded-lg shadow-sm focus:shadow-tropical-indigo my-transition placeholder:text-sm"
            }
            ref={emailRef}
            onChange={(e) => setValue("email", e.target.value)}
          />
          <button
            type="submit"
            className={
              "py-2 px-4 bg-gradient-to-t from-iris to-tropical-indigo rounded-lg text-white font-medium absolute top-1/2 -translate-y-1/2 right-1"
            }
          >
            Subscribe
          </button>
        </form>
        <span className={"text-space-cadet font-semibold text-sm"}>
          Pure inspiration, zero spam ✨
        </span>
      </div>
    </div>
  );
}

export default Newsletter;
