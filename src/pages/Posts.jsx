import BlogCard from "@/components/Global/BlogCard";
import MyPagination from "@/components/Global/MyPagination";
import TopPage from "@/components/Global/TopPage";
import { useToast } from "@/hooks/use-toast";
import { getAllPostsPaginate } from "@/redux/apiCalls/postApiCalls";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Posts() {
  const { posts, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const postsNumber = 9;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getAllPostsPaginate(postsNumber, currentPage));
  }, [currentPage]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  const { toast } = useToast();
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [error]);
  return (
    <>
      <TopPage page="Posts" />
      <div className={"mt-6"}>
        <div className="container">
          <h1 className={"page-title"}>All posts</h1>
          <div
            className={
              "mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            }
          >
            {posts?.posts?.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
          {posts?.total > postsNumber && (
            <div className="mt-10">
              <MyPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={posts.total}
                pageNumber={postsNumber}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Posts;
