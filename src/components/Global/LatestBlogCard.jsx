import React from "react";
import { Link } from "react-router-dom";

function LatestBlogCard() {
  return (
    <div className={"relative overflow-hidden h-72 rounded-2xl"}>
      <img
        src="https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/demo-image-0021-1248x702.webp"
        alt="blog image"
        className={"h-full object-cover"}
      />
      <div
        className={
          "absolute inset-0 p-6 bg-black/20 flex flex-col justify-between"
        }
      >
        <span
          className={
            "py-1 px-4 text-xs text-white font-semibold bg-white/30 backdrop:blur-lg w-fit rounded-md uppercase"
          }
        >
          management
        </span>
        <div>
          <h5 className={"text-white font-medium capitalize"}>
            Ethan Caldwell{" "}
            <span className={"text-white/75"}>on September 29, 2024</span>
          </h5>
          <Link
            className={
              "text-white text-lg font-semibold line-clamp-2 hover:underline my-transition"
            }
          >
            AI in Business Management: Improving Efficiency and Decision Making
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LatestBlogCard;
