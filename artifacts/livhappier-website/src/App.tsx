import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { SkullBackground } from "@/components/SkullBackground";
import Home from "@/pages/Home";
import Support from "@/pages/Support";
import EdenMux from "@/pages/EdenMux";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/support" component={Support} />
      <Route path="/edenmux" component={EdenMux} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  const [location] = useLocation();
  const isHome = location === "/";

  return (
    <div className="app-shell">
      <SkullBackground />
      <Header />
      <main className={isHome ? "main-content main-content-home" : "main-content"}>
        <Router />
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppShell />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
