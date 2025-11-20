import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, TrendingUp } from 'lucide-react';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';

const KPICounters = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollTrigger(sectionRef, 0.3);

  const kpis = [
  { icon: Shield, label: 'AI-Powered Development — Faster, smarter full-stack engineering where AI automates the heavy lifting and developers focus on strategy.', color: 'neon' },
  { icon: Zap, label: 'Autonomous DevOps — Self-optimizing pipelines, predictive monitoring, and zero-downtime deployments built for scale.', color: 'accent' },
  { icon: Users, label: 'Intelligent AI Solutions — Automation, insights, and decision-making systems that transform how businesses operate.', color: 'primary' },
  { icon: TrendingUp, label: 'Smart Tech Delivery — Full-Stack, DevOps, and AI powering faster builds and smarter user experiences.', color: 'neon' },
];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
           Building the Future With AI-Powered Development,
            <span className="gradient-premium bg-clip-text text-transparent">  Automation & DevOps</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Live the future of enterprise tech with RYT TechCorp's AI-driven development, autonomous DevOps, and intelligent solutions that accelerate innovation and drive growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {kpis.map((kpi, index) => (
            <KPICard
              key={index}
              {...kpi}
              isVisible={isVisible}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const KPICard = ({
  icon: Icon,
  label,
  color,
  isVisible,
  delay,
}: {
  icon: any;
  label: string;
  color: string;
  isVisible: boolean;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass-card p-8 rounded-xl hover:border-border-neon/50 transition-all duration-300 group"
    >
      <div
        className={`w-16 h-16 rounded-full bg-${color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className={`w-8 h-8 text-${color}`} />
      </div>

      <div className="text-[15px] font-semibold">{label}</div>
    </motion.div>
  );
};


export default KPICounters;