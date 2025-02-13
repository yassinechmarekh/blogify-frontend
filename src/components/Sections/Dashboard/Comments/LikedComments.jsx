import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedComments } from "@/redux/apiCalls/commentApiCalls";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Icons
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HoverUser from "@/components/Global/HoverUser";
import { useToast } from "@/hooks/use-toast";

function LikedComments() {
  const { likedComments, error } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const pageNumber = 12;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getLikedComments(pageNumber, currentPage));
  }, [currentPage]);
  const {toast} = useToast();
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
      <h1 className={"title-dashboard-pages"}>Liked Comments</h1>
      <Table className={"bg-white border rounded-2xl"}>
        <TableHeader>
          <TableRow>
            <TableHead className={"min-w-40"}>Post</TableHead>
            <TableHead className={"min-w-44"}>Comment</TableHead>
            <TableHead>owner</TableHead>
            <TableHead>Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {likedComments.comments?.length > 0 ? (
            likedComments?.comments?.map((comment, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link
                    to={`/posts/${comment.postId.slug}`}
                    className={"hover:text-iris hover:underline my-transition"}
                  >
                    {comment.postId.title}
                  </Link>
                </TableCell>
                <TableCell>{comment.content}</TableCell>
                <TableCell>
                  <HoverUser user={comment.user} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <FaHeart size={16} />
                    <span>{comment.likes.length}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className={"text-center"} colspan={4}>
                No liked comments yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {likedComments?.comments?.length > 0 && (
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
                currentPage === Math.ceil(likedComments.total / pageNumber) &&
                "pointer-events-none opacity-60"
              }
              onClick={() => {
                if (
                  currentPage !== Math.ceil(likedComments.total / pageNumber)
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
