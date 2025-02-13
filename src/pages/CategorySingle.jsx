import BlogCard from "@/components/Global/BlogCard";
import MyPagination from "@/components/Global/MyPagination";
import TopPage from "@/components/Global/TopPage";
import { useToast } from "@/hooks/use-toast";
import { getCategory } from "@/redux/apiCalls/categoryApiCalls";
import { getPostsByCategory } from "@/redux/apiCalls/postApiCalls";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CategorySingle() {
  const { slug } = useParams();
  const { category, error: categoryError } = useSelector(
    (state) => state.category
  );
  const { posts, error: postError } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory(slug));
  }, [slug]);
  const postsNumber = 6;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (category?._id) {
      dispatch(getPostsByCategory(category?._id, postsNumber, currentPage));
    }
  }, [currentPage, category?._id]);
  const { toast } = useToast();
  useEffect(() => {
    if (categoryError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: categoryError,
      });
    } else if (postError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: postError,
      });
    }
  }, [categoryError, postError]);
  return (
    <section>
      <TopPage page="Category" />
      <div className="container">
        <div className={"py-6 border-b border-gray-300"}>
          <img
            src={category?.image.url}
            alt="category image"
            className={"w-28 rounded-2xl"}
          />
          <h2
            className={
              "mt-5 text-4xl text-space-cadet font-semibold capitalize"
            }
          >
            {category?.title}
          </h2>
          <p className={"mt-2 w-full sm:w-2/3 lg:w-1/2 xl:w-2/5"}>
            {category?.description}
          </p>
        </div>
        <div
          className={
            "mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          }
        >
          {posts?.posts?.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
        {posts?.total > postsNumber && (
          <div className={"mt-10"}>
            <MyPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={posts?.total}
              pageNumber={postsNumber}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default CategorySingle;
