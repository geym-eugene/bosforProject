import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import MainPage from "@/pages/main/ui/MainPage";
import ProtectedRoute from "@/shared/library/ProtectedRoute";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import SignPage from "@/pages/auth-page/SignPage";
import ProjectDetailPage from "@/pages/project-page/ProjectPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/reg" element={<SignPage />}></Route>
      <Route path="/project/:id" element={<ProjectDetailPage />}></Route>
      {/* <Route element={<ProtectedRoute isAllowed={isLogged} redirectTo="/" />}> */}
      {/* <Route path="/main" element={<MainPage />}></Route> */}
      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
