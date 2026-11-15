import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router as WouterRouter, Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { VideoBackground } from "@/components/VideoBackground";
import { Header } from "@/components/Header";
import Home from "@/pages/Home";
import Support from "@/pages/Support";
import EdenMux from "@/pages/EdenMux";
import Settings from "@/pages/Settings";
import MiddleMain from "@/pages/MiddleMain";
import MiddleMainPrivacy from "@/pages/MiddleMainPrivacy";
import MiddleMainTerms from "@/pages/MiddleMainTerms";
import NotFound from "@/pages/not-found";

function AppRoutes() {
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
      <Route component={NotFound} />
    </Switch>
  );
}

export interface RenderResult {
  html: string;
}

export function render(url: string): RenderResult {
  const helmetContext: Record<string, unknown> = {};
  const isHome = url === "/";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 1, refetchOnWindowFocus: false },
    },
  });

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter ssrPath={url}>
            <div className="app-shell">
              <VideoBackground />
              <Header />
              <main
                className={
                  isHome ? "main-content main-content-home" : "main-content"
                }
              >
                <AppRoutes />
              </main>
            </div>
          </WouterRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return { html };
}
