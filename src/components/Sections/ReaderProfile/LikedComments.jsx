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
import { getLikedComments } from "@/redux/apiCalls/commentApiCalls";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import HoverUser from "@/components/Global/HoverUser";

function LikedComments() {
  const { likedComments, error } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const commentNumber = 12;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getLikedComments(commentNumber, currentPage));
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
        <h4 className={"title-subpage-profile-reader"}>Liked Comments</h4>
        <p className={"text-sm"}>Your liked comments on Blogify.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-60">Comment</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className={"min-w-40"}>Post</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className={"min-w-12"}>Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {likedComments?.total > 0 ? (
            likedComments?.comments?.map((comment) => (
              <TableRow key={comment._id}>
                <TableCell className="font-medium">{comment.content}</TableCell>
                <TableCell>
                  <Link
                    className={"hover:text-iris hover:underline my-transition"}
                  >
                    {comment.user.username}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    tp={`/posts/${comment.postId.slug}`}
                    className={"hover:text-iris hover:underline my-transition"}
                  >
                    {comment.postId.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <HoverUser user={comment.postId.author} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-iris">
                    <FaHeart size={14} />
                    <span className={"text-xs"}>{comment.likes.length}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="font-medium text-center" colspan={5}>
                No liked comments yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {likedComments?.total > 0 && (
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
                  Math.ceil(likedComments.total / commentNumber) &&
                "pointer-events-none opacity-60"
              }
              onClick={() => {
                if (
                  currentPage !== Math.ceil(likedComments.total / commentNumber)
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

export default LikedComments;
