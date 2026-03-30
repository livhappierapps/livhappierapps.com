import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import "./app.css";

const queryClient = new QueryClient();

function Header() {
  return (
    <header className="site-header">
      <div className="header-logo-bar">
        <img src="/logo.jpeg" alt="LivHappier Apps" className="header-logo" />
      </div>
      <div className="candy-cane-bar" />
    </header>
  );
}

function ComingSoon() {
  return (
    <div className="page-content">
      <h1 className="coming-soon-text">COMING SOON</h1>
      <p className="tagline">Something amazing is on its way ✨</p>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={ComingSoon} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="app-shell">
            <Header />
            <main className="main-content">
              <Router />
            </main>
          </div>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
