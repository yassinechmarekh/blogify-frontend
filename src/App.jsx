import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Posts from "./pages/Posts";
import Header from "./components/Global/Header";
import { Toaster } from "@/components/ui/toaster";
import Newsletter from "@/components/Global/Newsletter";
import Footer from "./components/Global/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
      <Newsletter />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
