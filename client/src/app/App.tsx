import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { useAppDispatch, useAppSelector } from "@/shared/library/hooks";
import { getCurrentUser, refresh } from "@/entities/user/model/userThunks";
import { useEffect } from "react";
import { store } from "./store/store";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // get current user on app init
    // dispatch(refresh())
    dispatch(getCurrentUser());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
