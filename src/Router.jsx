import { createBrowserRouter } from "react-router-dom";
import About from "./About";
import HomePage from "./Home/HomePage";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<HomePage/>
    },
    {
      path: "/about",
      element: <About/>
    },
  ]);