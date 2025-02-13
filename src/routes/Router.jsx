import { Navigate, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Website from "@/layouts/Website";
import Categories from "@/pages/Categories";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Posts from "@/pages/Posts";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import CategorySingle from "@/pages/CategorySingle";
import PostSingle from "@/pages/PostSingle";
import ReaderProfile from "@/pages/ReaderProfile";
import ReaderProfileMain from "@/components/Sections/ReaderProfile/Profile";
import ReaderAccount from "@/components/Sections/ReaderProfile/Account";
import ReaderComments from "@/components/Sections/ReaderProfile/Comments";
import ReaderLikedPosts from "@/components/Sections/ReaderProfile/LikedPosts";
import ReaderLikedComments from "@/components/Sections/ReaderProfile/LikedComments";
import Dashboard from "@/layouts/Dashboard";
import AdminHomeDashboard from "@/components/Sections/Dashboard/Home/AdminHome";
import AuthorHomeDashboard from "@/components/Sections/Dashboard/Home/AuthorHome";
import AllCategories from "@/components/Sections/Dashboard/Categories/AllCategories";
import NewCategory from "@/components/Sections/Dashboard/Categories/NewCategory";
import AllUsers from "@/components/Sections/Dashboard/Users/AllUsers";
import Authors from "@/components/Sections/Dashboard/Users/Authors";
import Readers from "@/components/Sections/Dashboard/Users/Readers";
import AllPosts from "@/components/Sections/Dashboard/Posts/AllPosts";
import MyPosts from "@/components/Sections/Dashboard/Posts/MyPosts";
import NewPost from "@/components/Sections/Dashboard/Posts/NewPost";
import EditPost from "@/components/Sections/Dashboard/Posts/EditPost";
import LikedPostsDashoard from "@/components/Sections/Dashboard/Posts/LikedPosts";
import AllComments from "@/components/Sections/Dashboard/Comments/AllComments";
import MyComments from "@/components/Sections/Dashboard/Comments/MyComments";
import LikedCommentsDashboard from "@/components/Sections/Dashboard/Comments/LikedComments";
import NewsletterPage from "@/components/Sections/Dashboard/Newsletter";
import ProfileDashboard from "@/components/Sections/Dashboard/Profile";
import AccountDashboard from "@/components/Sections/Dashboard/Account";
import NotFound from "@/pages/NotFound";
import UserSingle from "@/pages/UserSingle";
import VerifyEmail from "@/pages/VerifyEmail";
import ForgetPassword from "@/pages/ForgetPassword";
import SearchPosts from "@/pages/SearchPosts";

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  return createBrowserRouter([
    {
      element: <Website />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/posts",
          element: <Posts />,
        },
        {
          path: "/posts/search/:query",
          element: <SearchPosts />,
        },
        {
          path: "/login",
          element: user ? <Navigate to="/" /> : <Login />,
        },
        {
          path: "/register",
          element: user ? <Navigate to="/" /> : <Register />,
        },
        {
          path: "/forget-password",
          element: user ? <Navigate to="/" /> : <ForgetPassword />,
        },
        {
          path: "/categories/:slug",
          element: <CategorySingle />,
        },
        {
          path: "/posts/:slug",
          element: <PostSingle />,
        },
        {
          path: "/user/:userId",
          element: <UserSingle />,
        },
        {
          path: "/:username/",
          element:
            user?.status === "reader" ? (
              <ReaderProfile />
            ) : (
              <Navigate to={"/"} />
            ),
          children: [
            {
              path: "profile",
              element:
                user?.status === "reader" ? (
                  <ReaderProfileMain />
                ) : (
                  <Navigate to={"/"} />
                ),
            },
            {
              path: "account",
              element:
                user?.status === "reader" ? (
                  <ReaderAccount />
                ) : (
                  <Navigate to={"/"} />
                ),
            },
            {
              path: "comments",
              element:
                user?.status === "reader" ? (
                  <ReaderComments />
                ) : (
                  <Navigate to={"/"} />
                ),
            },
            {
              path: "liked-posts",
              element:
                user?.status === "reader" ? (
                  <ReaderLikedPosts />
                ) : (
                  <Navigate to={"/"} />
                ),
            },
            {
              path: "liked-comments",
              element:
                user?.status === "reader" ? (
                  <ReaderLikedComments />
                ) : (
                  <Navigate to={"/"} />
                ),
            },
          ],
        },
      ],
    },
    {
      path: "/dashboard/",
      element: user?.status === "admin" || user?.status === "author" ?  <Dashboard /> : <Navigate to={'/'} />,
      children: [
        {
          path: "admin/home",
          element: user?.status === "admin" ? <AdminHomeDashboard /> : <Navigate to={'/'} />,
        },
        {
          path: "author/home",
          element: user?.status === "author" ? <AuthorHomeDashboard /> : <Navigate to={'/'} />,
        },
        {
          path: "categories/all",
          element: user?.status === "admin" ? <AllCategories /> : <Navigate to={'/'} />,
        },
        {
          path: "categories/create",
          element: user?.status === "admin" ? <NewCategory /> : <Navigate to={'/'} />,
        },
        {
          path: "users/all",
          element: user?.status === "admin" ? <AllUsers /> : <Navigate to={'/'} />,
        },
        {
          path: "users/authors",
          element: user?.status === "admin" ? <Authors /> : <Navigate to={'/'} />,
        },
        {
          path: "users/readers",
          element: user?.status === "admin" ? <Readers /> : <Navigate to={'/'} />,
        },
        {
          path: "posts/all",
          element: user?.status === "admin" ? <AllPosts /> : <Navigate to={'/'} />,
        },
        {
          path: ":username/posts",
          element: user?.status === "admin" || user?.status === "author" ? <MyPosts /> : <Navigate to={'/'} />,
        },
        {
          path: "posts/create",
          element: user?.status === "admin" || user?.status === "author" ? <NewPost /> : <Navigate to={'/'} />,
        },
        {
          path: "posts/:slug/edit",
          element: user?.status === "admin" || user?.status === "author" ? <EditPost /> : <Navigate to={'/'} />,
        },
        {
          path: ":username/posts/liked",
          element: user?.status === "admin" || user?.status === "author" ? <LikedPostsDashoard /> : <Navigate to={'/'} />,
        },
        {
          path: "comments/all",
          element: user?.status === "admin" ? <AllComments /> : <Navigate to={'/'} />,
        },
        {
          path: ":username/comments",
          element: user?.status === "admin" || user?.status === "author" ? <MyComments /> : <Navigate to={'/'} />,
        },
        {
          path: ":username/comments/liked",
          element: user?.status === "admin" || user?.status === "author" ? <LikedCommentsDashboard /> : <Navigate to={'/'} />,
        },
        {
          path: "newsletter",
          element: user?.status === "admin" ? <NewsletterPage /> : <Navigate to={'/'} />,
        },
        {
          path: "profile/:username",
          element: user?.status === "admin" || user?.status === "author" ? <ProfileDashboard /> : <Navigate to={'/'} />,
        },
        {
          path: "account/:username",
          element: user?.status === "admin" || user?.status === "author" ? <AccountDashboard /> : <Navigate to={'/'} />,
        },
      ],
    },
    {
      path: "/:userId/verify/:token",
      element: user ? <Navigate to="/" /> : <VerifyEmail />,
    },
    {
      path: "/reset-password/:userId/:token",
      element: user ? <Navigate to="/" /> : <ResetPassword />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default AppRoutes;
