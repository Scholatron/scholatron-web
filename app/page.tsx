'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  FileText, 
  ShoppingBag,
  Trophy,
  Bell,
  MapPin,
  TrendingUp,
  Lightbulb,
  Camera,
  Shield,
  Zap,
  ArrowRight,
  Star,
  GraduationCap,
  Globe,
  CheckCircle,
  X,
  Building2,
  Smartphone,
  BarChart3,
  Heart,
  Lock,
  ChevronRight,
  Sparkles,
  Target,
  Menu,
  Search
} from 'lucide-react';
import { SiteHeader } from '@/components/header';
import { SiteFooter } from '@/components/footer';


const featuresMain = [
  {
    icon: Users,
    title: 'Posts & Feed',
    description: 'Campus-wide updates, notes, and official posts with scoped visibility and attachment support.',
    badge: 'Core'
  },
  {
    icon: MessageSquare,
    title: 'Chats',
    description: '1:1 and group conversations across class, club, and hostel with role-aware permissions.',
    badge: 'Core'
  },
  {
    icon: Building2,
    title: 'Clubs & Communities',
    description: 'Discover, join, and engage with clubs and officer-led announcements within permissioned spaces.',
    badge: 'Core'
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Browse fests and hackathons, RSVP, and receive reminders with prioritization by memberships.',
    badge: 'Core'
  },
  {
    icon: BookOpen,
    title: 'Timetable & Tracker',
    description: 'Personal and academic schedules, exam calendars, and reminders to keep workflows on track.',
    badge: 'Core'
  },
  {
    icon: ShoppingBag,
    title: 'Marketplace',
    description: 'Simple buy/sell listings for books and essentials with basic safety controls.',
    badge: 'Core'
  },
  {
    icon: FileText,
    title: 'Assignments & Marks',
    description: 'Faculty announcements, submissions, grading workflows, and release notifications per course.',
    badge: 'Core'
  },
  {
    icon: Bell,
    title: 'Announcements Hub',
    description: 'Trusted faculty/admin notices with read receipts and scoping by class or role.',
    badge: 'Core'
  },
  {
    icon: GraduationCap,
    title: 'Academic Resources',
    description: 'Curated notes, guides, previous papers, and study material mapped to courses.',
    badge: 'Core'
  },
  {
    icon: Target,
    title: 'Collaboration Space',
    description: 'Lightweight project spaces with threads, resource links, and simple task checklists.',
    badge: 'Core'
  }
];

const featuresAdditional = [
  {
    icon: MapPin,
    title: 'Campus Map & Navigation',
    description: 'Wayfinding for classrooms, hostels, cafeterias, labs, and event venues.',
    badge: 'Additional'
  },
  {
    icon: TrendingUp,
    title: 'Analytics & Insights',
    description: 'Privacy-conscious attendance and grade trend views with personal performance indicators.',
    badge: 'Additional'
  },
  {
    icon: Trophy,
    title: 'Rewards & Gamification',
    description: 'Points, badges, and leaderboards to incentivize contributions and engagement.',
    badge: 'Additional'
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Targeted reminders for classes, events, and deadlines by membership and preferences.',
    badge: 'Additional'
  },
  {
    icon: Lightbulb,
    title: 'Idea & Innovation Hub',
    description: 'Pitch ideas, form teams, and join challenges to foster student-led initiatives.',
    badge: 'Additional'
  },
  {
    icon: Camera,
    title: 'Media Gallery',
    description: 'Event and club photos/videos with selective visibility and tagging.',
    badge: 'Additional'
  },
  {
    icon: Shield,
    title: 'Anonymous Feedback & Polls',
    description: 'Structured faculty feedback and campus polls with guardrails against abuse.',
    badge: 'Additional'
  },
  {
    icon: Heart,
    title: 'Interest-based Communities',
    description: 'Topic spaces for music, sports, coding, and hobbies to promote peer learning.',
    badge: 'Additional'
  },
  {
    icon: Smartphone,
    title: 'Digital ID & Campus Pass',
    description: 'Digital ID and basic pass views for library, labs, and hostel check-ins.',
    badge: 'Additional'
  },
  {
    icon: Zap,
    title: 'External Integrations',
    description: 'Optional Google Calendar, Zoom, and LMS hooks for reduced duplication.',
    badge: 'Additional'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.58, 1] }
  }
};

const heroVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0, 0, 0.58, 1] }
  }
};


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 py-20 px-4"
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Badge variant="secondary" className="mb-4 inline-flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              Unified Campus Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              Welcome to Scholatron
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Unify academics, social life, and official communications in one student-first web app. Replace fragmented tools with a trusted, timely platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/login">
                  Get Started <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/features">
                  Explore Features <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Essential tools to streamline your campus life with seamless integration and role-aware access.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuresMain.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="smooth-transition"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                      <Badge variant="secondary">{feature.badge}</Badge>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Additional Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enhance your experience with tools for navigation, engagement, and innovation.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuresAdditional.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="smooth-transition"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                      <Badge variant="outline">{feature.badge}</Badge>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-primary-foreground"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Campus Experience?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">Join Scholatron today and unify your academic and social life in one powerful platform.</p>
            <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-secondary-foreground">
              <Link href="/login">
                Sign Up Now <Star className="h-5 w-5 ml-2 animate-pulse" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <SiteFooter />

    </div>
  );
}