import React from 'react';
import { Link } from "react-router-dom";

// Components
import UsersTable from "./UsersTable";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

// Icons
import { ArrowUpDown, CalendarIcon } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa6";


const authors = [
  {
    id: "m5gr84i9",
    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 28,
    "posts Likes": 316,
    comments: 80,
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 63,
    "posts Likes": 242,
    comments: 132,
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 42,
    "posts Likes": 837,
    comments: 493,
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 27,
    "posts Likes": 874,
    comments: 74,
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",

    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 51,
    "posts Likes": 721,
    comments: 293,
    email: "carmella@hotmail.com",
  },
  {
    id: "m5gr84i9",
    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 13,
    "posts Likes": 316,
    comments: 80,
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 48,
    "posts Likes": 242,
    comments: 132,
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 39,
    "posts Likes": 837,
    comments: 493,
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",

    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 28,
    "posts Likes": 874,
    comments: 74,
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",

    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 28,
    "posts Likes": 721,
    comments: 293,
    email: "carmella@hotmail.com",
  },
  {
    id: "m5gr84i9",
    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 28,
    "posts Likes": 316,
    comments: 80,
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 28,
    "posts Likes": 242,
    comments: 132,
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 28,
    "posts Likes": 837,
    comments: 493,
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",

    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 28,
    "posts Likes": 874,
    comments: 74,
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",

    profile: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    posts: 28,
    "posts Likes": 721,
    comments: 293,
    email: "carmella@hotmail.com",
  },
];

const columns = [
  {
    accessorKey: "profile",
    header: "Profile",
    cell: ({ row }) => {
      const profile = row.original.profile;
      return (
        <HoverCard className={"min-w-28"}>
          <HoverCardTrigger asChild>
            <Button variant="link" className={"text-space-cadet"}>
              @{profile.username}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Link to={"/"}>
                <Avatar>
                  <AvatarImage src={profile.profile} />
                  <AvatarFallback>{profile.username[0]}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="space-y-1">
                <Link to={"/"} className="text-sm font-semibold">
                  @{profile.username}
                </Link>
                <p className="text-sm">{profile.bio}</p>
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase min-w-52">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "posts",
    header: "Posts",
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-1 min-w-20">
        {row.getValue("posts")}
      </div>
    ),
  },
  {
    accessorKey: "posts Likes",
    header: "Posts Likes",
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-1 min-w-20">
        <FaHeart size={14} /> {row.getValue("posts Likes")}
      </div>
    ),
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-1 min-w-20">
        <FaComment size={14} /> {row.getValue("comments")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
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

function Authors() {
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>Authors</h1>
      <UsersTable data={authors} columns={columns} addUser={true} />
    </section>
  )
}

export default Authors;