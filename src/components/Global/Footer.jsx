import React from "react";
import { Link } from "react-router-dom";

// Components
import Logo from "./Logo";

// Icons
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="py-10 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[450px,repeat(1,1fr)] xl:grid-cols-[450px,repeat(3,1fr)] gap-8 xl:gap-6">
          <div>
            <Logo />
            <p className={"mt-3"}>
              Welcome to ultimate source for fresh perspectives! Explore curated
              content to enlighten, entertain and engage global readers.
            </p>
            <ul className={"mt-4 flex gap-3"}>
              <Link>
                <li className={"icon-list"}>
                  <FaFacebook size={24} />
                </li>
              </Link>
              <Link>
                <li className={"icon-list"}>
                  <FaXTwitter size={24} />
                </li>
              </Link>
              <Link>
                <li className={"icon-list"}>
                  <FaInstagram size={24} />
                </li>
              </Link>
              <Link>
                <li className={"icon-list"}>
                  <FaLinkedin size={24} />
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <h5 className={'sidebar-title'}>Quick links</h5>
            <ul className={'mt-3 leading-8'}>
                <Link><li className={'footer-menu'}>home</li></Link>
                <Link><li className={'footer-menu'}>Categories</li></Link>
                <Link><li className={'footer-menu'}>Posts</li></Link>
                <Link><li className={'footer-menu'}>Dashboard</li></Link>
            </ul>
          </div>
          <div>
            <h5 className={'sidebar-title'}>Categories</h5>
            <ul className={'mt-3 leading-8'}>
                <Link><li className={'footer-menu'}>Technology</li></Link>
                <Link><li className={'footer-menu'}>Travel</li></Link>
                <Link><li className={'footer-menu'}>Sport</li></Link>
                <Link><li className={'footer-menu'}>Business</li></Link>
            </ul>
          </div>
          <div>
            <h5 className={'sidebar-title'}>Authors</h5>
            <ul className={'mt-3 leading-8'}>
                <Link><li className={'footer-menu'}>Ethan Caldwell</li></Link>
                <Link><li className={'footer-menu'}>Ethan Caldwell</li></Link>
                <Link><li className={'footer-menu'}>Ethan Caldwell</li></Link>
                <Link><li className={'footer-menu'}>Ethan Caldwell</li></Link>
            </ul>
          </div>
        </div>
        <p className={'py-3 text-center text-sm text-dim-gray/80'}>&#169; <Link to={'/'} className={'text-iris font-medium'}>Blogify</Link>, All Right Reserved. Developed By <Link className={'text-space-cadet hover:text-iris my-transition font-medium'}>Yassine_ChM</Link></p>
      </div>
    </footer>
  );
}

export default Footer;
