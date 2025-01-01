import React from "react";
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

function Main() {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((blog, index) => (
                <BlogCard key={index} />
              ))}
            </div>
            <div className={"my-6"}>
              <MyPagination />
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <AuthorCard />
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
                <SwiperSlide>
                  <LatestBlogCard />
                </SwiperSlide>
                <SwiperSlide>
                  <LatestBlogCard />
                </SwiperSlide>
                <SwiperSlide>
                  <LatestBlogCard />
                </SwiperSlide>
                <div className="latestblog-swp-button-next">
                  <IoIosArrowForward size={30} />
                </div>
                <div className="latestblog-swp-button-prev">
                  <IoIosArrowBack size={30} />
                </div>
                <div className="latestblog-swp-pagination"></div>
              </Swiper>
            </div>
            <div className={"bg-white p-6 rounded-2xl mt-6"}>
              <h5 className={"sidebar-title mb-4"}>Authors</h5>
              <div className="flex flex-col space-y-3 group">
                {[1, 2, 3].map((author, index) => (
                  <div
                    key={index}
                    className={
                      "flex justify-between pb-3 border-b last:border-b-0 last:pb-0"
                    }
                  >
                    <div>
                      <h3 className={"font-semibold capitalize"}>
                        Product Designer
                      </h3>
                      <span className={"capitalize"}>Pioneer</span>
                    </div>
                    <span className={"text-sm"}>Since 2024</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={"bg-white p-6 rounded-2xl mt-6 lg:sticky static top-4"}
            >
              <h5 className={"sidebar-title mb-4"}>last blog admin</h5>
              <div className="flex flex-col space-y-3">
                {[1, 2, 3].map((blog, index) => (
                  <div key={index}>
                    <Link
                      className={
                        "text-iris text-lg font-medium line-clamp-1 flex items-center space-x-1 hover:text-space-cadet my-transition"
                      }
                    >
                      <h1>Heartfelt Reflections</h1>
                      <FaArrowUpRightFromSquare size={16} />
                    </Link>
                    <p className={"mt-1 text-sm line-clamp-3"}>
                      A deep dive into emotional experiences and personal
                      growth, sharing valuable insights on life's most
                      meaningful moments.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
