import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="grid h-[100vh] place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-iris">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-space-cadet sm:text-7xl capitalize">
          Page not found
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-iris px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-iris/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris my-transition"
          >
            Go back home
          </Link>
          <Link to="#" className="text-sm font-semibold text-space-cadet hover:text-iris my-transition">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
