import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({category}) {
  return (
    <Link>
      <div className={"rounded-2xl overflow-hidden relative group"}>
        <img
          src="https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/10/demo-category-0002.webp"
          alt="category image"
          className={"object-cover group-hover:scale-105 my-transition"}
        />
        <Link
          className={
            "py-2 px-4 bg-background rounded-full flex items-center gap-2 absolute left-1/2 bottom-8 -translate-x-1/2"
          }
        >
          <img
            src={category.icon}
            alt="cetegory icon"
            className={"w-6"}
          />
          <span className={'text-space-cadet font-medium capitalize'}>{category.title}</span>
        </Link>
      </div>
    </Link>
  );
}

export default CategoryCard;
