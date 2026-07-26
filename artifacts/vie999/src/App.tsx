import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Promotions from "@/pages/promotions";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { Layout } from "@/components/layout/layout";
import React, { useEffect } from "react";

const queryClient = new QueryClient();

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground">
      {title} - Coming soon
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/promotions" component={Promotions} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* Tab stubs */}
      <Route path="/deposit">
        {() => (
          <Layout>
            <PlaceholderPage title="Nạp tiền" />
          </Layout>
        )}
      </Route>
      <Route path="/history">
        {() => (
          <Layout>
            <PlaceholderPage title="Lịch sử" />
          </Layout>
        )}
      </Route>
      
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
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
