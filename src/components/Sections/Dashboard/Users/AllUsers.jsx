import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "@/redux/apiCalls/userApiCalls";

// Components
import UsersTable from "./UsersTable";
import { Button } from "@/components/ui/button";
import DeleteUser from "./DeleteUser";
import HoverUser from "@/components/Global/HoverUser";

// Icons
import { ArrowUpDown } from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa6";

const columns = [
  {
    accessorKey: "profile",
    header: "Profile",
    cell: ({ row }) => {
      const { _id, username, profilePhoto, bio, createdAt } = row.original;
      const user = {
        _id: _id,
        username: username,
        profilePhoto: profilePhoto,
        bio: bio,
        createdAt: createdAt,
      }
      return (
        <HoverUser user={user} />
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize min-w-16">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "posts Likes",
    // header: "Posts Likes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posts Likes
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize flex justify-center items-center gap-1 min-w-20">
        <FaHeart size={14} /> {row.getValue("posts Likes")}
      </div>
    ),
  },
  {
    accessorKey: "comments",
    // header: "Comments",
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
      <div className="capitalize flex justify-center items-center gap-1 min-w-20">
        <FaComment size={14} /> {row.getValue("comments")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { username, _id } = row.original;

      return (
        <DeleteUser username={username} _id={_id} />
      );
    },
  },
];

function AllUsers() {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  return (
    <section>
      <h1 className={"title-dashboard-pages"}>All Users</h1>
      <UsersTable data={users} columns={columns} addUser={true} />
    </section>
  );
}

export default AllUsers;
