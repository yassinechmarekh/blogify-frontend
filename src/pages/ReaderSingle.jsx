import React from "react";
import { Link } from "react-router-dom";

// Components
import BlogCard from "@/components/Global/BlogCard";
import MyPagination from "@/components/Global/MyPagination";
import TopPage from "@/components/Global/TopPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


function ReaderSingle() {
  const comments = [
    {
      comment: "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment: "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment: "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment: "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
    {
      comment: "I’ve been following your blog for a while now, and this post might be your best one yet!",
      post: "The Future of Work: Tech and Remote Trends",
      author: "Ethan Caldwell",
      likes: 10,
    },
  ];
  return (
    <section>
      <TopPage page="Reader" />
      <div className="container">
        <div className={"py-6 border-b border-gray-300"}>
          <div className={"flex items-center gap-4"}>
            <Avatar className={"w-28 h-28"}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3
                className={"text-3xl text-space-cadet font-semibold capitalize"}
              >
                Ethan Caldwell
              </h3>
              <h6 className={"sidebar-title text-xs mt-1"}>
                REFLECTIVE BLOGGER
              </h6>
              <div className={"flex gap-3 mt-3"}>
                <Link>
                  <FaFacebook size={24} className={"icon-list"} />
                </Link>
                <Link>
                  <FaXTwitter size={24} className={"icon-list"} />
                </Link>
                <Link>
                  <FaInstagram size={24} className={"icon-list"} />
                </Link>
                <Link>
                  <FaLinkedin size={24} className={"icon-list"} />
                </Link>
              </div>
            </div>
          </div>
          <p className={"mt-3 w-full sm:w-2/3 lg:w-1/2 xl:w-2/5"}>
            Ethan Caldwell shares thoughtful insights and reflections on life,
            culture, and personal growth. His work explores the intersections of
            creativity and experience, offering readers unique perspectives.
          </p>
          <div className={"mt-4 flex items-start gap-2"}>
            <FaMapMarkerAlt size={20} className={"text-iris"} />
            <span>Paris, France</span>
          </div>
        </div>
        <div className={"mt-8"}>
          <h3 className={"text-3xl text-space-cadet font-semibold capitalize"}>
            Ethan Caldwell comments
          </h3>
          <Table className={"mt-4"}>
            <TableHeader className={'text-space-cadet'}>
              <TableRow>
                <TableHead className={'min-w-64'}>Comment</TableHead>
                <TableHead className={'min-w-52'}>Post</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className={'min-w-28'}>Likes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((item,index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.comment}
                  </TableCell>
                  <TableCell>
                    <Link className={'hover:text-iris hover:underline my-transition'}>{item.post}</Link>
                  </TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell className="flex items-center gap-2 text-iris">
                    <FaHeart size={16}/>
                    <span>{item.likes} Likes</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className={"mt-8"}>
          <h3 className={"text-3xl text-space-cadet font-semibold capitalize"}>
            Liked Posts
          </h3>
          <div
            className={
              "mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            }
          >
            {[1, 2, 3, 4, 5, 6].map((post, index) => (
              <BlogCard key={index} />
            ))}
          </div>
          <div className={"mt-10"}>
            <MyPagination />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReaderSingle;
