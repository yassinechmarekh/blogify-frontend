import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { validateResetPasswordLink } from "@/redux/apiCalls/authApiCalls";
import { useToast } from "@/hooks/use-toast";

// Components
import TopPage from "@/components/Global/TopPage";
import { ResetPasswordForm } from "@/components/Sections/Auth/reset-password";
import NotFound from "./NotFound";
import Header from "@/components/Global/Header";
import Footer from "@/components/Global/Footer";
import Newsletter from "@/components/Global/Newsletter";

function ResetPassword() {
  const { validLink, error } = useSelector((state) => state.auth);
  const { userId, token } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validateResetPasswordLink(userId, token));
  }, [userId, token]);
  const {toast} = useToast();
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [error]);
  return validLink ? (
    <>
      <Header />
      <TopPage page="Reset Password" />
      <div className="container">
        <div className="mt-20 flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <div className="w-full max-w-sm">
            <ResetPasswordForm userId={userId} token={token} />
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  ) : (
    <NotFound />
  );
}

export default ResetPassword;
