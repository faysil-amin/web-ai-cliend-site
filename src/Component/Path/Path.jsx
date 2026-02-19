import { createBrowserRouter } from "react-router";
import Root from "../../Layout/Root";
import Home from "../../Pages/Home/Home";
import AddModel from "../../Pages/Addmodel/AddModel";
import Allmodels from "../../Pages/Allmodels/Allmodels";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import PrivetRoute from "../../Pages/PrivetRoute/PrivetRoute";
import ModelPurchase from "../../Pages/ModelPurchase/ModelPurchase";
import MyModels from "../../Pages/MyModels/MyModels";
import AboutAi from "../../Pages/AboutAi/AboutAi";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/addmodel",
        element: (
          <PrivetRoute>
            <AddModel></AddModel>
          </PrivetRoute>
        ),
      },
      {
        path: "/allmodels",
        Component: Allmodels,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/modelpurchase",
        element: (
          <PrivetRoute>
            <ModelPurchase></ModelPurchase>
          </PrivetRoute>
        ),
      },
      {
        path: "/mymodels",
        element: (
          <PrivetRoute>
            <MyModels></MyModels>
          </PrivetRoute>
        ),
      },
      {
        path: "/aboutai/:id",

        element: (
          <PrivetRoute>
            <AboutAi></AboutAi>
          </PrivetRoute>
        ),
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);
