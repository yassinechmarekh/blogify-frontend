import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


// Icons
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function AuthorCard() {
  return (
    <div className={"bg-white p-6 rounded-2xl"}>
      <h3 className={"sidebar-title"}>about</h3>
      <div className={"my-2 flex items-center gap-3"}>
        <Avatar className={'w-12 h-12'}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3 className={"text-lg text-space-cadet font-semibold capitalize"}>
            Ethan Caldwell
          </h3>
          <h5 className={"text-sm text-dim-gray font-medium capitalize"}>
            Blogify Admin
          </h5>
        </div>
      </div>
      <p>
        Ethan Caldwell shares thoughtful insights and reflections on life,
        culture, and personal growth. His work explores the intersections of
        creativity and experience, offering readers unique perspectives.
      </p>
      <div className={"my-4 flex items-start gap-2"}>
        <FaMapMarkerAlt size={20} className={"text-iris"} />
        <span>Paris, France</span>
      </div>
      <div className={"flex gap-3"}>
        <Link>
          <FaXTwitter size={22} className={"icon-list"} />
        </Link>
        <Link>
          <FaFacebook size={22} className={"icon-list"} />
        </Link>
        <Link>
          <FaInstagram size={22} className={"icon-list"} />
        </Link>
        <Link>
          <FaLinkedin size={22} className={"icon-list"} />
        </Link>
      </div>
    </div>
  );
}

export default AuthorCard;
