import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { getLimitUsers } from "@/redux/apiCalls/userApiCalls";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserTable() {
  const users1 = [
    {
      username: "Olivia Martin",
      profile: "https://github.com/shadcn.png",
      email: "olivia.martin@email.com",
      role: "Reader",
    },
    {
      username: "Olivia Martin",
      profile: "https://github.com/shadcn.png",
      email: "olivia.martin@email.com",
      role: "Reader",
    },
    {
      username: "Olivia Martin",
      profile: "https://github.com/shadcn.png",
      email: "olivia.martin@email.com",
      role: "Reader",
    },
    {
      username: "Olivia Martin",
      profile: "https://github.com/shadcn.png",
      email: "olivia.martin@email.com",
      role: "Reader",
    },
    {
      username: "Olivia Martin",
      profile: "https://github.com/shadcn.png",
      email: "olivia.martin@email.com",
      role: "Reader",
    },
  ];
  const {usersLimit, error} = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLimitUsers(5));
  },[]);
  const {toast} = useToast();
  useEffect(() => {
    if(error){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  },[error])
  return (
    <div className="space-y-5">
      {usersLimit.users?.map((user) => (
        <div className="flex items-center flex-wrap" key={user._id}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.profilePhoto.url} alt="Avatar" />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <Link to={`/users/${user._id}`} className="text-sm font-medium capitalize leading-none hover:text-iris hover:underline my-transition">{user.username}</Link>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium capitalize">{user.status}</div>
        </div>
      ))}
    </div>
  );
}

export default UserTable;
