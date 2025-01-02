import React from "react";

// Components
import TopPage from "@/components/Global/TopPage";
import { ResetPasswordForm } from "@/components/Sections/Auth/reset-password";

function ResetPassword() {
  return (
    <>
      <TopPage page="Reset Password" />
      <div className="container">
        <div className="mt-20 flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <div className="w-full max-w-sm">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
