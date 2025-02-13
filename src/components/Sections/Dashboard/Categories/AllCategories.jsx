import React, { useEffect } from "react";
import CategoriesTable from "./CategoriesTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "@/redux/apiCalls/categoryApiCalls";
import { useToast } from "@/hooks/use-toast";

function AllCategories() {
  const { categories, message, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [message]);
  const {toast} = useToast();
  useEffect(() => {
    if (message) {
      toast({
        variant: "success",
        description: message,
        className: "custom-toast-success",
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [error, message]);
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>Categories</h1>
      <CategoriesTable data={categories} />
    </section>
  );
}

export default AllCategories;
