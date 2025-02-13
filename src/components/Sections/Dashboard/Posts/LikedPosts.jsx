import React, { useEffect, useState } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { getLikedPostsByUserPaginate } from "@/redux/apiCalls/postApiCalls";
import { useToast } from "@/hooks/use-toast";
import HoverUser from "@/components/Global/HoverUser";

const likedPosts1 = [
  {
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    likes: 250.0,
  },
  {
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    likes: 250.0,
  },
  {
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    likes: 250.0,
  },
  {
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    likes: 250.0,
  },
  {
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    likes: 250.0,
  },
  {
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    likes: 250.0,
  },
  {
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    likes: 250.0,
  },
  {
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    likes: 250.0,
  },
  {
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    likes: 250.0,
  },
  {
    author: {
      username: "Erling",
      profile: "https://github.com/vercel.png",
      bio: "The React Framework – created and maintained by @vercel.",
    },
    post: "Top 7 Travel Startups to Watch Out for in 2024",
    likes: 250.0,
  },
];

function LikedPosts() {
  const { likedPosts, error } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumber = 12;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLikedPostsByUserPaginate(pageNumber, currentPage));
  }, [pageNumber, currentPage]);
  const { toast } = useToast();
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [error]);
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>Liked Posts</h1>
      <Table className={"bg-white border rounded-2xl overflow-x-auto"}>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Post</TableHead>
            <TableHead>Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {likedPosts?.posts?.map((post) => (
            <TableRow key={post._id}>
              <TableCell>
                <HoverUser user={post.author} />
              </TableCell>
              <TableCell>
                <Link
                  to={`/posts/${post.slug}`}
                  className={
                    "hover:text-iris hover:underline capitalize my-transition"
                  }
                >
                  {post.title}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <FaHeart size={16} />
                  <span>{post.likes.length}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2 text-space-cadet">
          <Button
            variant="outline"
            size="sm"
            className={`${
              currentPage === 1 ? "pointer-events-none" : "bg-white text-iris"
            }`}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`${
              currentPage === Math.ceil(likedPosts?.total / pageNumber)
                ? "pointer-events-none"
                : "bg-white text-iris"
            }`}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LikedPosts;
