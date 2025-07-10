import MainPage from "@/pages/main/ui/MainPage";
import ProtectedRoute from "@/shared/library/ProtectedRoute";
import React from "react";
import {Route, Routes} from "react-router";
import NotFound from "@/pages/NotFound";
import SignPage from "@/pages/auth-page/SignPage";
import ProjectDetailPage from "@/pages/project-page/ProjectPage";
import Layout from "./Layout";
import UserPage from "@/pages/user-page/UserPage";
import {useAppSelector} from "@/shared/library/hooks";
import Loader from "@/components/ui/Loader.tsx";


function AppRoutes() {
    const user = useAppSelector((store) => store.user.user);
    const loading = useAppSelector((store) => store.user.loading);

    if (loading) return <Loader/>;

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/reg" element={<SignPage/>}/>
                <Route
                    element={<ProtectedRoute isAllowed={!!user} redirectTo="/reg"/>}
                >
                    <Route path="/project/:id" element={<ProjectDetailPage/>}/>
                    <Route path="/user" element={<UserPage/>}/>
                </Route>

            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default AppRoutes;
