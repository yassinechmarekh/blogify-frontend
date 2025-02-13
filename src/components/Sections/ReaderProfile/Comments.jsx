import React, { useEffect } from "react";

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
import { getCommentsByUser } from "@/redux/apiCalls/commentApiCalls";
import HoverUser from "@/components/Global/HoverUser";
import { useToast } from "@/hooks/use-toast";

function Comments() {
  const { myComments, error } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.userId) {
      dispatch(getCommentsByUser(user?.userId));
    }
  }, [user?.userId]);
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
        <h4 className={"title-subpage-profile-reader"}>Comments</h4>
        <p className={"text-sm"}>Your all comments on Blogify.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-72">Comment</TableHead>
            <TableHead className={"min-w-40"}>Post</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className={"min-w-12"}>Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myComments.length > 0 ? (
            myComments?.map((comment) => (
              <TableRow key={comment._id}>
                <TableCell className="font-medium">{comment.content}</TableCell>
                <TableCell>
                  <Link
                    to={`/posts/${comment.postSlug}`}
                    className={"hover:text-iris hover:underline my-transition"}
                  >
                    {comment.postTitle}
                  </Link>
                </TableCell>
                <TableCell>
                  <HoverUser user={comment.author} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1 text-iris">
                    <FaHeart size={14} />
                    <span className={"text-xs"}>{comment.likes}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="font-medium text-center" colspan={4}>
                No comments yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}

export default Comments;
