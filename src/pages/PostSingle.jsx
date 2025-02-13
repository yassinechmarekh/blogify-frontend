import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getLatestPost,
  getLatestPostsByAuthorId,
  getSpecificPost,
  toggleLikePost,
} from "@/redux/apiCalls/postApiCalls";
import {
  createComment,
  getCommentsByPost,
  likeComment,
} from "@/redux/apiCalls/commentApiCalls";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getLimitCategories } from "@/redux/apiCalls/categoryApiCalls";

function PostSingle() {
  const [showComments, setShowComments] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { slug } = useParams();
  const {
    singlePost,
    likes: postLikes,
    authorPosts,
    latestPosts,
    error,
    message,
  } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { comments, error: commentError } = useSelector(
    (state) => state.comment
  );
  const { categories, error: categoriesError } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();

  const post = singlePost?.post;
  const relatedPosts = singlePost?.relatedPosts;
  const prevPost = singlePost?.prevPost;
  const nextPost = singlePost?.nextPost;

  const limitLatestPostsByAuthor = 4;
  useEffect(() => {
    dispatch(getSpecificPost(slug));
    if (post?.author._id) {
      dispatch(
        getLatestPostsByAuthorId(post?.author._id, limitLatestPostsByAuthor)
      );
    }
  }, [slug, post?.author._id]);
  useEffect(() => {
    if (singlePost?.post?._id) {
      dispatch(getCommentsByPost(singlePost?.post?._id));
    }
  }, [singlePost?.post?._id]);
  const limitCategories = 8;
  const limitLastPosts = 3;
  useEffect(() => {
    dispatch(getLimitCategories(limitCategories));
    dispatch(getLatestPost(limitLastPosts));
  }, []);
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    } else if (message) {
      toast({
        variant: "success",
        title: message.title,
        description: message.message,
        className: "custom-toast-success",
      });
    }
  }, [error, message]);

  const [isLikePost, setIsLikePost] = useState(
    postLikes?.includes(user?.userId)
  );

  useEffect(() => {
    setIsLikePost(postLikes?.includes(user?.userId));
  }, [postLikes]);

  const form = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });
  const onsubmit = (data) => {
    console.log(data);
    if (!user) {
      navigate("/login");
      toast({
        variant: "success",
        title: "Login required",
        description: "You must log in to your account to leave a comment.",
        className: "custom-toast-success",
      });
    }
    const newComment = {
      postId: post?._id,
      content: data.comment,
    };
    dispatch(createComment(newComment));
    form.reset({ comment: "" });
  };
  const handleLikeComment = (id) => {
    if (!user) {
      navigate("/login");
      toast({
        variant: "success",
        title: "Login required",
        description: "You must log in to your account to like the comment.",
        className: "custom-toast-success",
      });
    }
    dispatch(likeComment(id));
  };
  const handleLikePost = (id) => {
    if (!user) {
      navigate("/login");
      toast({
        variant: "success",
        title: "Login required",
        description: "You must log in to your account to like the post.",
        className: "custom-toast-success",
      });
    }
    dispatch(toggleLikePost(id));
  };
  useEffect(() => {
    if (commentError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: commentError,
      });
    } else if (categoriesError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: categoriesError,
      });
    }
  }, [commentError, categoriesError]);
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
                  <Link
                    to={`/categories/${post?.category.slug}`}
                    className={"capitalize"}
                  >
                    {post?.category.title}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <div className="py-4 text-center w-full sm:w-11/12 mx-auto">
            <h3 className={"text-gray-600 text-sm font-medium"}>
              <Link
                to={`/user/${post?.author._id}`}
                className={
                  "text-iris font-semibold hover:text-space-cadet my-transition capitalize"
                }
              >
                {post?.author.username}
              </Link>{" "}
              on{" "}
              {new Date(post?.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h3>
            <h1
              className={
                "my-3 text-3xl sm:text-5xl text-space-cadet font-semibold"
              }
            >
              {post?.title}
            </h1>
            <p
              className={"mb-4 w-full sm:w-3/5 mx-auto line-clamp-2"}
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
            <Link
              to={`/categories/${post?.category.slug}`}
              className={"category-tag"}
            >
              {post?.category.title}
            </Link>
          </div>
          <img
            src={post?.image.url}
            alt="post image"
            className={"w-full rounded-2xl mt-4"}
          />
          <div className={"mt-8 flex flex-col lg:flex-row gap-6"}>
            <div className="w-full lg:w-2/3">
              <div className={"flex flex-col gap-y-2"}>
                <div
                  className={"flex flex-col gap-y-2 rich-text"}
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                />
                <div
                  className={
                    "py-4 flex justify-between items-center gap-4 border-b border-gray-300"
                  }
                >
                  <span className={"text-sm text-gray-600 font-medium"}>
                    <Link
                      to={`/user/${post?.author._id}`}
                      className={
                        "text-iris hover:text-space-cadet capitalize font-semibold my-trasnition"
                      }
                    >
                      {post?.author.username}
                    </Link>{" "}
                    on{" "}
                    {new Date(post?.createdAt).toLocaleDateString("en-Us", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    to={`/categories/${post?.category.slug}`}
                    className={"category-tag text-sm"}
                  >
                    {post?.category.title}
                  </Link>
                </div>
              </div>
              <div
                className={`mt-6 grid grid-cols-1 ${
                  prevPost && nextPost && "sm:grid-cols-2"
                } gap-8`}
              >
                {prevPost && (
                  <Link
                    to={`/posts/${prevPost?.slug}`}
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
                      {prevPost?.title}
                    </h4>
                  </Link>
                )}
                {nextPost && (
                  <Link
                    to={`/posts/${nextPost?.slug}`}
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
                      {nextPost?.title}
                    </h4>
                  </Link>
                )}
              </div>
              <div className="mt-6 flex items-center gap-6">
                <div
                  className={
                    "flex items-center gap-2 hover:opacity-80 my-transition"
                  }
                  onClick={() => handleLikePost(post?._id)}
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
                    {postLikes?.length} Likes
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
                      "text-iris font-semibold select-none capitalize cursor-pointer"
                    }
                  >
                    {comments?.length} comments
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
                    "text-iris font-bold capitalize underline underline-offset-4 hover:no-underline my-transition cursor-pointer select-none"
                  }
                  onClick={() => setShowComments(!showComments)}
                >
                  {comments?.length > 0
                    ? `view comments (${comments?.length} )`
                    : "Leave Comment"}
                </span>
                {showComments && (
                  <>
                    {comments?.length > 0 ? (
                      <div className={"mt-4 flex flex-col gap-y-4"}>
                        {comments?.map((comment) => (
                          <div
                            key={comment._id}
                            className={
                              "py-3 mx-3 border-b border-gray-300 last:border-b-0"
                            }
                          >
                            <div className="flex items-center gap-2">
                              <Link to={`/user/${comment.user._id}`}>
                                <Avatar className={"w-8 h-8"}>
                                  <AvatarImage
                                    src={comment.user.profilePhoto.url}
                                    alt="profile photo user"
                                  />
                                  <AvatarFallback>
                                    {comment.user.username[0]}
                                  </AvatarFallback>
                                </Avatar>
                              </Link>
                              <span className={"text-sm text-gray-500"}>
                                <Link
                                  to={`/user/${comment.user._id}`}
                                  className={
                                    "text-gray-600 hover:text-tropical-indigo font-medium capitalize my-transition"
                                  }
                                >
                                  {comment.user.username}
                                </Link>{" "}
                                on{" "}
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <p className={"text-black mt-2"}>
                              {comment.content}
                            </p>
                            <div
                              className={"mt-1 flex items-center gap-1"}
                              onClick={() => handleLikeComment(comment._id)}
                            >
                              {comment.likes.includes(user?.userId) ? (
                                <FaHeart size={16} className={"text-iris"} />
                              ) : (
                                <FaRegHeart size={16} className={"text-iris"} />
                              )}
                              <span
                                className={
                                  "text-sm text-iris font-medium select-none cursor-pointer"
                                }
                              >
                                {comment.likes.length} Likes
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={"my-6"}>
                        <p>No comments yet</p>
                      </div>
                    )}
                    <div className={"p-6 bg-white rounded-2xl"}>
                      <h4 className={"text-space-cadet text-lg font-semibold"}>
                        Leave a Comment
                      </h4>
                      <p className={"mt-2 text-sm"}>
                        Your email address will not be published. Required
                        fields are marked *
                      </p>
                      <Form {...form}>
                        <form
                          className={"mt-4 flex flex-col gap-y-4"}
                          onSubmit={form.handleSubmit(onsubmit)}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="username"
                              rules={{
                                required:
                                  "Your username is required to leave your comment !",
                              }}
                              render={({ field }) => (
                                <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                                  <FormLabel
                                    htmlFor="username"
                                    className={"comment-label"}
                                  >
                                    Username
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="username"
                                      placeholder="Username"
                                      className={"comment-input"}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage>
                                    {form.formState.errors.username?.message}
                                  </FormMessage>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              rules={{
                                required:
                                  "Your email is required to leave your comment !",
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                  message: "Enter a valid email !",
                                },
                              }}
                              render={({ field }) => (
                                <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                                  <FormLabel
                                    htmlFor="email"
                                    className={"comment-label"}
                                  >
                                    Email
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="email"
                                      placeholder="Email"
                                      className={"comment-input"}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage>
                                    {form.formState.errors.email?.message}
                                  </FormMessage>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div>
                            <FormField
                              control={form.control}
                              name="comment"
                              rules={{
                                required:
                                  "Your comment is required to submit !",
                              }}
                              render={({ field }) => (
                                <FormItem className="grid w-full gap-1.5">
                                  <FormLabel
                                    htmlFor="comment"
                                    className={"comment-label"}
                                  >
                                    Your Comment
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      id="comment"
                                      className={"comment-input"}
                                      placeholder="Type your comment here."
                                      rows={4}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage>
                                    {form.formState.errors.comment?.message}
                                  </FormMessage>
                                </FormItem>
                              )}
                            />
                          </div>
                          <Button type="submit" className={"w-fit main-btn"}>
                            Submit Comment
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <AuthorCard author={post?.author} />
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
              {categories?.length > 0 && (
                <div className={"mt-6"}>
                  <h5 className={"sidebar-title mb-4"}>Categories</h5>
                  <div className="flex flex-wrap gap-4">
                    {categories?.map((category) => (
                      <Link
                        to={`/categories/${category.slug}`}
                        key={category._id}
                        className={"category-tag"}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {authorPosts.length > 0 && (
                <div
                  className={
                    "bg-white p-6 rounded-2xl mt-10 lg:sticky static top-4"
                  }
                >
                  <h5 className={"sidebar-title mb-4"}>
                    last blog of {post?.author.username}
                  </h5>
                  <div className="flex flex-col space-y-3">
                    {authorPosts?.map((post) => (
                      <div key={post._id}>
                        <Link
                          to={`/posts/${post.slug}`}
                          className={
                            "text-iris flex items-center space-x-2 hover:text-space-cadet my-transition"
                          }
                        >
                          <h1 className={"text-md font-medium line-clamp-1"}>
                            {post?.title}
                          </h1>
                          <FaArrowUpRightFromSquare size={13} />
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
        {relatedPosts?.length > 0 && (
          <div className={"mt-10"}>
            <h3
              className={"text-3xl text-space-cadet font-semibold capitalize"}
            >
              Read Next
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PostSingle;
