import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { VideoBackground } from "@/components/VideoBackground";
import Home from "@/pages/Home";
import Support from "@/pages/Support";
import EdenMux from "@/pages/EdenMux";
import Settings from "@/pages/Settings";
import MiddleMain from "@/pages/MiddleMain";
import MiddleMainPrivacy from "@/pages/MiddleMainPrivacy";
import MiddleMainTerms from "@/pages/MiddleMainTerms";
import TheMemoryMachine from "@/pages/TheMemoryMachine";
import TheMemoryMachineWebApp from "@/pages/TheMemoryMachineWebApp";
import TheMemoryMachinePrivacy from "@/pages/TheMemoryMachinePrivacy";
import TheMemoryMachineTerms from "@/pages/TheMemoryMachineTerms";
import AisAndEars from "@/pages/AisAndEars";
import AisAndEarsWebApp from "@/pages/AisAndEarsWebApp";
import TwaiPrivacy from "@/pages/TwaiPrivacy";
import TwaiTerms from "@/pages/TwaiTerms";
import EdenMuxPrivacy from "@/pages/EdenMuxPrivacy";
import EdenMuxTerms from "@/pages/EdenMuxTerms";
import AisAndEarsPrivacy from "@/pages/AisAndEarsPrivacy";
import AisAndEarsTerms from "@/pages/AisAndEarsTerms";
import NotFound from "@/pages/not-found";

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
      <Route path="/apps/middlemain/privacypolicy" component={MiddleMainPrivacy} />
      <Route path="/apps/middlemain/privacy" component={MiddleMainPrivacy} />
      <Route path="/apps/middlemain/terms" component={MiddleMainTerms} />
      <Route path="/apps/middlemain" component={MiddleMain} />
      <Route path="/apps/thememorymachine/privacy" component={TheMemoryMachinePrivacy} />
      <Route path="/apps/thememorymachine/terms" component={TheMemoryMachineTerms} />
      <Route path="/apps/thememorymachine/webapp" component={TheMemoryMachineWebApp} />
      <Route path="/apps/thememorymachine" component={TheMemoryMachine} />
      <Route path="/apps/2wai/privacy" component={TwaiPrivacy} />
      <Route path="/apps/2wai/terms" component={TwaiTerms} />
      <Route path="/edenmux/privacy" component={EdenMuxPrivacy} />
      <Route path="/edenmux/terms" component={EdenMuxTerms} />
      <Route path="/apps/aisandears/privacy" component={AisAndEarsPrivacy} />
      <Route path="/apps/aisandears/terms" component={AisAndEarsTerms} />
      <Route path="/apps/aisandears/webapp" component={AisAndEarsWebApp} />
      <Route path="/apps/aisandears" component={AisAndEars} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  const [location] = useLocation();
  const isHome = location === "/";

  return (
    <div className="app-shell">
      <VideoBackground />
      <Header />
      <main className={isHome ? "main-content main-content-home" : "main-content"}>
        <Router />
      </main>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppShell />
          </WouterRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
