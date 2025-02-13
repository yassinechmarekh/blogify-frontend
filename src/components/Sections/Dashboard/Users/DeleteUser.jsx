import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getAllAuthors, getAllUser } from "@/redux/apiCalls/userApiCalls";

// Components
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

// Icons
import { FaTrashAlt } from "react-icons/fa";

function DeleteUser({ username, _id }) {
  const dispatch = useDispatch();
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };
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
            Are you absolutely sure to delete{" "}
            <span className={"capitalize"}>{username}</span> ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className={'text-md font-bold text-red-600'}>NB :</span> Deleting{" "}
            <span className={"capitalize font-medium text-iris"}>
              {username}
            </span>
            's account deletes his posts, comments and likes.
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
              handleDeleteUser(_id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteUser;
