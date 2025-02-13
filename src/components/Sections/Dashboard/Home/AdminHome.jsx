import React, { useEffect } from "react";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Icons
import { ImUsers } from "react-icons/im";
import { FaBookReader } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { FaComments } from "react-icons/fa6";
import UserTable from "./UserTable";
import CategoriesChart from "./CategoriesChart";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorsStats, getReadersStats } from "@/redux/apiCalls/userApiCalls";
import { getPostStats } from "@/redux/apiCalls/postApiCalls";
import { getCommentsStats } from "@/redux/apiCalls/commentApiCalls";

function AdminHome() {
  const {usersLimit, authorsStats, readersStats} = useSelector(state => state.user);
  const { postStats } = useSelector(state => state.post);
  const {commentStats} = useSelector(state => state.comment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthorsStats());
    dispatch(getReadersStats());
    dispatch(getPostStats());
    dispatch(getCommentsStats());
  },[])
  const cards = [
    {
      title: "Authors",
      icon: ImUsers,
      value: authorsStats?.authorsCount,
      bonus: authorsStats?.countLastMonth,
    },
    {
      title: "Readers",
      icon: FaBookReader,
      value: readersStats?.readersCount,
      bonus: readersStats?.countLastMonth,
    },
    {
      title: "Posts",
      icon: MdArticle,
      value: postStats?.postsCount,
      bonus: postStats?.countLastMonth,
    },
    {
      title: "Comments",
      icon: FaComments,
      value: commentStats?.commentsCount,
      bonus: commentStats?.countLastMonth,
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
              <p className="text-xs text-muted-foreground">
                +{card.bonus} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-7">
        <div className="col-span-7 lg:col-span-4">
            <CategoriesChart/>
        </div>
        <Card className="col-span-7 lg:col-span-3">
          <CardHeader>
            <CardTitle className={"text-space-cadet"}>Blogify Users</CardTitle>
            <CardDescription>
              +{usersLimit.count} Users join Blogify last month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserTable />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default AdminHome;
