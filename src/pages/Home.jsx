import React, { useEffect } from "react";
// Components
import Categories from "@/components/Sections/Home/Categories";
import Hero from "@/components/Sections/Home/Hero";
import Main from "@/components/Sections/Home/Main";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

function Home() {
  const { message, error } = useSelector((state) => state.user);
  const { toast } = useToast();
  useEffect(() => {
    if (message) {
      toast({
        variant: "success",
        description: message,
        className: "custom-toast-success",
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [error, message]);
  return (
    <>
      <Hero />
      <Categories />
      <Main />
    </>
  );
}

export default Home;
