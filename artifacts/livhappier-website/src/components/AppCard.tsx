import { motion } from "framer-motion";
import { ExternalLink, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppCardProps {
  title: string;
  description: string;
  status: "available" | "coming_soon" | "launching_soon";
  link?: string;
  colorTheme: "cyan" | "pink" | "purple";
  delay?: number;
}

export function AppCard({ title, description, status, link, colorTheme, delay = 0 }: AppCardProps) {
  const isAvailable = status === "available";
  const isLaunchingSoon = status === "launching_soon";

  const themeClasses = {
    cyan: {
      border: "neon-border-cyan",
      text: "neon-text-cyan text-primary",
      badge: "bg-primary/20 text-primary border-primary/50",
      button: "bg-primary text-black hover:bg-white hover:shadow-[0_0_20px_#00e5ff]",
    },
    pink: {
      border: "neon-border-pink",
      text: "neon-text-pink text-secondary",
      badge: "bg-secondary/20 text-secondary border-secondary/50",
      button: "bg-secondary text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_#ff00c8]",
    },
    purple: {
      border: "border-accent shadow-[0_0_15px_rgba(123,47,255,0.4)]",
      text: "text-accent drop-shadow-[0_0_8px_rgba(123,47,255,0.8)]",
      badge: "bg-accent/20 text-accent border-accent/50",
      button: "bg-accent text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_#7b2fff]",
    }
  };

  const theme = themeClasses[colorTheme];

  const badgeText = isAvailable
    ? "Now Available"
    : isLaunchingSoon
    ? "🚀 Launching Soon"
    : "Coming Soon";

  const badgeClass = isAvailable
    ? theme.badge
    : isLaunchingSoon
    ? "bg-amber-400/20 text-amber-300 border-amber-400/50 animate-pulse"
    : "bg-white/5 text-white/50 border-white/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "glass-panel rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group transition-all duration-500",
        isAvailable ? theme.border : isLaunchingSoon ? theme.border : "border-white/10 opacity-80 hover:opacity-100",
        isAvailable && colorTheme === 'cyan' && "animate-pulse-glow"
      )}
    >
      <div className={cn(
        "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40",
        colorTheme === 'cyan' ? "bg-primary" : colorTheme === 'pink' ? "bg-secondary" : "bg-accent"
      )} />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <h3 className={cn("text-3xl font-display font-bold", (isAvailable || isLaunchingSoon) ? theme.text : "text-white")}>
          {title}
        </h3>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-bold font-display uppercase tracking-wider border whitespace-nowrap",
          badgeClass
        )}>
          {badgeText}
        </span>
      </div>

      <p className="text-muted-foreground font-body text-lg leading-relaxed flex-1 relative z-10">
        {description}
      </p>

      <div className="mt-8 relative z-10">
        {isAvailable && link ? (
          <a
            href={link}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-display font-bold uppercase tracking-widest transition-all duration-300",
              theme.button
            )}
          >
            <Sparkles className="w-5 h-5" />
            Launch App
            <ExternalLink className="w-5 h-5 ml-1" />
          </a>
        ) : isLaunchingSoon ? (
          <button
            disabled
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-display font-bold uppercase tracking-widest cursor-not-allowed opacity-60",
              "bg-amber-400/20 text-amber-300 border border-amber-400/30"
            )}
          >
            <Zap className="w-5 h-5" />
            Launching Soon
          </button>
        ) : (
          <button
            disabled
            className="w-full py-3 px-6 rounded-xl font-display font-bold uppercase tracking-widest bg-white/5 text-white/30 cursor-not-allowed border border-white/5"
          >
            In Development
          </button>
        )}
      </div>
    </motion.div>
  );
}
