import BlogCard from "@/components/Global/BlogCard";
import TopPage from "@/components/Global/TopPage";
import { useToast } from "@/hooks/use-toast";
import { searchPosts } from "@/redux/apiCalls/postApiCalls";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SearchPosts = () => {
  const { posts, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { query } = useParams();
  useEffect(() => {
    dispatch(searchPosts(query));
  }, [query]);
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
          <h1 className={"page-title"}>Search posts</h1>
          {posts?.length > 0 ? (
            <div
              className={
                "mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              }
            >
              {posts?.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className={'h-40 flex items-center justify-center'}>
              <p className={"text-center"}>
                No posts with this keyword :{" "}
                <span className={"font-semibold"}>{query}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPosts;
