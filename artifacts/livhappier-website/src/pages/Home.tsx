import { motion } from "framer-motion";
import { AppCard } from "@/components/AppCard";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-24 mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Large Hero Logo */}
          <img 
            src="/logo.jpeg" 
            alt="LivHappier Apps Logo" 
            className="w-64 md:w-80 lg:w-96 h-auto mix-blend-screen relative z-10 filter drop-shadow-[0_0_30px_rgba(0,229,255,0.6)]"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 via-secondary/20 to-accent/20 blur-3xl -z-10" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-4xl md:text-6xl font-display font-black text-white uppercase tracking-widest"
        >
          Welcome to <span className="text-gradient">LivHappier</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-xl text-muted-foreground max-w-2xl font-body"
        >
          Your central hub for next-generation applications. 
          Edgy, fun, and built to make digital life a little more exciting.
        </motion.p>
      </section>

      {/* Apps Section */}
      <section id="apps" className="scroll-mt-48">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white neon-text-cyan">
            Our Universe
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-primary to-transparent opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Flagship App */}
          <div className="md:col-span-2 lg:col-span-2">
            <AppCard 
              title="EdenMux"
              description="Our flagship experience is now live. EdenMux connects your digital worlds with unprecedented control and a stunning neon interface. Dive into the matrix."
              status="available"
              link="/edenmux"
              colorTheme="cyan"
              delay={0.2}
            />
          </div>

          {/* Coming Soon Apps */}
          <AppCard 
            title="NeonVault"
            description="Secure your digital assets with military-grade encryption wrapped in an aesthetic that screams cyberpunk."
            status="coming_soon"
            colorTheme="pink"
            delay={0.4}
          />

          <AppCard 
            title="SoulSync"
            description="The ultimate mood and habit tracker for the perpetually online. Analyze your vibe."
            status="coming_soon"
            colorTheme="purple"
            delay={0.6}
          />
          
          <AppCard 
            title="GhostLink"
            description="Ephemeral messaging and file transfer. What happens here, stays here."
            status="coming_soon"
            colorTheme="pink"
            delay={0.8}
          />
        </div>
      </section>
    </div>
  );
}
