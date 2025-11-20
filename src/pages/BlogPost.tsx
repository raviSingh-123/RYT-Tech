import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Mock blog data - in production, fetch from API
  const posts: Record<string, any> = {
    'zero-trust-architecture': {
      title: 'Zero Trust Architecture: The Future of Enterprise Security',
      category: 'Cybersecurity',
      author: 'Dr. Alex Kumar',
      readTime: '8 min read',
      date: 'Mar 15, 2024',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop',
      content: `
# Introduction

Zero Trust Architecture represents a paradigm shift in how we approach enterprise security. Unlike traditional perimeter-based security models, Zero Trust operates on the principle of "never trust, always verify."

## Core Principles

The foundation of Zero Trust rests on several key principles:

### 1. Verify Explicitly
Always authenticate and authorize based on all available data points, including user identity, location, device health, service or workload, data classification, and anomalies.

### 2. Use Least Privilege Access
Limit user access with Just-In-Time and Just-Enough-Access (JIT/JEA), risk-based adaptive policies, and data protection to help secure both data and productivity.

### 3. Assume Breach
Minimize blast radius and segment access. Verify end-to-end encryption and use analytics to get visibility, drive threat detection, and improve defenses.

## Implementation Example

Here's a basic example of implementing Zero Trust authentication in a Node.js application:

\`\`\`javascript
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// Multi-factor authentication middleware
const verifyMFA = async (req, res, next) => {
  const { mfaToken, deviceFingerprint } = req.body;
  
  try {
    // Verify MFA token
    const decoded = jwt.verify(mfaToken, process.env.MFA_SECRET);
    
    // Check device fingerprint
    const isKnownDevice = await checkDeviceFingerprint(
      decoded.userId,
      deviceFingerprint
    );
    
    if (!isKnownDevice) {
      await sendSecurityAlert(decoded.userId);
      return res.status(403).json({ error: 'Unknown device' });
    }
    
    // Apply context-aware policies
    const accessPolicy = await evaluateAccessPolicy({
      userId: decoded.userId,
      location: req.ip,
      deviceTrust: isKnownDevice,
      requestedResource: req.path
    });
    
    if (!accessPolicy.allowed) {
      return res.status(403).json({ 
        error: 'Access denied by policy',
        reason: accessPolicy.reason 
      });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { verifyMFA, apiLimiter };
\`\`\`

## Real-World Results

Organizations implementing Zero Trust have seen remarkable improvements:

- **43% reduction** in security incidents
- **67% faster** threat detection
- **89% improvement** in compliance posture
- **52% decrease** in incident response time

## Conclusion

Zero Trust isn't just a technology—it's a comprehensive security strategy that acknowledges the reality of modern threats. By assuming breach and verifying every access request, organizations can significantly strengthen their security posture while maintaining operational efficiency.
      `,
    },
    'ai-driven-threat-detection': {
      title: 'AI-Driven Threat Detection: Real-World Case Studies',
      category: 'AI & ML',
      author: 'Sarah Chen',
      readTime: '6 min read',
      date: 'Mar 12, 2024',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=600&fit=crop',
      content: `
# AI-Driven Threat Detection

Machine learning models are revolutionizing cybersecurity by identifying sophisticated attacks before they happen.

## Case Study: Financial Institution

A major bank implemented our AI-driven threat detection system and achieved:

- 99.2% accuracy in identifying phishing attempts
- Real-time detection of anomalous transactions
- 78% reduction in false positives

## Technical Implementation

\`\`\`python
import tensorflow as tf
from sklearn.preprocessing import StandardScaler

class ThreatDetectionModel:
    def __init__(self):
        self.model = self.build_model()
        self.scaler = StandardScaler()
    
    def build_model(self):
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')
        ])
        return model
\`\`\`

## Key Takeaways

AI-driven threat detection is no longer optional—it's essential for modern enterprise security.
      `,
    },
  };

  const post = posts[slug || ''] || posts['zero-trust-architecture'];
  const shareUrl = window.location.href;

  const renderContent = (content: string) => {
    const parts = content.split(/```(\w+)?\n([\s\S]*?)```/);
    
    return parts.map((part, index) => {
      if (index % 3 === 1) {
        // This is the language identifier
        return null;
      } else if (index % 3 === 2) {
        // This is code block content
        const language = parts[index - 1] || 'javascript';
        return (
          <div key={index} className="my-6 rounded-lg overflow-hidden border border-border-neon/30">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: 'hsl(var(--secondary))',
              }}
            >
              {part.trim()}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        // Regular markdown content
        return (
          <div
            key={index}
            className="prose prose-invert max-w-none prose-headings:gradient-premium prose-headings:bg-clip-text prose-headings:text-transparent prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: part
                .replace(/^# (.+)$/gm, '<h1 class="text-4xl font-bold mt-8 mb-4">$1</h1>')
                .replace(/^## (.+)$/gm, '<h2 class="text-3xl font-bold mt-6 mb-3">$1</h2>')
                .replace(/^### (.+)$/gm, '<h3 class="text-2xl font-bold mt-4 mb-2">$1</h3>')
                .replace(/^\* (.+)$/gm, '<li class="ml-6 mb-2">$1</li>')
                .replace(/^- (.+)$/gm, '<li class="ml-6 mb-2">$1</li>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n\n/g, '</p><p class="mb-4">')
                .replace(/^(?!<[h|l|p])/gm, '<p class="mb-4">')
            }}
          />
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
          
          <div className="relative container mx-auto px-4 lg:px-8 h-full flex flex-col justify-end pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-6 hover:text-neon transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
              
              <span className="inline-block px-4 py-1 bg-neon/20 backdrop-blur-sm text-neon text-sm font-semibold rounded-full border border-neon/30 mb-4">
                {post.category}
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-premium bg-clip-text text-transparent">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {post.readTime}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            {/* Share Buttons */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Share2 className="w-5 h-5 mr-3 text-neon" />
                  <span className="text-foreground font-semibold">Share this article</span>
                </div>
                <div className="flex gap-3">
                  <TwitterShareButton url={shareUrl} title={post.title}>
                    <TwitterIcon size={40} round className="hover:opacity-80 transition-opacity" />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={post.title}>
                    <LinkedinIcon size={40} round className="hover:opacity-80 transition-opacity" />
                  </LinkedinShareButton>
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={40} round className="hover:opacity-80 transition-opacity" />
                  </FacebookShareButton>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="text-lg leading-relaxed">
              {renderContent(post.content)}
            </div>

            {/* Author Bio */}
            <div className="glass-card rounded-xl p-8 mt-12">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-premium flex items-center justify-center text-2xl font-bold">
                  {post.author.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                  <p className="text-muted-foreground">
                    Security expert with over 15 years of experience in cybersecurity and enterprise architecture. 
                    Passionate about building secure, scalable systems that protect digital infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
