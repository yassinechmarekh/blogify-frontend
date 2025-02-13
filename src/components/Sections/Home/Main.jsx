import React, { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Components
import AuthorCard from "@/components/Global/AuthorCard";
import LatestBlogCard from "@/components/Global/LatestBlogCard";
import BlogCard from "@/components/Global/BlogCard";
import MyPagination from "@/components/Global/MyPagination";

// Icons
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPostsPaginate,
  getLatestPost,
  getLatestPostsAdmin,
} from "@/redux/apiCalls/postApiCalls";
import { useToast } from "@/hooks/use-toast";
import { getAdminUser, getLimitAuthors } from "@/redux/apiCalls/userApiCalls";

function Main() {
  const {
    posts,
    latestPosts,
    error: postsError,
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const postsNumber = 10;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getAllPostsPaginate(postsNumber, currentPage));
  }, [currentPage]);
  useEffect(() => {
    dispatch(getLatestPost(3));
  }, []);
  const { toast } = useToast();
  useEffect(() => {
    if (postsError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: postsError,
      });
    } 
  }, [postsError]);
  const [admin, setAdmin] = useState(null);
  const [postsAdmin, setPostsAdmin] = useState(null);
  const postsAdminNumber = 4;
  const fetchAdmin = async () => {
    try {
      const adminData = await getAdminUser();
      setAdmin(adminData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPostsAdmin = async (limit) => {
    try {
      const posts = await getLatestPostsAdmin(limit);
      setPostsAdmin(posts);
    } catch (error) {
      console.log(error);
    }
  };
  const [authors, setAuthors] = useState([]);
  const fetchAuthors = async () => {
    try {
      const limitAuthors = await getLimitAuthors(4);
      setAuthors(limitAuthors);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAdmin();
    fetchPostsAdmin(postsAdminNumber);
    fetchAuthors();
  }, []);
  return (
    <section>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts?.posts?.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
            {posts?.total > postsNumber && (
              <div className={"my-6"}>
                <MyPagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  total={posts?.total}
                  pageNumber={postsNumber}
                />
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/3">
            {admin && <AuthorCard author={admin} />}
            {latestPosts?.length > 0 && (
              <div className={"mt-6"}>
                <h5 className={"sidebar-title mb-2"}>Featured Posts</h5>
                <Swiper
                  navigation={{
                    nextEl: ".latestblog-swp-button-next",
                    prevEl: ".latestblog-swp-button-prev",
                  }}
                  pagination={{
                    clickable: true,
                    el: ".latestblog-swp-pagination",
                  }}
                  loop={true}
                  modules={[Navigation, Pagination]}
                  className="latestblog relative group"
                >
                  {latestPosts?.map((post) => (
                    <SwiperSlide key={post._id}>
                      <LatestBlogCard post={post} />
                    </SwiperSlide>
                  ))}
                  <div className="latestblog-swp-button-next">
                    <IoIosArrowForward size={30} />
                  </div>
                  <div className="latestblog-swp-button-prev">
                    <IoIosArrowBack size={30} />
                  </div>
                  <div className="latestblog-swp-pagination"></div>
                </Swiper>
              </div>
            )}
            {authors?.length > 0 && (
              <div className={"bg-white p-6 rounded-2xl mt-6"}>
                <h5 className={"sidebar-title mb-4"}>Authors</h5>
                <div className="flex flex-col space-y-3 group">
                  {authors.map((author) => (
                    <div
                      key={author._id}
                      className={
                        "flex justify-between pb-3 border-b last:border-b-0 last:pb-0"
                      }
                    >
                      <div className={'flex flex-col'}>
                        <Link to={`/user/${author._id}`} className={"font-semibold hover:underline capitalize"}>
                          {author.username}
                        </Link>
                        <span className={"capitalize"}>
                          {author.job || "Blogger"}
                        </span>
                      </div>
                      <span className={"text-sm"}>
                        {new Date(author.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {postsAdmin?.length > 0 && (
              <div
                className={
                  "bg-white p-6 rounded-2xl mt-6 lg:sticky static top-4"
                }
              >
                <h5 className={"sidebar-title mb-4"}>last blog admin</h5>
                <div className="flex flex-col space-y-3">
                  {postsAdmin?.map((post) => (
                    <div key={post._id}>
                      <Link
                        to={`/posts/${post.slug}`}
                        className={
                          "text-iris  flex items-center space-x-1 hover:text-space-cadet my-transition"
                        }
                      >
                        <h1 className={"text-md font-medium line-clamp-1"}>
                          {post.title}
                        </h1>
                        <FaArrowUpRightFromSquare size={16} />
                      </Link>
                      <p
                        className={"mt-1 text-sm line-clamp-3"}
                        dangerouslySetInnerHTML={{ __html: post?.content }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
