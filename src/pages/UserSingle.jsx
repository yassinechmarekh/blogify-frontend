import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// Components
import BlogCard from "@/components/Global/BlogCard";
import MyPagination from "@/components/Global/MyPagination";
import TopPage from "@/components/Global/TopPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Icons
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "@/redux/apiCalls/userApiCalls";
import { useToast } from "@/hooks/use-toast";
import { getCommentsByUser } from "@/redux/apiCalls/commentApiCalls";
import HoverUser from "@/components/Global/HoverUser";
import {
  getLikedPostsByUser,
  getPostsByAuthorPaginate,
} from "@/redux/apiCalls/postApiCalls";

function UserSingle() {
  const comments = [
    {
      comment:
        "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment:
        "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment:
        "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment:
        "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment:
        "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
  ];
  const { user, error } = useSelector((state) => state.user);
  const comment = useSelector((state) => state.comment);
  const post = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getCommentsByUser(userId));
    dispatch(getLikedPostsByUser(userId));
  }, [userId]);
  useEffect(() => {
    dispatch(getPostsByAuthorPaginate(userId, currentPage));
  }, [userId, currentPage]);
  const { toast } = useToast();
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    } else if (comment.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: comment.error,
      });
    } else if (post.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: post.error,
      });
    }
  }, [error, comment.error, post.error]);
  return (
    <section>
      <TopPage page="Reader" />
      <div className="container">
        <div className={"py-6 border-b border-gray-300"}>
          <div className={"flex items-center gap-4"}>
            <Avatar className={"w-28 h-28"}>
              <AvatarImage src={user?.profilePhoto.url} />
              <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3
                className={"text-3xl text-space-cadet font-semibold capitalize"}
              >
                {user?.username}
              </h3>
              <h6 className={"sidebar-title text-xs mt-1"}>
                {user?.job ? user.job : "job not mentioned"}
              </h6>
              <div className={"flex gap-3 mt-3"}>
                {user?.socialLink.facebook && (
                  <Link to={user.socialLink.facebook}>
                    <FaFacebook size={24} className={"icon-list"} />
                  </Link>
                )}
                {user?.socialLink.twitter && (
                  <Link to={user.socialLink.twitter}>
                    <FaXTwitter size={24} className={"icon-list"} />
                  </Link>
                )}
                {user?.socialLink.instagram && (
                  <Link to={user.socialLink.instagram}>
                    <FaInstagram size={24} className={"icon-list"} />
                  </Link>
                )}
                {user?.socialLink.linkedin && (
                  <Link to={user.socialLink.linkedin}>
                    <FaLinkedin size={24} className={"icon-list"} />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <p className={"mt-3 w-full sm:w-2/3 lg:w-1/2 xl:w-2/5"}>
            {user?.bio ? user.bio : "No bio available"}
          </p>
          {user?.address && (
            <div className={"mt-4 flex items-start gap-2"}>
              <FaMapMarkerAlt size={20} className={"text-iris"} />
              <span>{user.address}</span>
            </div>
          )}
        </div>
        <div className={"mt-8"}>
          <h3 className={"text-3xl text-space-cadet font-semibold capitalize"}>
            {user?.username} comments
          </h3>
          <Table className={"mt-4"}>
            <TableHeader className={"text-space-cadet"}>
              <TableRow>
                <TableHead className={"min-w-64"}>Comment</TableHead>
                <TableHead className={"min-w-52"}>Post</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className={"min-w-28"}>Likes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comment.myComments.length > 0 ? (
                comment.myComments.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.content}
                    </TableCell>
                    <TableCell
                      className={
                        "hover:text-iris first-letter:capitalize hover:underline my-transition"
                      }
                    >
                      <Link>{item.postTitle}</Link>
                    </TableCell>
                    <TableCell>
                      <HoverUser user={item.author} />
                    </TableCell>
                    <TableCell className="flex items-center gap-2 text-iris">
                      <FaHeart size={16} />
                      <span>{item.likes} Likes</span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="font-medium text-center" colSpan={"4"}>
                    No comments yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className={"mt-8"}>
          <h3 className={"text-3xl text-space-cadet font-semibold capitalize"}>
            Liked Posts
          </h3>
          <div
            className={
              "mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            }
          >
            {post.likedPosts.length > 0 ? (
              post.likedPosts.map((post, index) => (
                <BlogCard key={index} post={post} />
              ))
            ) : (
              <p>No post liked yet</p>
            )}
          </div>
        </div>
        {(user?.status === "author" || user?.status === "admin") && (
          <div className={"mt-8"}>
            <h3
              className={"text-3xl text-space-cadet font-semibold capitalize"}
            >
              {user?.username}'s Posts
            </h3>

            <div className="mt-4">
              {post.posts.total > 0 ? (
                <>
                  <div
                    className={
                      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    }
                  >
                    {post.posts.posts.map((post, index) => (
                      <BlogCard key={index} post={post} />
                    ))}
                  </div>
                  {post.posts.total > 6 && (
                    <div className={"mt-10"}>
                      <MyPagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        total={post.posts.total}
                        pageNumber={6}
                      />
                    </div>
                  )}
                </>
              ) : (
                <p>No posts available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default UserSingle;
