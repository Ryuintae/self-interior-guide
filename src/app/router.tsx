import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import GuideStartPage from "../pages/GuideStartPage";
import GuideResultPage from "../pages/GuideResultPage";
import GuideStepPage from "../pages/GuideStepPage";
import EstimatePage from "../pages/EstimatePage";

export const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/guide", element: <GuideStartPage /> },
    { path: "/guide/result", element: <GuideResultPage /> },
    { path: "/guide/step/:stepId", element: <GuideStepPage /> },
    { path: "/estimate", element: <EstimatePage /> },
]);