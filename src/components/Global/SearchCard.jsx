import { getFooterCategories, getLimitCategories } from "@/redux/apiCalls/categoryApiCalls";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function SearchCard({ setSearchOpen }) {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async (limit) => {
    try {
      const data = await getFooterCategories(limit);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    navigate(`/posts/search/${query}`);
    setSearchOpen(false);
  };
  useEffect(() => {
    fetchCategories(8);
  }, []);
  return (
    <div
      className={
        "p-6 bg-background absolute top-full left-1/2 -translate-x-1/2 lg:left-3/4 w-11/12 xs:w-[450px] rounded-lg shadow-lg shadow-iris/20 border border-iris/50 z-40"
      }
    >
      <IoClose
        size={24}
        className={
          "ml-auto text-space-cadet cursor-pointer opacity-70 hover:opacity-100 hover:rotate-90 my-transition"
        }
        onClick={() => setSearchOpen(false)}
      />
      <h3 className={"mb-2 text-lg font-semibold text-space-cadet capitalize"}>
        What are You Looking For?
      </h3>
      <form className={"relative"} onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Start Typing"
          className={
            "w-full py-2 px-4 border outline-none rounded-lg shadow-sm focus:shadow-tropical-indigo my-transition placeholder:text-sm"
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button
          type="submit"
          className={
            "py-1 px-3 bg-gradient-to-t from-iris to-tropical-indigo rounded-lg text-white font-medium absolute top-1/2 -translate-y-1/2 right-1"
          }
        >
          Search
        </button>
      </form>
      {categories?.length > 0 && (
        <div className={"mt-4 flex flex-wrap gap-3"}>
          {categories?.map((category) => (
            <Link
              to={`/categories/${category.slug}`}
              key={category._id}
              className={
                "py-1 px-3 text-xs text-space-cadet font-medium bg-white rounded-md uppercase cursor-pointer hover:text-tropical-indigo hover:opacity-75 my-transition shadow-sm hover:shadow-tropical-indigo"
              }
            >
              {category.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchCard;
