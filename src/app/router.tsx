import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import GuideStartPage from "../pages/GuideStartPage";
import GuideResultPage from "../pages/GuideResultPage";
import EstimatePage from "../pages/EstimatePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/guide",
        element: <GuideStartPage />,
    },
    {
        path: "/guide/result",
        element: <GuideResultPage />,
    },
    {
        path: "/estimate",
        element: <EstimatePage />,
    },
]);