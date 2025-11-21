import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';

const ClientLogos = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollTrigger(sectionRef, 0.2);

  const clients = [
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Express JS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'Node JS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'TailwindCSS', logo: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  ];

  const duplicatedClients = [...clients, ...clients];

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Technologies
            <span className="gradient-premium bg-clip-text text-transparent"> We Use </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Technologies that we use in order to deliver best in class solutions.
          </p>
        </motion.div>

        {/* Infinite Marquee */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 7,
                  ease: "linear",
                },
              }}
            >
              {duplicatedClients.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-8 py-6"
                  style={{ width: "200px" }}
                >
                  <div className="glass-card rounded-lg p-6 h-24 flex flex-col items-center justify-center group hover:border-border-neon/50 transition-all duration-300">

                    {/* Logo */}
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-10 mb-2 object-contain transition-transform duration-300 group-hover:scale-110"
                      style={{
                        filter: client.name === "Express JS" ? "invert(1) brightness(2)" : "none"
                      }}
                    />

                    {/* Name (Single Line, Fix Express) */}
                    <span
                      className="relative text-foreground/80 group-hover:text-neon font-bold text-lg whitespace-nowrap transition-colors duration-300"
                      style={{
                        color: client.name === "Express JS" ? "#ffffff" : ""
                      }}
                    >
                      {client.name === "Express JS" ? "Express" : client.name}
                    </span>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Skins */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
