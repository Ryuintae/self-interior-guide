import { Outlet } from "react-router-dom";
import ScrollToTop from "../shared/ui/ScrollToTop";

export default function RootLayout() {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    );
}