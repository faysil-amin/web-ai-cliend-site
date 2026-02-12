import { createBrowserRouter } from "react-router";
import Root from "../../Layout/Root";
import Home from "../../Pages/Home/Home";
import AddModel from "../../Pages/Addmodel/AddModel";
import Allmodels from "../../Pages/Allmodels/Allmodels";

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
        Component: AddModel,
      },
      {
        path: "/allmodels",
        Component: Allmodels,
      },
    ],
  },
]);
