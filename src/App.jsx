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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
