import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "@/redux/apiCalls/postApiCalls";
import { useToast } from "@/hooks/use-toast";

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
import PostsTable from "./PostsTable";
import DeletePost from "./DeletePost";
import HoverUser from "@/components/Global/HoverUser";

// Icons
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa6";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={"min-w-48"}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { title, slug } = row.original;
      return (
        <Link
          to={`/posts/${slug}`}
          className={"hover:text-iris hover:underline capitalize my-transition"}
        >
          {title}
        </Link>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      const { author } = row.original;
      return <HoverUser user={author} />;
    },
  },
  {
    accessorKey: "createdAt",
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
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return (
        <div className="text-center">
          {new Date(createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
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
    cell: ({ row }) => {
      const { comments } = row.original;
      return (
        <div className="flex items-center justify-center gap-1">
          <FaComment size={14} /> <span>{comments.length}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;
      const [openDeletePost, setOpenDeletePost] = React.useState(false);
      const navigate = useNavigate();
      const { user } = useSelector((state) => state.auth);
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
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/posts/${post.slug}`);
                }}
                className={"cursor-pointer"}
              >
                View Post
              </DropdownMenuItem>
              {user.userId === post.author._id && (
                <DropdownMenuItem
                  onClick={() => {
                    navigate(`/dashboard/posts/${post.slug}/edit`);
                  }}
                  className={"cursor-pointer"}
                >
                  Edit Post
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => {
                  setOpenDeletePost(true);
                }}
                className={"cursor-pointer"}
              >
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeletePost
            openDeletePost={openDeletePost}
            setOpenDeletePost={setOpenDeletePost}
            post={post}
          />
        </>
      );
    },
  },
];

function AllPosts() {
  const { posts, error, message } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [message]);
  const { toast } = useToast();
  useEffect(() => {
    if (message) {
      toast({
        variant: "success",
        description: message,
        className: "custom-toast-success",
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [message, error]);
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>All Posts</h1>
      <PostsTable data={posts} columns={columns} />
    </section>
  );
}

export default AllPosts;
