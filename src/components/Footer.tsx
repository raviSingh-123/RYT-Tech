import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import NewsletterForm from '@/components/NewsletterForm';

const Footer = () => {
  const footerLinks = {
    Solutions: ["Cybersecurity", "AI Solutions", "Enterprise Software", "Cloud Services"],
    Company: ["About Us", "Careers", "Press", "Contact"],
    Resources: ["Blog", "Case Studies", "Documentation", "Support"],
    Legal: ["Privacy Policy", "Terms of Service", "Security", "Compliance"],
  };

  return (
    <footer className="relative border-t border-border/50 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-border/50">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Stay Updated with
              <span className="gradient-premium bg-clip-text text-transparent"> Security Insights</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Get the latest cybersecurity trends, threat intelligence, and enterprise solutions delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg gradient-premium flex items-center justify-center">
                <span className="text-xl font-bold text-background">R</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                RYT <span className="text-primary">TechCorp</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enterprise security, AI, and software solutions for the modern digital age.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RYT TechCorp. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-neon" />
              <span>ISO 27001 Certified</span>
            </span>
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-neon" />
              <span>SOC 2 Type II</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
