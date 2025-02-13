import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import NotFound from "./NotFound";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { verifyUserAccount } from "@/redux/apiCalls/authApiCalls";

const VerifyEmail = () => {
  const { isEmailVerified, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { userId, token } = useParams();
  useEffect(() => {
    if (userId && token) {
      console.log(userId);
      console.log(token);
      dispatch(verifyUserAccount(userId, token));
    }
  }, [userId, token]);
  const { toast } = useToast();
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
    <div>
      {isEmailVerified ? (
        <section class="grid h-[100vh] place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
          <div class="text-center">
            <FaEnvelopeCircleCheck size={160} class="text-iris mx-auto" />
            <h1 class="mt-4 text-balance text-3xl font-semibold text-space-cadet sm:text-5xl capitalize">
              Email Verification
            </h1>
            <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              You email was verified. You can continue using the application.
            </p>
            <div class="mt-6 flex items-center justify-center gap-x-6">
              <Link
                to="/login"
                class="rounded-md bg-iris px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-iris/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris my-transition"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default VerifyEmail;
