import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { useAppDispatch } from "@/shared/library/hooks";
import { refresh } from "@/entities/user/model/userThunks";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refresh());
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
