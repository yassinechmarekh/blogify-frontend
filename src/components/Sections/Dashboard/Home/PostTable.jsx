import React from "react";

// Icons
import { FaArrowUpRightFromSquare, FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PostTable({ posts }) {
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div key={post._id}>
          <Link
            className={
              "text-iris font-medium line-clamp-1 flex items-center space-x-2 hover:text-space-cadet hover:underline my-transition"
            }
          >
            <h1 className={"line-clamp-1"}>{post.title}</h1>
            <FaArrowUpRightFromSquare size={13} />
          </Link>
          <p className={"mt-1 text-sm line-clamp-2"}>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostTable;
