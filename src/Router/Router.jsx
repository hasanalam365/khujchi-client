import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AddInfo from "../Pages/AddInfo";
import SearchInfo from "../Pages/SearchInfo";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path: "/",
            element:<Home></Home>
        },
        {
            path: "/addinfo",
            element: <AddInfo></AddInfo>
        },
        {
            path: '/searchInfo',
            element: <SearchInfo></SearchInfo>
        }
      ]
    },
  ]);