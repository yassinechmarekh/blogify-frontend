import BlogCard from "@/components/Global/BlogCard";
import MyPagination from "@/components/Global/MyPagination";
import TopPage from "@/components/Global/TopPage";
import React from "react";

function CategorySingle() {
  return (
    <section>
      <TopPage page="Category" />
      <div className="container">
        <div className={"py-6 border-b border-gray-300"}>
          <img
            src="https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/Travel@2x.webp"
            alt="category image"
            className={"w-28 rounded-2xl"}
          />
          <h2
            className={
              "mt-5 text-4xl text-space-cadet font-semibold capitalize"
            }
          >
            Travel
          </h2>
          <p className={"mt-2 w-full sm:w-2/3 lg:w-1/2 xl:w-2/5"}>
            Discover travel tips, destination guides, and personal experiences
            that will inspire your next adventure, whether it’s exploring hidden
            gems or popular tourist spots.
          </p>
        </div>
        <div className={'mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {[1,2,3,4,5,6,7,8,9].map((post, index) => (
            <BlogCard key={index} />
          ))}
        </div>
        <div className={'mt-10'}>
          <MyPagination/>
        </div>
      </div>
    </section>
  );
}

export default CategorySingle;
