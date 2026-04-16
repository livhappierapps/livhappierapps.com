import { motion } from "framer-motion";
import { AppCard } from "@/components/AppCard";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl md:text-5xl font-display text-white"
        >
          Welcome to
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4"
        >
          <img
            src="/logo.png"
            alt="LivHappierApps"
            className="hero-brand-logo"
          />
        </motion.div>
        
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
            title="AppArchy"
            description="App Building Anarchy. The revolution begins soon!"
            status="coming_soon"
            colorTheme="pink"
            delay={0.4}
          />

          <AppCard 
            title="TimeAtlus"
            description="Your new best friend and time manager. Coming soon!"
            status="coming_soon"
            colorTheme="cyan"
            delay={0.6}
          />
          
          <AppCard 
            title="RealizeMe"
            description="Photo editing built to keep it real. Coming Soon!"
            status="coming_soon"
            colorTheme="purple"
            delay={0.8}
          />

          <AppCard 
            title="AIs&Ears"
            description="Eyes and ears for your best AI friends. Coming VERY soon!"
            status="coming_soon"
            colorTheme="pink"
            delay={1.0}
          />
        </div>
      </section>

      {/* About the Developer Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="about-dev-section mt-32 mb-12"
      >
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white neon-text-pink whitespace-nowrap">
            About the Developer
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-secondary to-transparent opacity-50" />
        </div>

        <div className="about-dev-card">
          <div className="about-dev-photo-wrap">
            <img
              src="/developer.jpeg"
              alt="The Developer"
              className="about-dev-photo"
            />
          </div>

          <div className="about-dev-body">
            <p className="about-dev-bio">
              The developer for{" "}
              <img src="/logo.png" alt="LivHappierApps" className="about-dev-inline-logo" />
              {" "}is a single Mom of four. Building apps is her only source of income. If anyone could use a cup of coffee it's her. 😂
            </p>

            <p className="about-dev-cta">
              Buy the developer a cup of coffee?
            </p>

            <div className="about-dev-cashapp">
              <a
                href="https://cash.app/$Oblivionhappier58137"
                target="_blank"
                rel="noopener noreferrer"
                className="about-dev-cashapp-link"
              >
                <img
                  src="/cashapp-qr.png"
                  alt="Cash App QR code for $Oblivionhappier58137"
                  className="about-dev-cashapp-qr"
                />
                <span className="about-dev-cashapp-tag">$Oblivionhappier58137</span>
              </a>
              <p className="about-dev-tip-note">Scan or tap to send via Cash App ☕</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
