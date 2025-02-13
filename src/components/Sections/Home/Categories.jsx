import { getLimitCategories } from "@/redux/apiCalls/categoryApiCalls";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Categories() {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLimitCategories(8));
  }, []);
  return (
    <section className={"py-20 text-center"}>
      <div className="container">
        <h5 className={"text-dim-gray font-semibold uppercase text-sm"}>
          Explore Trending Topics
        </h5>
        {categories.length > 0 && (
          <div
            className={
              "mt-8 w-full md:w-3/4 mx-auto flex flex-wrap justify-center gap-4"
            }
          >
            {categories?.map((category) => (
              <Link
                to={`/categories/${category.slug}`}
                key={category._id}
                className={
                  "py-2 px-4 bg-white flex items-center gap-1 rounded-full shadow-md hover:shadow-tropical-indigo/60 my-transition"
                }
              >
                <img src={category.icon} alt="" className={"w-6 "} />
                <span className={"text-space-cadet font-semibold capitalize"}>
                  {category.title}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Categories;
