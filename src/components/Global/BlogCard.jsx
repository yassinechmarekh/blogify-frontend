import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ post }) {
  return (
    <div>
      <div className={"h-56 overflow-hidden rounded-2xl relative group"}>
        <Link to={`/posts/${post?.slug}`}>
          <img
            src={post?.image.url}
            alt="blog image"
            className={
              "w-full h-full object-cover hover:scale-105 my-transition"
            }
          />
        </Link>
        <Link to={`/categories/${post?.category.slug}`}>
          <span
            className={
              "py-1 px-4 bg-white text-xs font-medium uppercase rounded-md absolute top-4 left-4"
            }
          >
            {post?.category.title}
          </span>
        </Link>
      </div>
      <h3 className={"text-slate-500 mt-2"}>
        <Link
          to={`/user/${post.author._id}`}
          className={
            "text-iris hover:text-space-cadet my-transition font-medium capitalize"
          }
        >
          {post?.author.username}
        </Link>{" "}
        on{" "}
        {new Date(post?.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h3>
      <Link
        to={`/posts/${post?.slug}`}
        className={
          "text-xl text-space-cadet hover:text-iris my-transition font-semibold first-letter:capitalize line-clamp-2"
        }
      >
        {post?.title}
      </Link>
      <p
        className={"first-letter:capitalize line-clamp-2 mt-1"}
        dangerouslySetInnerHTML={{ __html: post?.content }}
      />
    </div>
  );
}

export default BlogCard;
