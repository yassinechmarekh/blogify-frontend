import React, { useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";

function HoverUser({ user }) {
  return (
    <HoverCard className={"min-w-28"}>
      <HoverCardTrigger asChild>
        <Button variant="link" className={"text-space-cadet"}>
          @{user?.username?.toLowerCase()}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white">
        <div className="flex space-x-4">
          <Link to={`/user/${user?._id}`}>
            <Avatar>
              <AvatarImage src={user?.profilePhoto?.url} />
              <AvatarFallback>{user?.username[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="space-y-1">
            <Link to={`/user/${user?._id}`} className="text-sm font-semibold">
              @{user?.username?.toLowerCase()}
            </Link>
            <p className="text-sm">
              {user?.bio ? user?.bio : "No bio available."}
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined{" "}
                {new Date(user?.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default HoverUser;
