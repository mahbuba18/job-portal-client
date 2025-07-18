import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import JobCategories from "../pages/Category/JobCategories";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<h2>Route is not found</h2>,
      children:[
        {
            path:'/',
            element:<Home></Home>,
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
          path:'/signin',
          element:<SignIn></SignIn>

        },
        // {
        //   path:'/categories',
        //   element:<JobCategories></JobCategories>

        // }
      ]
    },
  ]);

  export default router;
  