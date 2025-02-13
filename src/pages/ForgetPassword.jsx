import React from "react";

// Components
import TopPage from "@/components/Global/TopPage";
import ForgetPasswordForm from "@/components/Sections/Auth/forget-password";

const ForgetPassword = () => {
  return (
    <>
      <TopPage page="Forget Password" />
      <div className="container">
        <div className="mt-20 flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <div className="w-full max-w-sm">
            <ForgetPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
