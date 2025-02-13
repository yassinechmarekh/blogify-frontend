import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { FaHeart } from "react-icons/fa6";
import { ArrowUpDown, CalendarIcon } from "lucide-react";
import CommentsTable from "./CommentsTable";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsByUser } from "@/redux/apiCalls/commentApiCalls";
import HoverUser from "@/components/Global/HoverUser";
import DeleteComment from "./DeleteComment";

const columns = [
  {
    accessorKey: "_id",
    header: "ID",
    enableHiding: true,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "post",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Post
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const {postTitle, postSlug} = row.original;
      return (
        <Link
          to={`/posts/${postSlug}`}
          className={"hover:text-iris hover:underline capitalize my-transition"}
        >
          {postTitle}
        </Link>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      const {author} = row.original;
      return <HoverUser user={author} />;
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comment
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue('content')}</div>;
    },
  },
  {
    accessorKey: "likes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Likes
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { likes } = row.original;
      return (
        <div className="flex items-center justify-center gap-1">
          <FaHeart size={14} /> <span>{likes}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { comment, _id } = row.original;
      return <DeleteComment content={comment} id={_id} />;
    },
  },
];

function MyComments() {
  const {myComments, message} = useSelector(state => state.comment);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommentsByUser(user.userId));
  },[message]);
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>My Comments</h1>
      <CommentsTable data={myComments} columns={columns} />
    </section>
  );
}

export default MyComments;
