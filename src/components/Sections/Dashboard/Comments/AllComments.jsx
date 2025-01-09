import React from "react";
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

const allComments = [
  {
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    comment:
      "This article is exactly what I needed! Your insights are incredibly helpful.",
    owner: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    likes: 250.0,
  },
  {
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    comment:
      "This article is exactly what I needed! Your insights are incredibly helpful.",
    owner: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    likes: 250.0,
  },
  {
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    comment:
      "This article is exactly what I needed! Your insights are incredibly helpful.",
    owner: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    likes: 250.0,
  },
  {
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    comment:
      "This article is exactly what I needed! Your insights are incredibly helpful.",
    owner: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    likes: 250.0,
  },
  {
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    comment:
      "This article is exactly what I needed! Your insights are incredibly helpful.",
    owner: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    likes: 250.0,
  },
  {
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    comment:
      "This article is exactly what I needed! Your insights are incredibly helpful.",
    owner: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    likes: 250.0,
  },
  {
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    comment:
      "This article is exactly what I needed! Your insights are incredibly helpful.",
    owner: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    likes: 250.0,
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
    cell: ({ row }) => (
      <Link
        to={"/"}
        className={"hover:text-iris hover:underline my-transition"}
      >
        {row.getValue("post")}
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
    accessorKey: "comment",
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
    cell: ({ row }) => (
      <div>{row.getValue("comment")}</div>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => {
      const owner = row.original.owner;
      return (
        <HoverCard className={"min-w-28"}>
          <HoverCardTrigger asChild>
            <Button variant="link" className={"text-space-cadet"}>
              @{owner.username}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Link to={"/"}>
                <Avatar>
                  <AvatarImage src={owner.profile} />
                  <AvatarFallback>{owner.username}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="space-y-1">
                <Link to={"/"} className="text-sm font-semibold">
                  @{owner.username}
                </Link>
                <p className="text-sm">{owner.bio}</p>
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
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
              <span className={'text-iris first-letter:capitalize font-medium'}>{row.getValue('comment')}</span>
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
              <AlertDialogAction className={"bg-red-600 hover:bg-red-700"}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];

function AllComments() {
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>All Comments</h1>
      <CommentsTable data={allComments} columns={columns} />
    </section>
  );
}

export default AllComments;
