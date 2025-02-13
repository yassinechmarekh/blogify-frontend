import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/redux/apiCalls/postApiCalls";
import { useDispatch } from "react-redux";

function DeletePost({ openDeletePost, setOpenDeletePost, post }) {
  const dispatch = useDispatch();
  return (
    <AlertDialog open={openDeletePost} onOpenChange={setOpenDeletePost}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={"text-space-cadet"}>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p>You really want to delete this posts :</p>
            <span className={"text-iris font-medium capitalize"}>
              {post.title}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={
              "bg-iris text-white hover:bg-tropical-indigo hover:text-white"
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={"bg-red-600 hover:bg-red-700"}
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletePost;
