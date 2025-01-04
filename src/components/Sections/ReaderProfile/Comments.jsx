import React from "react";

// Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Icons
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Comments() {
  const comments = [
    {
      comment:
        "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment:
        "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment:
        "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment:
        "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment:
        "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
  ];
  return (
    <section>
      <div className={"pb-4 border-b border-gray-300 mb-4"}>
        <h4 className={"title-subpage-profile-reader"}>Comments</h4>
        <p className={"text-sm"}>Your all comments on Blogify.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-72">Comment</TableHead>
            <TableHead className={"min-w-40"}>Post</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className={"min-w-12"}>Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.comment}</TableCell>
              <TableCell>
                <Link
                  className={"hover:text-iris hover:underline my-transition"}
                >
                  {item.post}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  className={"hover:text-iris hover:underline my-transition"}
                >
                  {item.author}
                </Link>
              </TableCell>
              <TableCell className="flex items-center gap-1 text-iris">
                <FaHeart size={14} />
                <span className={"text-xs"}>{item.likes}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default Comments;
