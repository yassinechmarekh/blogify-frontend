import React from "react";

function Hero() {
  return (
    <section>
      <div className="container">
        <div className={"py-10 sm:py-16 border-b border-slate-300 text-center"}>
          <h1
            className={
              "w-full lg:w-11/12 xl:w-4/5 mx-auto text-3xl sm:text-4xl lg:text-5xl text-space-cadet font-bold mb-4"
            }
          >
            Heartfelt{" "}
            <span
              className={
                "bg-gradient-to-t from-iris to-tropical-indigo bg-clip-text text-transparent"
              }
            >
              Reflections
            </span>{" "}
            : Stories of Love, Loss, Resilience, and Growth
          </h1>
          <p className={"w-full sm:w-4/5 lg:w-3/5 mx-auto text-sm sm:text-base"}>
            Revision Welcomes to ultimate source for fresh perspectives! Explore
            curated content to enlighten, entertain and engage global readers.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
