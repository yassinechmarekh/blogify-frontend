import BlogCard from "@/components/Global/BlogCard";
import MyPagination from "@/components/Global/MyPagination";
import TopPage from "@/components/Global/TopPage";
import React from "react";

function Posts() {
  return (
    <>
      <TopPage page="Posts" />
      <div className={"mt-6"}>
        <div className="container">
          <h1 className={"page-title"}>All posts</h1>
          <div className={"mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((post, index) => (
              <BlogCard key={index} />
            ))}
          </div>
          <div className="mt-10">
            <MyPagination/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Posts;
