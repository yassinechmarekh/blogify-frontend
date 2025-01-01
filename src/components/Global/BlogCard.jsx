import React from "react";
import { Link } from "react-router-dom";

function BlogCard() {
  return (
    <div>
      <div className={"h-56 overflow-hidden rounded-2xl relative group"}>
        <Link>
          <img
            src="https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/demo-image-0041-400x225.webp"
            alt="blog image"
            className={
              "w-full h-full object-cover hover:scale-105 my-transition"
            }
          />
        </Link>
        <Link>
          <span
            className={
              "py-1 px-4 bg-white text-xs font-medium uppercase rounded-md absolute top-4 left-4"
            }
          >
            business
          </span>
        </Link>
      </div>
      <h3 className={"text-slate-500 mt-2"}>
        <Link
          className={
            "text-iris hover:text-space-cadet my-transition font-medium capitalize"
          }
        >
          Ethan Caldwell
        </Link>{" "}
        on October 16, 2024
      </h3>
      <Link
        className={
          "text-xl text-space-cadet hover:text-iris my-transition font-semibold first-letter:capitalize line-clamp-2"
        }
      >
        How Tech Shapes the Future of Work in 2024
      </Link>
      <p className={"first-letter:capitalize line-clamp-3 mt-1"}>
        Find out why 2024 is predicted to be a pivotal year for sports
        technology and its impact on the industry.
      </p>
    </div>
  );
}

export default BlogCard;
