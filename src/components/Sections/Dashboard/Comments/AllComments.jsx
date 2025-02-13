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
import { getAllComments } from "@/redux/apiCalls/commentApiCalls";
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
      const post = row.original.postId;
      return (
        <Link
          to={`/posts/${post.slug}`}
          className={"hover:text-iris hover:underline capitalize my-transition"}
        >
          {post.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      const author = row.original.postId.author;
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
      const {content} = row.original;
      return <div>{row.getValue('content')}</div>;
    },
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => {
      const owner = row.original.user;
      return <HoverUser user={owner} />;
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
          <FaHeart size={14} /> <span>{likes.length}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { content, _id } = row.original;
      return <DeleteComment content={content} id={_id} />;
    },
  },
];

function AllComments() {
  const { comments, message } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllComments());
  }, [message]);
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>All Comments</h1>
      <CommentsTable data={comments} columns={columns} />
    </section>
  );
}

export default AllComments;
