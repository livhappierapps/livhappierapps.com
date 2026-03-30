import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ComingSoon() {
  return (
    <div className="coming-soon-page">
      <div className="stars" />
      <div className="content">
        <div className="logo-wrapper">
          <img
            src="/logo.jpeg"
            alt="LivHappier Apps Logo"
            className="logo"
          />
          <div className="glow-ring" />
        </div>
        <h1 className="coming-soon-text">
          <span className="c">C</span>
          <span className="o">O</span>
          <span className="m">M</span>
          <span className="i">I</span>
          <span className="n">N</span>
          <span className="g">G</span>
          <span className="space"> </span>
          <span className="s">S</span>
          <span className="o2">O</span>
          <span className="o3">O</span>
          <span className="n2">N</span>
        </h1>
        <p className="tagline">Something amazing is on its way ✨</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .coming-soon-page {
          min-height: 100vh;
          width: 100%;
          background: #0a0a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .stars {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 60%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 85%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 15%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 50%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 45%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 35%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(2px 2px at 45% 90%, rgba(0,229,255,0.3) 0%, transparent 100%),
            radial-gradient(2px 2px at 75% 20%, rgba(255,0,200,0.3) 0%, transparent 100%);
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          z-index: 1;
          padding: 2rem;
          text-align: center;
        }

        .logo-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo {
          width: min(340px, 82vw);
          height: auto;
          border-radius: 20px;
          position: relative;
          z-index: 2;
          animation: floatLogo 4s ease-in-out infinite;
          outline: 2px solid rgba(0, 229, 255, 0.3);
        }

        .glow-ring {
          position: absolute;
          inset: -4px;
          border-radius: 24px;
          background: linear-gradient(135deg, #00e5ff, #ff00c8, #7b2fff, #00e5ff);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          opacity: 0.7;
          filter: blur(8px);
          z-index: 1;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes floatLogo {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes spinGlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .coming-soon-text {
          font-family: 'Orbitron', 'Arial Black', sans-serif;
          font-size: clamp(2rem, 8vw, 4.5rem);
          font-weight: 900;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #fff;
          text-shadow:
            0 0 10px #00e5ff,
            0 0 30px #00e5ff,
            0 0 60px rgba(0,229,255,0.5);
          animation: neonPulse 2.5s ease-in-out infinite alternate;
        }

        @keyframes neonPulse {
          from {
            text-shadow:
              0 0 10px #00e5ff,
              0 0 30px #00e5ff,
              0 0 60px rgba(0,229,255,0.5);
          }
          to {
            text-shadow:
              0 0 20px #ff00c8,
              0 0 50px #ff00c8,
              0 0 80px rgba(255,0,200,0.6),
              0 0 6px #fff;
          }
        }

        .tagline {
          font-family: 'Orbitron', 'Arial', sans-serif;
          font-size: clamp(0.85rem, 3vw, 1.2rem);
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
      `}</style>
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
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
