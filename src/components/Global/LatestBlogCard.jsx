import React from "react";
import { Link } from "react-router-dom";

function LatestBlogCard({ post }) {
  return (
    <div className={"relative overflow-hidden h-72 rounded-2xl"}>
      <img
        src={post?.image.url}
        alt="blog image"
        className={"h-full object-cover"}
      />
      <div
        className={
          "absolute inset-0 p-6 bg-black/50 flex flex-col justify-between"
        }
      >
        <Link
          to={`/categories/${post?.category.slug}`}
          className={
            "py-1 px-4 text-xs text-white font-semibold bg-white/30 backdrop:blur-lg w-fit rounded-md uppercase"
          }
        >
          {post?.category.title}
        </Link>
        <div>
          <h5
            className={
              "text-white font-medium capitalize flex items-center gap-2"
            }
          >
            <Link
              to={`/user/${post?.author._id}`}
              className={"hover:underline"}
            >
              {post?.author.username}
            </Link>
            <span className={"text-white/75"}>
              on{" "}
              {new Date(post?.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </h5>
          <Link
            to={`/posts/${post?.slug}`}
            className={
              "text-white text-lg font-semibold line-clamp-2 hover:underline my-transition"
            }
          >
            {post?.title}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LatestBlogCard;
