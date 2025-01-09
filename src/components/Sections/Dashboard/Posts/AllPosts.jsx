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

const allPosts = [
  {
    id: "m5gr84i9",
    title: "Top 7 Travel Startups to Watch Out for in 2024",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    publishedAt: new Date("2023-12-31").toISOString().split("T")[0],
    likes: 273,
    comments: 78,
  },
  {
    id: "m5gr84i9",
    title: "The Future of Work: Tech and Remote Trends",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    publishedAt: new Date("2023-04-12").toISOString().split("T")[0],
    likes: 273,
    comments: 78,
  },
  {
    id: "m5gr84i9",
    title: "How AI and Automation Are Redefining the Travel Industry",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    publishedAt: new Date("2024-12-31").toISOString().split("T")[0],
    likes: 362,
    comments: 84,
  },
  {
    id: "m5gr84i9",
    title: "Using Data Analytics to Drive Growth in the Travel Industry",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    publishedAt: new Date("2022-07-23").toISOString().split("T")[0],
    likes: 83,
    comments: 43,
  },
  {
    id: "m5gr84i9",
    title: "The Role of AI in Shaping Future Travel Experiences",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
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
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      const author = row.original.author;
      return (
        <HoverCard className={"min-w-28"}>
          <HoverCardTrigger asChild>
            <Button variant="link" className={"text-space-cadet"}>
              @{author.username}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Link to={"/"}>
                <Avatar>
                  <AvatarImage src={author.profile} />
                  <AvatarFallback>{author.username}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="space-y-1">
                <Link to={"/"} className="text-sm font-semibold">
                  @{author.username}
                </Link>
                <p className="text-sm">{author.bio}</p>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
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

function AllPosts() {
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>All Posts</h1>
      <PostsTable data={allPosts} columns={columns} />
    </section>
  );
}

export default AllPosts;
