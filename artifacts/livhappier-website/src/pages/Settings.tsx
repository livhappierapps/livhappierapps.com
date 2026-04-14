import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Settings() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white neon-text-cyan whitespace-nowrap">
            Settings
          </h1>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-primary to-transparent opacity-50" />
        </div>

        {/* Placeholder for future settings */}
        <div className="settings-placeholder-card mb-8">
          <p className="text-muted-foreground font-body text-center">
            App preferences and account settings coming soon.
          </p>
        </div>

        {/* Contact / Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="settings-contact-card"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-display font-bold text-white neon-text-pink whitespace-nowrap">
              Contact
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-secondary to-transparent opacity-50" />
          </div>

          <p className="settings-contact-prompt">
            Need extra support or need to contact the developer?
          </p>

          <a
            href="mailto:oblivionhappier@icloud.com"
            className="settings-contact-email"
          >
            <Mail className="w-5 h-5 flex-shrink-0" />
            oblivionhappier@icloud.com
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
