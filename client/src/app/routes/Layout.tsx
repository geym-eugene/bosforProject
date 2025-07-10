import Header from "@/components/Header";
import React from "react";
import {Outlet} from "react-router";

function Layout() {
    return (
        <div className="min-h-screen bg-white">
            <Header/>
            <Outlet/>
        </div>
    );
}

export default Layout;
