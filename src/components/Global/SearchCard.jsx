import React from "react";
import { IoClose } from "react-icons/io5";

function SearchCard({ setSearchOpen }) {
  const tags = [
    "sport",
    "Business",
    "Travel",
    "Trends",
    "Startups",
    "News",
    "Technology",
    "Management",
  ];
  return (
    <div
      className={
        "p-6 bg-background absolute top-full left-1/2 -translate-x-1/2 lg:left-3/4 w-[450px] rounded-lg shadow-lg shadow-iris/20 border border-iris/50"
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
      <form className={"relative"}>
        <input
          type="text"
          placeholder="Start Typing"
          className={
            "w-full py-2 px-4 border outline-none rounded-lg shadow-sm focus:shadow-tropical-indigo my-transition placeholder:text-sm"
          }
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
      <div className={"mt-4 flex flex-wrap gap-3"}>
        {tags.map((tag, index) => (
          <span
            key={index}
            className={
              "py-1 px-3 text-xs text-space-cadet font-medium bg-white rounded-md uppercase cursor-pointer hover:text-tropical-indigo hover:opacity-75 my-transition shadow-sm hover:shadow-tropical-indigo"
            }
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SearchCard;
