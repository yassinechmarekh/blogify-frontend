import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/category-single" element={<CategorySingle />} />
        <Route path="/post-single" element={<PostSingle />} />
        <Route path="/author-single" element={<AuthorSingle />} />
        <Route path="/reader-single" element={<ReaderSingle />} />
      </Routes>
      <Newsletter />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
