import { Outlet } from "react-router-dom";

import Background from "../components/layout/Background";
import LiquidSidebar from "../components/ui/LiquidSidebar";
import LiquidNavbar from "../components/ui/LiquidNavbar";

export default function AppLayout() {
    return (

        <div className="relative min-h-screen overflow-hidden">

            <Background />

            <LiquidSidebar />

            <div className="ml-28">

                <LiquidNavbar />

                <main className="pt-32 px-10 pb-10">

                    <Outlet />

                </main>

            </div>

        </div>

    );
}