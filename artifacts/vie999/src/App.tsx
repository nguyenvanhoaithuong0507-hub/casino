import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Promotions from "@/pages/promotions";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Deposit from "@/pages/deposit";
import Withdrawal from "@/pages/withdrawal";
import Profile from "@/pages/profile";
import History from "@/pages/history";
import React, { useEffect } from "react";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/promotions" component={Promotions} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/deposit" component={Deposit} />
      <Route path="/withdrawal" component={Withdrawal} />
      <Route path="/profile" component={Profile} />
      <Route path="/history" component={History} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster theme="dark" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
