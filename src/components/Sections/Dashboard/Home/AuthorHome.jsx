import React, { useEffect } from "react";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserTable from "./UserTable";
import CategoriesChart from "./CategoriesChart";

// Icons
import { MdArticle } from "react-icons/md";
import { FaComments } from "react-icons/fa6";
import { LuFileHeart } from "react-icons/lu";
import { LuMessageCircleHeart } from "react-icons/lu";
import { CategoriesBarChart } from "./CategoriesBarChart";
import PostTable from "./PostTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getLatestPostsByAuthor,
  getPostCountByAuthor,
  getPostsLikesByAuthor,
} from "@/redux/apiCalls/postApiCalls";
import {
  getCommentStatsByAuthor,
  getLikesCommentsCountByAuthor,
} from "@/redux/apiCalls/commentApiCalls";
import { useToast } from "@/hooks/use-toast";

function AuthorHome() {
  const {
    postStats,
    likesCount,
    latestPosts,
    error: postError,
  } = useSelector((state) => state.post);
  const {
    commentStats,
    likesCommentsCount,
    error: commentError,
  } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostCountByAuthor());
    dispatch(getPostsLikesByAuthor());
    dispatch(getCommentStatsByAuthor());
    dispatch(getLikesCommentsCountByAuthor());
    dispatch(getLatestPostsByAuthor(4));
  }, []);
  const { toast } = useToast();
  useEffect(() => {
    if (postError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: postError,
      });
    } else if (commentError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: commentError,
      });
    }
  }, [postError, commentError]);
  const cards = [
    {
      title: "Posts",
      icon: MdArticle,
      value: postStats?.posts,
      bonus: `+ ${postStats?.countLastMonth} from last month`,
    },
    {
      title: "Comments",
      icon: FaComments,
      value: commentStats?.commentsCount,
      bonus: `+ ${commentStats?.countLastMonth} from last month`,
    },
    {
      title: "Posts Likes",
      icon: LuFileHeart,
      value: likesCount?.likes,
      bonus: `From ${likesCount?.postsCount} posts`,
    },
    {
      title: "Comments Likes",
      icon: LuMessageCircleHeart,
      value: likesCommentsCount?.likes,
      bonus: `From ${likesCommentsCount?.commentsCount} comments`,
    },
  ];
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Card className={"shadow-tropical-indigo/60"} key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon && <card.icon />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-iris">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.bonus}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-7">
        <div className={`col-span-7 ${latestPosts?.posts?.length > 0 && 'lg:col-span-4'}`}>
          <CategoriesBarChart />
        </div>
        {latestPosts?.posts?.length > 0 && (
          <Card className="col-span-7 lg:col-span-3">
            <CardHeader>
              <CardTitle className={"text-space-cadet"}>Latest Posts</CardTitle>
              <CardDescription>
                You created +{latestPosts?.countPostsLastMonth} posts last month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PostTable posts={latestPosts?.posts} />
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

export default AuthorHome;
