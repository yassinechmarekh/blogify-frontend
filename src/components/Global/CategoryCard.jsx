import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link to={`/categories/${category?.slug}`}>
      <div className={"rounded-2xl overflow-hidden relative group"}>
        <img
          src={category?.image.url}
          alt="category image"
          className={"object-cover w-full group-hover:scale-105 my-transition"}
        />
        <div
          className={
            "py-2 px-4 bg-background rounded-full flex items-center gap-2 absolute left-1/2 bottom-8 -translate-x-1/2"
          }
        >
          <img src={category?.icon} alt="cetegory icon" className={"w-6"} />
          <span className={"text-space-cadet font-medium capitalize"}>
            {category?.title}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
