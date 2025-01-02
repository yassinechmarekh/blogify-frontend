import React from "react";

// Components
import TopPage from "@/components/Global/TopPage";
import { LoginForm } from "@/components/Sections/Auth/login-form";

function Login() {
  return (
    <>
      <TopPage page="Login" />
      <section>
        <div className="container">
          <div className="text-center my-10 w-full sm:w-3/5 mx-auto">
            <h1
              className={"text-2xl xs:text-3xl text-space-cadet font-semibold"}
            >
              Login to your Account
            </h1>
            <p className={"mt-2"}>
              Lorem ipsum dolor sit amet consectetur. Facilisis eu sit commodo
              sit. Phasellus elit sit sit dolor risus faucibus vel aliquam.
              Fames mattis.
            </p>
          </div>
          <div className="flex  w-full items-center justify-center">
            <div className="w-full max-w-sm">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
