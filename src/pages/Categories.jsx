import CategoryCard from "@/components/Global/CategoryCard";
import MyPagination from "@/components/Global/MyPagination";
import TopPage from "@/components/Global/TopPage";
import { useToast } from "@/hooks/use-toast";
import { getAllCategoriesPaginate } from "@/redux/apiCalls/categoryApiCalls";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Categories() {
  const { categories, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const categoriesNumber = 9;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getAllCategoriesPaginate(categoriesNumber, currentPage));
  }, [currentPage]);
  const {toast} = useToast();
  useEffect(() => {
    if(error){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  },[error])
  return (
    <>
      <TopPage page="Categories" />
      <div className={"mt-6"}>
        <div className="container">
          <h1 className={"page-title"}>Categories</h1>
          <div
            className={
              "mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"
            }
          >
            {categories?.categories?.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
          {categories?.total > categoriesNumber && (
            <div className="mt-10">
              <MyPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={categories?.total}
                pageNumber={categoriesNumber}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Categories;
