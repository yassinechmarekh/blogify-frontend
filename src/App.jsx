import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import AppRoutes from "./routes/router";

function App() {
  const router = AppRoutes();

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
