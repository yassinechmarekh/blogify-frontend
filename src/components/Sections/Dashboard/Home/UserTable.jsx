import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

function UserTable() {
  const users = [
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
  return (
    <div className="space-y-8">
      {users.map((user, index) => (
        <div className="flex items-center flex-wrap" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.profile} alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">{user.role}</div>
        </div>
      ))}
    </div>
  );
}

export default UserTable;
