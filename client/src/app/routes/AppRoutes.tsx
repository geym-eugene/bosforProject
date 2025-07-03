import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import MainPage from "@/pages/main/ui/MainPage";
import ProtectedRoute from "@/shared/library/ProtectedRoute";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "@/pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/projects" element={<div>ProjectPage</div>}></Route>
      {/* <Route element={<ProtectedRoute isAllowed={isLogged} redirectTo="/" />}> */}
      {/* <Route path="/main" element={<MainPage />}></Route> */}
      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
