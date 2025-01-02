import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Copy } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Components
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AuthorCard from "@/components/Global/AuthorCard";
import LatestBlogCard from "@/components/Global/LatestBlogCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import BlogCard from "@/components/Global/BlogCard";

// Icons
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";

function PostSingle() {
  const categories = [
    "Technology",
    "Travel",
    "Sport",
    "Business",
    "Management",
    "Trends",
    "Startups",
    "News",
  ];
  const [isLikeComment, setIsLikeComment] = useState(false);
  const [isLikePost, setIsLikePost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onsubmit = (data) => {
    console.log(data);
  };
  const { toast } = useToast();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const commentRef = useRef(null);
  useEffect(() => {
    if (errors.username) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.username.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              usernameRef.current.focus();
            }}
          >
            Try again
          </ToastAction>
        ),
      });
    } else if (errors.email) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.email.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              emailRef.current.focus();
            }}
          >
            Try again
          </ToastAction>
        ),
      });
    } else if (errors.comment) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.comment.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              commentRef.current.focus();
            }}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  }, [errors.username, errors.email, errors.comment]);
  return (
    <section>
      <div className="container">
        <div className={"py-4 flex justify-center"}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Business</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  How Tech Shapes the Future of Work in 2024
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <div className="py-4 text-center w-full sm:w-11/12 mx-auto">
            <h3 className={"text-gray-600 text-sm font-medium"}>
              <Link
                to
                className={
                  "text-iris font-semibold hover:text-space-cadet my-transition"
                }
              >
                Ethan Caldwell
              </Link>{" "}
              on October 16, 2024
            </h3>
            <h1
              className={
                "my-3 text-3xl sm:text-5xl text-space-cadet font-semibold"
              }
            >
              How Tech Shapes the Future of Work in 2024
            </h1>
            <p className={"mb-4 w-full sm:w-3/5 mx-auto line-clamp-2"}>
              Revision Welcome to ultimate source for fresh perspectives!
              Explore curated content to enlighten, entertain and engage global
              readers.
            </p>
            <Link className={"category-tag"}>Business</Link>
          </div>
          <img
            src="https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/demo-image-0042-2048x1153.webp"
            alt="post image"
            className={"w-full rounded-2xl mt-4"}
          />
          <div className={"mt-8 flex flex-col lg:flex-row gap-6"}>
            <div className="w-full lg:w-2/3">
              <div className={"flex flex-col gap-y-2"}>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <p key={index} className={"first-letter:pl-3"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nisi et velit illum corrupti quasi doloribus vero,
                    laboriosam a vitae commodi hic quisquam quod alias
                    voluptatibus nam accusamus quas consectetur sunt iure
                    quaerat totam fuga beatae numquam. Vel eum accusantium
                    adipisci? Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Numquam vero et modi, quam, ipsa dignissimos eos
                    voluptates quasi velit, nesciunt pariatur. Hic in, ratione
                    unde maiores quos asperiores quidem magnam similique eius
                    aspernatur! Dolor quas enim qui a hic architecto nisi!
                    Corporis molestias ratione, iste iure voluptate culpa omnis
                    aliquam voluptatem officiis, ipsam architecto eaque quod
                    incidunt quasi autem facere? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Maxime laudantium sunt
                    reprehenderit explicabo alias sequi sed fugit asperiores
                    assumenda itaque natus maiores, officia veritatis porro?
                    Optio, rerum perspiciatis. Quod, illum?
                  </p>
                ))}
                <div
                  className={
                    "py-4 flex justify-between items-center gap-4 border-b border-gray-300"
                  }
                >
                  <span className={"text-sm text-gray-600 font-medium"}>
                    <Link
                      className={
                        "text-iris hover:text-space-cadet font-semibold my-trasnition"
                      }
                    >
                      Ethan Caldwell
                    </Link>{" "}
                    on September 29, 2024
                  </span>
                  <Link className={"category-tag text-sm"}>Business</Link>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Link
                  className={
                    "p-6 bg-white rounded-2xl shadow-lg hover:shadow-iris/40 my-transition group"
                  }
                >
                  <div className={"flex justify-between items-center"}>
                    <IoIosArrowBack
                      size={16}
                      className={"group-hover:animate-bounce-x"}
                    />
                    <span className={"sidebar-title text-xs"}>
                      Previous Article
                    </span>
                    <span></span>
                  </div>
                  <h4
                    className={
                      "mt-3 text-space-cadet text-center font-medium line-clamp-2"
                    }
                  >
                    Remote Work Trends in the Digital Age
                  </h4>
                </Link>
                <div
                  className={
                    "p-6 bg-white rounded-2xl shadow-lg hover:shadow-iris/40 my-transition group"
                  }
                >
                  <div className={"flex justify-between items-center"}>
                    <span></span>
                    <span className={"sidebar-title text-xs"}>
                      Next Article
                    </span>
                    <IoIosArrowForward
                      size={16}
                      className={"group-hover:animate-bounce-x"}
                    />
                  </div>
                  <h4
                    className={
                      "mt-3 text-space-cadet text-center font-medium line-clamp-2"
                    }
                  >
                    How Tech Shapes the Future of Work in 2024
                  </h4>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-6">
                <div
                  className={
                    "flex items-center gap-2 hover:opacity-80 my-transition"
                  }
                  onClick={() => setIsLikePost(!isLikePost)}
                >
                  {isLikePost ? (
                    <FaHeart size={18} className={"text-iris"} />
                  ) : (
                    <FaRegHeart size={18} className={"text-iris"} />
                  )}
                  <span
                    className={
                      "text-iris font-semibold select-none cursor-pointer"
                    }
                  >
                    8 Likes
                  </span>
                </div>
                <div
                  className={
                    "flex items-center gap-2 hover:opacity-80 my-transition"
                  }
                  onClick={() => setShowComments(!showComments)}
                >
                  <FaComment size={18} className={"text-iris"} />
                  <span
                    className={
                      "text-iris font-semibold select-none cursor-pointer"
                    }
                  >
                    3 comments
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <FaShare
                      size={20}
                      className={
                        "text-iris cursor-pointer hover:opacity-80 my-transition"
                      }
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className={"text-space-cadet"}>
                        Share link
                      </DialogTitle>
                      <DialogDescription>
                        Anyone who has this link will be able to view this.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input
                          id="link"
                          defaultValue={window.location.href}
                          readOnly
                          className={"border-iris"}
                        />
                      </div>
                      <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy />
                      </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className={"mt-6"}>
                <span
                  className={
                    "text-iris font-bold capitalize underline underline-offset-4 hover:no-underline my-transition cursor-pointer"
                  }
                  onClick={() => setShowComments(!showComments)}
                >
                  View Comments (3)
                </span>
                {showComments && (
                  <>
                    <div className={"mt-4 flex flex-col gap-y-4"}>
                      {[1, 2, 3].map((item) => (
                        <div
                          className={
                            "py-3 mx-3 border-b border-gray-300 last:border-b-0"
                          }
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className={"w-8 h-8"}>
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className={"text-sm text-gray-500"}>
                              <Link
                                className={
                                  "text-gray-600 hover:text-tropical-indigo font-medium capitalize my-transition"
                                }
                              >
                                Elliot Alderson
                              </Link>{" "}
                              on October 9, 2024
                            </span>
                          </div>
                          <p className={"text-black mt-2"}>
                            I’ve been following your blog for a while now, and
                            this post might be your best one yet!
                          </p>
                          <div
                            className={"mt-1 flex items-center gap-1"}
                            onClick={() => setIsLikeComment(!isLikeComment)}
                          >
                            {isLikeComment ? (
                              <FaHeart size={16} className={"text-iris"} />
                            ) : (
                              <FaRegHeart size={16} className={"text-iris"} />
                            )}
                            <span
                              className={
                                "text-sm text-iris font-medium select-none cursor-pointer"
                              }
                            >
                              2 Likes
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={"p-6 bg-white rounded-2xl"}>
                      <h4 className={"text-space-cadet text-lg font-semibold"}>
                        Leave a Comment
                      </h4>
                      <p className={"mt-2 text-sm"}>
                        Your email address will not be published. Required
                        fields are marked *
                      </p>
                      <form
                        className={"mt-4 flex flex-col gap-y-4"}
                        onSubmit={handleSubmit(onsubmit)}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label
                              htmlFor="uername"
                              className={"comment-label"}
                            >
                              Username
                            </Label>
                            <Input
                              type="text"
                              id="uername"
                              placeholder="Username"
                              className={"comment-input"}
                              {...register("username", {
                                required:
                                  "Your username is required to leave your comment !",
                              })}
                              onChange={(e) =>
                                setValue("username", e.target.value)
                              }
                              ref={usernameRef}
                            />
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email" className={"comment-label"}>
                              Email
                            </Label>
                            <Input
                              type="email"
                              id="email"
                              placeholder="Email"
                              className={"comment-input"}
                              {...register("email", {
                                required:
                                  "Your email is required to leave your comment !",
                              })}
                              onChange={(e) =>
                                setValue("email", e.target.value)
                              }
                              ref={emailRef}
                            />
                          </div>
                        </div>
                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="comment" className={"comment-label"}>
                            Your Comment
                          </Label>
                          <Textarea
                            placeholder="Type your comment here."
                            id="comment"
                            className={"comment-input"}
                            {...register("comment", {
                              required: "Your comment is required to submit !",
                            })}
                            onChange={(e) =>
                              setValue("comment", e.target.value)
                            }
                            ref={commentRef}
                          />
                        </div>
                        <Button type="submit" className={"w-fit main-btn"}>
                          Submit Comment
                        </Button>
                      </form>
                    </div>
                  </>
                )}
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
              <div className={"mt-6"}>
                <h5 className={"sidebar-title mb-4"}>Categories</h5>
                <div className="flex flex-wrap gap-4">
                  {categories.map((category, index) => (
                    <Link key={index} className={"category-tag"}>
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className={
                  "bg-white p-6 rounded-2xl mt-10 lg:sticky static top-4"
                }
              >
                <h5 className={"sidebar-title mb-4"}>
                  last blog of Ethan Caldwell
                </h5>
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
        <div className={'mt-10'}>
          <h3 className={'text-3xl text-space-cadet font-semibold capitalize'}>Read Next</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((index)=>(
              <BlogCard key={index}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostSingle;
