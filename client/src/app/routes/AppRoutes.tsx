import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import MainPage from "@/pages/main/ui/MainPage";
import ProtectedRoute from "@/shared/library/ProtectedRoute";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "@/pages/NotFound";
import SignPage from "@/pages/auth-page/SignPage";
import ProjectDetailPage from "@/pages/project-page/ProjectPage";
import Layout from "./Layout";
import UserPage from "@/pages/user-page/UserPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/reg" element={<SignPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/user" element={<UserPage />} />
        {/* <Route element={<ProtectedRoute isAllowed={isLogged} redirectTo="/" />}> */}
        {/* <Route path="/main" element={<MainPage />}></Route> */}
        {/* </Route> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
