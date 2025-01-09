import React from "react";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Icons
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CalendarIcon } from "lucide-react";

const likedComments = [
  {
    post: "Top 7 Travel Startups to Watch Out for in 2024",
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

function LikedComments() {
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>Liked Posts</h1>
      <Table className={"bg-white border rounded-2xl"}>
        <TableHeader>
          <TableRow>
            <TableHead className={"min-w-40"}>Post</TableHead>
            <TableHead className={"min-w-44"}>Comment</TableHead>
            <TableHead>owner</TableHead>
            <TableHead>Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {likedComments.map((comment, index) => (
            <TableRow key={index}>
              <TableCell>
                <Link
                  className={"hover:text-iris hover:underline my-transition"}
                >
                  {comment.post}
                </Link>
              </TableCell>
              <TableCell>{comment.comment}</TableCell>
              <TableCell>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link" className={"text-space-cadet"}>
                      @{comment.owner.username}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src={comment.owner.profile} />
                        <AvatarFallback>VC</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          @{comment.owner.username}
                        </h4>
                        <p className="text-sm">{comment.owner.bio}</p>
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
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <FaHeart size={16} />
                  <span>{comment.likes}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          12 of 150 row(s) selected.
        </div>
        <div className="space-x-2 text-space-cadet">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LikedComments;
