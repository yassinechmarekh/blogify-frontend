import CategoryCard from "@/components/Global/CategoryCard";
import MyPagination from "@/components/Global/MyPagination";
import TopPage from "@/components/Global/TopPage";
import React from "react";

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
    <>
      <TopPage page="Categories" />
      <div className={"mt-6"}>
        <div className="container">
          <h1 className={"page-title"}>
            Categories
          </h1>
          <div className={"mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"}>
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
          <div className="mt-10">
            <MyPagination />
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
