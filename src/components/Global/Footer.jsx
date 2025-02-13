import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Logo from "./Logo";

// Icons
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { getLimitAuthors } from "@/redux/apiCalls/userApiCalls";
import { getFooterCategories } from "@/redux/apiCalls/categoryApiCalls";
import { useSelector } from "react-redux";

function Footer() {
  const { user } = useSelector((state) => state.auth);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const fetchAuthors = async () => {
    try {
      const limitAuthors = await getLimitAuthors(4);
      setAuthors(limitAuthors);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const limitCategories = await getFooterCategories(4);
      setCategories(limitCategories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAuthors();
    fetchCategories();
  }, []);
  return (
    <footer>
      <div className="container">
        <div className="py-10 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[450px,repeat(1,1fr)] xl:grid-cols-[450px,repeat(3,1fr)] gap-8 xl:gap-6">
          <div>
            <Logo />
            <p className={"mt-3"}>
              Welcome to ultimate source for fresh perspectives! Explore curated
              content to enlighten, entertain and engage global readers.
            </p>
            <ul className={"mt-4 flex gap-3"}>
              <Link>
                <li className={"icon-list"}>
                  <FaFacebook size={24} />
                </li>
              </Link>
              <Link>
                <li className={"icon-list"}>
                  <FaXTwitter size={24} />
                </li>
              </Link>
              <Link>
                <li className={"icon-list"}>
                  <FaInstagram size={24} />
                </li>
              </Link>
              <Link>
                <li className={"icon-list"}>
                  <FaLinkedin size={24} />
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <h5 className={"sidebar-title"}>Quick links</h5>
            <ul className={"mt-3 leading-8"}>
              <Link to={"/"}>
                <li className={"footer-menu"}>home</li>
              </Link>
              <Link to={"/categories"}>
                <li className={"footer-menu"}>Categories</li>
              </Link>
              <Link to={"/posts"}>
                <li className={"footer-menu"}>Posts</li>
              </Link>
              <Link
                to={`${
                  user
                    ? user?.status === "admin"
                      ? "/dashboard/admin/home"
                      : user?.status === "author"
                      ? `/dashboard/author/home`
                      : `/${user?.username}/profile`
                    : "/login"
                }`}
              >
                <li className={"footer-menu"}>Dashboard</li>
              </Link>
            </ul>
          </div>
          <div>
            <h5 className={"sidebar-title"}>Categories</h5>
            <ul className={"mt-3 leading-8"}>
              {categories.length > 0 &&
                categories?.map((category) => (
                  <Link to={`/categories/${category.slug}`} key={category._id}>
                    <li className={"footer-menu"}>{category.title}</li>
                  </Link>
                ))}
            </ul>
          </div>
          <div>
            <h5 className={"sidebar-title"}>Authors</h5>
            <ul className={"mt-3 leading-8"}>
              {authors.length > 0 &&
                authors?.map((author) => (
                  <Link to={`/user/${author._id}`} key={author._id}>
                    <li className={"footer-menu"}>{author.username}</li>
                  </Link>
                ))}
            </ul>
          </div>
        </div>
        <p className={"py-3 text-center text-sm text-dim-gray/80"}>
          &#169;{" "}
          <Link to={"/"} className={"text-iris font-medium"}>
            Blogify
          </Link>
          , All Right Reserved. Developed By{" "}
          <Link
            className={
              "text-space-cadet hover:text-iris my-transition font-medium"
            }
          >
            Yassine_ChM
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
