import React, { useEffect, useState } from "react";

// Components
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
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLikedPostsByUserPaginate } from "@/redux/apiCalls/postApiCalls";
import { Button } from "@/components/ui/button";
import HoverUser from "@/components/Global/HoverUser";
import { useToast } from "@/hooks/use-toast";

function LikedPosts() {
  const { likedPosts, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const likedPostsNumber = 12;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getLikedPostsByUserPaginate(likedPostsNumber, currentPage));
  }, [currentPage]);
  const { toast } = useToast();
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [error]);
  return (
    <section>
      <div className={"pb-4 border-b border-gray-300 mb-4"}>
        <h4 className={"title-subpage-profile-reader"}>Liked Posts</h4>
        <p className={"text-sm"}>Your liked posts on Blogify.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"min-w-72"}>Post</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className={"min-w-12"}>Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {likedPosts?.total > 0 ? (
            likedPosts?.posts?.map((post) => (
              <TableRow key={post._id}>
                <TableCell>
                  <Link
                    to={`/posts/${post.slug}`}
                    className={
                      "font-medium hover:text-iris hover:underline my-transition capitalize"
                    }
                  >
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <HoverUser user={post.author} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-iris">
                    <FaHeart size={14} />
                    <span className={"text-xs"}>{post.likes.length}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className={'font-medium text-center'} colspan={3}>
                No liked posts yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {likedPosts?.total > 0 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2 text-space-cadet">
            <Button
              variant="outline"
              size="sm"
              className={currentPage === 1 && "pointer-events-none opacity-60"}
              onClick={() => {
                if (currentPage !== 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={
                currentPage ===
                  Math.ceil(likedPosts.total / likedPostsNumber) &&
                "pointer-events-none opacity-60"
              }
              onClick={() => {
                if (
                  currentPage !== Math.ceil(likedPosts.total / likedPostsNumber)
                ) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default LikedPosts;
