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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteComment } from "@/redux/apiCalls/commentApiCalls";

function DeleteComment({ content, id }) {
  const dispatch = useDispatch();
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={"p-2 bg-red-600 hover:bg-red-700 text-white rounded-md"}
      >
        <FaTrashAlt size={14} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={"text-space-cadet"}>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p>You really want to delete this comment :</p>
            <span className={"text-iris first-letter:capitalize font-medium"}>
              {content}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={
              "bg-iris hover:bg-tropical-indigo text-white hover:text-white"
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={"bg-red-600 hover:bg-red-700"}
            onClick={() => {
              dispatch(deleteComment(id));
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteComment;
