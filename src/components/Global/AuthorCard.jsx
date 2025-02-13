import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function AuthorCard({ author }) {
  return (
    <div className={"bg-white p-6 rounded-2xl"}>
      <h3 className={"sidebar-title"}>about</h3>
      <div className={"my-2 flex items-center gap-3"}>
        <Avatar className={"w-12 h-12"}>
          <AvatarImage src={author?.profilePhoto?.url} />
          <AvatarFallback>{author?.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className={"text-lg text-space-cadet font-semibold capitalize"}>
            {author?.username}
          </h3>
          <h5 className={"text-sm text-dim-gray font-medium capitalize"}>
            {author?.job || "Job Undefined"}
          </h5>
        </div>
      </div>
      <p>{author?.bio || "No bio available"}</p>
      <div className={"my-4 flex items-start gap-2"}>
        <FaMapMarkerAlt size={20} className={"text-iris"} />
        <span>{author?.address || "Address Undefined"}</span>
      </div>
      <div className={"flex gap-3"}>
        {author?.socialLink.twitter && (
          <Link to={author?.socialLink.twitter}>
            <FaXTwitter size={22} className={"icon-list"} />
          </Link>
        )}
        {author?.socialLink.facebook && (
          <Link to={author?.socialLink.facebook}>
            <FaFacebook size={22} className={"icon-list"} />
          </Link>
        )}
        {author?.socialLink.instagram && (
          <Link to={author?.socialLink.instagram}>
            <FaInstagram size={22} className={"icon-list"} />
          </Link>
        )}
        {author?.socialLink.linkedin && (
          <Link to={author?.socialLink.linkedin}>
            <FaLinkedin size={22} className={"icon-list"} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default AuthorCard;
