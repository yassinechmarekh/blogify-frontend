import React from "react";
import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      title: "Technology",
      icon: "./icons/tech.webp",
    },
    {
      title: "Travel",
      icon: "./icons/travel.webp",
    },
    {
      title: "Sport",
      icon: "./icons/sport.webp",
    },
    {
      title: "Business",
      icon: "./icons/bussiness.webp",
    },
    {
      title: "Management",
      icon: "./icons/manage.webp",
    },
    {
      title: "Trends",
      icon: "./icons/trend.webp",
    },
    {
      title: "Startups",
      icon: "./icons/startups.webp",
    },
    {
      title: "News",
      icon: "./icons/news.webp",
    },
  ];
  return (
    <section className={"py-20 text-center"}>
      <div className="container">
        <h5 className={"text-dim-gray font-semibold uppercase text-sm"}>
          Explore Trending Topics
        </h5>
        <div
          className={"mt-8 w-full md:w-3/4 mx-auto flex flex-wrap justify-center gap-4"}
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              className={
                "py-2 px-4 bg-white flex items-center gap-1 rounded-full shadow-md hover:shadow-tropical-indigo/60 my-transition"
              }
            >
              <img src={category.icon} alt="" className={"w-6 "} />
              <span className={"text-space-cadet font-semibold capitalize"}>
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
