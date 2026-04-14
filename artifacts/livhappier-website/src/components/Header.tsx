import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, Grip, Settings } from "lucide-react";

export function Header() {
  const [location] = useLocation();
  const isHome = location === "/";

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/#apps", label: "Apps", icon: Grip },
    { href: "/community", label: "Community", icon: MessageSquare },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="site-header">
      {/* Top Logo Bar */}
      <div className={cn("header-logo-bar", isHome && "header-logo-bar-home")}>
        <Link href="/">
          <img src="/logo.png" alt="LivHappier Apps" className={cn("header-logo cursor-pointer hover:scale-105 transition-transform", isHome && "header-logo-home")} />
        </Link>
      </div>
      
      {/* Candy Cane Divider */}
      <div className="candy-cane-bar" />
      
      {/* Navigation Bar */}
      <nav className="nav-bar">
        {navLinks.map((link) => {
          const isActive = location === link.href || (link.href === '/#apps' && location === '/');
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl font-display font-bold tracking-wide uppercase text-sm md:text-base transition-all duration-300",
                isActive 
                  ? "text-primary bg-primary/10 neon-border-cyan" 
                  : "text-muted-foreground hover:text-secondary hover:bg-secondary/10 hover:neon-border-pink border border-transparent"
              )}
            >
              <link.icon className="w-4 h-4 md:w-5 md:h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
