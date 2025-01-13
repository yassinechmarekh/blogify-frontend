import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Components
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Posts from "./pages/Posts";
import Header from "./components/Global/Header";
import { Toaster } from "@/components/ui/toaster";
import Newsletter from "@/components/Global/Newsletter";
import Footer from "./components/Global/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import CategorySingle from "./pages/CategorySingle";
import PostSingle from "./pages/PostSingle";
import AuthorSingle from "./pages/AuthorSingle";
import ReaderSingle from "./pages/ReaderSingle";
import ReaderProfile from "./pages/ReaderProfile";
import Profile from "./components/Sections/ReaderProfile/Profile";
import Account from "./components/Sections/ReaderProfile/Account";
import Comments from "./components/Sections/ReaderProfile/Comments";
import LikedPosts from "./components/Sections/ReaderProfile/LikedPosts";
import LikedComments from "./components/Sections/ReaderProfile/LikedComments";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AllCategories from "./components/Sections/Dashboard/Categories/AllCategories";
import NewCategory from "./components/Sections/Dashboard/Categories/NewCategory";
import AllUsers from "./components/Sections/Dashboard/Users/AllUsers";
import Authors from "./components/Sections/Dashboard/Users/Authors";
import Readers from "./components/Sections/Dashboard/Users/Readers";
import AllPosts from "./components/Sections/Dashboard/Posts/AllPosts";
import MyPosts from "./components/Sections/Dashboard/Posts/MyPosts";
import NewPost from "./components/Sections/Dashboard/Posts/NewPost";
import LikedPostsDashoard from "./components/Sections/Dashboard/Posts/LikedPosts";
import AllComments from "./components/Sections/Dashboard/Comments/AllComments";
import MyComments from "./components/Sections/Dashboard/Comments/MyComments";
import LikedCommentsDashboard from "./components/Sections/Dashboard/Comments/LikedComments";
import ProfileDashboard from "./components/Sections/Dashboard/Profile";
import AccountDashboard from "./components/Sections/Dashboard/Account";
import HomeDashboard from "./components/Sections/Dashboard/Home/Main";
import EditPost from "./components/Sections/Dashboard/Posts/EditPost";
import NewsletterPage from "./components/Sections/Dashboard/Newsletter";

function Website() {
  return (
    <>
      <Header />
      <Outlet />
      <Newsletter />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Website />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="posts" element={<Posts />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="category-single" element={<CategorySingle />} />
          <Route path="post-single" element={<PostSingle />} />
          <Route path="author-single" element={<AuthorSingle />} />
          <Route path="reader-single" element={<ReaderSingle />} />
          <Route path="/reader-profile/" element={<ReaderProfile />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="account" element={<Account />} />
            <Route path="comments" element={<Comments />} />
            <Route path="liked-posts" element={<LikedPosts />} />
            <Route path="liked-comments" element={<LikedComments />} />
          </Route>
        </Route>
        <Route path="/dashboard/" element={<Dashboard />}>
          <Route index element={<HomeDashboard/>} />
          <Route path="home" element={<HomeDashboard/>} />
          <Route path="categories/all" element={<AllCategories/>} />
          <Route path="categories/create" element={<NewCategory/>} />
          <Route path="users/all" element={<AllUsers/>} />
          <Route path="users/authors" element={<Authors/>} />
          <Route path="users/readers" element={<Readers/>} />
          <Route path="posts/all" element={<AllPosts/>} />
          <Route path="username/posts" element={<MyPosts/>} />
          <Route path="posts/create" element={<NewPost/>} />
          <Route path="posts/edit" element={<EditPost/>} />
          <Route path="username/posts/liked" element={<LikedPostsDashoard/>} />
          <Route path="comments/all" element={<AllComments/>} />
          <Route path="username/comments" element={<MyComments/>} />
          <Route path="username/comments/liked" element={<LikedCommentsDashboard/>} />
          <Route path="newsletter" element={<NewsletterPage/>} />
          <Route path="profile/username" element={<ProfileDashboard/>} />
          <Route path="account/username" element={<AccountDashboard/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
