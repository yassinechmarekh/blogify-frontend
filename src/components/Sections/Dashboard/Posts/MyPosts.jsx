import React from "react";
import { Link } from "react-router-dom";

// Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostsTable from "./PostsTable";

// Icons
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa6";
import {
  ArrowUpDown,
  CalendarIcon,
  MoreHorizontal,
} from "lucide-react";

const myPosts = [
  {
    id: "m5gr84i9",
    title: "Top 7 Travel Startups to Watch Out for in 2024",
    publishedAt: new Date("2023-12-31").toISOString().split("T")[0],
    likes: 273,
    comments: 78,
  },
  {
    id: "m5gr84i9",
    title: "The Future of Work: Tech and Remote Trends",
    publishedAt: new Date("2023-04-12").toISOString().split("T")[0],
    likes: 273,
    comments: 78,
  },
  {
    id: "m5gr84i9",
    title: "How AI and Automation Are Redefining the Travel Industry",
    publishedAt: new Date("2024-12-31").toISOString().split("T")[0],
    likes: 362,
    comments: 84,
  },
  {
    id: "m5gr84i9",
    title: "Using Data Analytics to Drive Growth in the Travel Industry",
    publishedAt: new Date("2022-07-23").toISOString().split("T")[0],
    likes: 83,
    comments: 43,
  },
  {
    id: "m5gr84i9",
    title: "The Role of AI in Shaping Future Travel Experiences",
    publishedAt: new Date("2021-09-13").toISOString().split("T")[0],
    likes: 392,
    comments: 213,
  },
];

const columns = [
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        to={"/"}
        className={"hover:text-iris hover:underline my-transition"}
      >
        {row.getValue("title")}
      </Link>
    ),
  },
  {
    accessorKey: "publishedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("publishedAt")}</div>
    ),
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
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-1">
        <FaHeart size={14} /> <span>{row.getValue("likes")}</span>
      </div>
    ),
  },
  {
    accessorKey: "comments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comments
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-1">
        <FaComment size={14} /> <span>{row.getValue("comments")}</span>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [openDeletePost, setOpenDeletePost] = React.useState(false);
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={"bg-white"}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Post</DropdownMenuItem>
              <DropdownMenuItem>Edit Post</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenDeletePost(true);
                }}
              >
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={openDeletePost} onOpenChange={setOpenDeletePost}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className={"text-space-cadet"}>
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <p>You really want to delete this posts :</p>
                  <span
                    className={"text-iris font-medium first-letter:capitalize"}
                  >
                    {row.getValue("title")}
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
                <AlertDialogAction className={"bg-red-600 hover:bg-red-700"}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];

function MyPosts() {
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>My Posts</h1>
      <PostsTable data={myPosts} columns={columns} />
    </section>
  );
}

export default MyPosts;