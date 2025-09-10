import { redirect } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { getTokenFromCookie } from "@/lib/auth";

// Animation variants for smooth, varied animations
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const rotateIn = {
  initial: { opacity: 0, rotate: -10 },
  animate: { 
    opacity: 1, 
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

function Navigation() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-2xl font-bold text-primary font-brand">
              Scholatron
            </h1>
          </motion.div>
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              className="text-foreground hover:text-primary transition-colors duration-200" 
              href="#features"
            >
              Features
            </Link>
            <Link 
              className="text-foreground hover:text-primary transition-colors duration-200" 
              href="#about"
            >
              About
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90 glow-on-hover">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero animate-pulse" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            className="inline-block rounded-full bg-primary/10 px-6 py-2 mb-8 glow-on-hover"
          >
            <Badge variant="secondary" className="bg-primary text-primary-foreground border-0 animate-glow">
              <Sparkles className="w-3 h-3 mr-1" />
              Unified Campus Platform
            </Badge>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-8"
          >
            <span className="font-brand text-primary block mb-2 animate-float">Scholatron</span>
            <span className="text-foreground">Your Campus,</span>{" "}
            <span className="text-secondary">Unified.</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            A unified campus platform that brings academics, social life, and official communications 
            into one student-first web app. Replace fragmented WhatsApp groups, notice boards, 
            scattered drive links, and word-of-mouth updates.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 glow-on-hover">
              <Link href="/login">
                Join Your Campus
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-on-hover"
              asChild
            >
              <Link href="#features">Explore Features</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MainFeatures() {
  const mainFeatures = [
    {
      icon: FileText,
      title: "Posts & Feed",
      description: "Campus-wide updates, notes, and official posts with scoped visibility for class, club, hostel, and public announcements with rich attachments."
    },
    {
      icon: MessageSquare,
      title: "Chats",
      description: "1:1 and group conversations across class, club, and hostel contexts with role-aware permissions and lightweight media sharing for timely coordination."
    },
    {
      icon: Users,
      title: "Clubs & Communities",
      description: "Discover, join, and engage with clubs and officer-led announcements within permissioned spaces to reduce noise and ensure trust."
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Browse fests and hackathons, RSVP, and receive reminders with prioritization by memberships and timetable relevance for better attendance."
    },
    {
      icon: BookOpen,
      title: "Timetable & Tracker",
      description: "Personal and academic schedules, exam calendars, and reminders to keep academic workflows on track without context switching."
    },
    {
      icon: ShoppingBag,
      title: "Marketplace",
      description: "Simple buy/sell listings for books and essentials with basic safety controls and reporting hooks for moderation."
    },
    {
      icon: GraduationCap,
      title: "Assignments & Marks",
      description: "Faculty announcements, submissions, grading workflows, and release notifications scoped per course for transparency and timeliness."
    },
    {
      icon: Bell,
      title: "Announcements Hub",
      description: "Trusted faculty/admin notices with read receipts and scoping by class, hostel, or role to guarantee reach and accountability."
    },
    {
      icon: Globe,
      title: "Academic Resources",
      description: "Curated notes, guides, previous papers, and study material mapped to courses for easy discovery and reuse."
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="text-primary font-brand animate-glow">Core Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything your campus needs - from academics to social life, all unified in one trusted platform
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={rotateIn}
              whileHover={{ 
                scale: 1.02,
                rotate: 1,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="h-full border-2 bg-card hover:shadow-xl hover:border-primary/20 transition-all duration-300 group glow-on-hover">
                <CardHeader className="pb-4">
                  <div className="mb-6 p-4 rounded-xl bg-primary/10 w-fit">
                    <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-card-foreground text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AdditionalFeatures() {
  const additionalFeatures = [
    { 
      icon: MapPin, 
      title: "Campus Map & Navigation", 
      description: "Wayfinding for classrooms, hostels, cafeterias, labs, and event venues to reduce friction in daily movement",
      color: "text-blue-500"
    },
    { 
      icon: TrendingUp, 
      title: "Analytics & Insights", 
      description: "Privacy-conscious attendance and grade trend views with personal performance indicators to inform study habits",
      color: "text-green-500"
    },
    { 
      icon: Trophy, 
      title: "Rewards & Gamification", 
      description: "Points, badges, and leaderboards to incentivize contributions and sustained campus engagement",
      color: "text-yellow-500"
    },
    { 
      icon: Bell, 
      title: "Smart Notifications", 
      description: "Targeted reminders for classes, events, and deadlines by class, hostel, club, role, and user preferences to cut noise",
      color: "text-purple-500"
    },
    { 
      icon: Lightbulb, 
      title: "Idea & Innovation Hub", 
      description: "Pitch ideas, form teams, and join challenges to foster student-led initiatives and innovation culture",
      color: "text-orange-500"
    },
    { 
      icon: Camera, 
      title: "Media Gallery", 
      description: "Event and club photos/videos with selective visibility and tagging for archival and discovery",
      color: "text-pink-500"
    },
    { 
      icon: Shield, 
      title: "Anonymous Feedback & Polls", 
      description: "Structured faculty feedback and campus polls with guardrails against abuse for actionable signals",
      color: "text-red-500"
    },
    { 
      icon: Heart, 
      title: "Interest-based Communities", 
      description: "Topic spaces for music, sports, coding, and hobbies to promote peer learning and belonging",
      color: "text-rose-500"
    },
    { 
      icon: Smartphone, 
      title: "Digital ID & Campus Pass", 
      description: "Digital ID and basic pass views for library, labs, and hostel check-ins as policies permit for smoother access",
      color: "text-indigo-500"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="text-secondary font-brand animate-pulse">Additional Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enhanced features that take your campus experience to the next level
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={slideInLeft}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="flex items-start space-x-4 p-6 rounded-xl bg-card border-2 hover:shadow-lg hover:border-secondary/30 transition-all duration-300 group glow-on-hover"
            >
              <div className="flex-shrink-0 p-3 rounded-lg bg-secondary/10">
                <feature.icon className={`h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-2 text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSolutionSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
          <motion.div
            variants={slideInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div>
              <Target className="h-12 w-12 text-destructive mb-4 animate-pulse" />
              <h3 className="text-3xl font-bold text-foreground mb-4">The Problem We Solve</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Campus information is split across chats, posters, folders, and informal channels, 
                causing missed events, lost academic resources, and unreliable communication across 
                hostels, clubs, and classes.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Missed events and important announcements",
                "Lost academic resources scattered everywhere",  
                "Unreliable communication channels",
                "Information overload and constant noise",
                "No single trusted platform for campus life"
              ].map((problem, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                  <span className="text-foreground">{problem}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            variants={slideInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div>
              <Sparkles className="h-12 w-12 text-primary mb-4 animate-glow" />
              <h3 className="text-3xl font-bold text-primary font-brand mb-4">Our Solution</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Scholatron unifies feeds, chats, clubs, events, timetables, assignments, marks, 
                announcements, and resources in one app with role-aware access and smart notifications.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Single source of truth for all campus information",
                "Role-aware access and smart notifications",
                "Unified feeds, chats, and announcements", 
                "Academic workflow integration",
                "Privacy-conscious and secure by design"
              ].map((solution, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="w-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-foreground">{solution}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FutureFeatures() {
  const futureFeatures = [
    {
      icon: Shield,
      title: "Verified Identities",
      description: "Club and faculty verification badges to signal authenticity and reduce misinformation"
    },
    {
      icon: BarChart3,
      title: "Deep Analytics", 
      description: "Course and attendance analytics with opt-in dashboards and privacy-preserving aggregates"
    },
    {
      icon: Smartphone,
      title: "Offline-first PWA",
      description: "Installable mobile experience with offline caching for timetables and resources"
    },
    {
      icon: Building2,
      title: "Multi-campus Support",
      description: "Logical isolation and scoped discovery for institutes under a single platform"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="text-accent font-brand animate-float">Future Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exciting capabilities we're working on to make campus life even better
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {futureFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.2 }
              }}
              className="text-center p-8 rounded-xl bg-card border-2 hover:shadow-xl hover:border-accent/30 transition-all duration-300 group glow-on-hover"
            >
              <div className="inline-flex p-4 rounded-lg bg-accent/10 mb-6">
                <feature.icon className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-3 text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-6xl font-bold mb-8">
            <span className="font-brand text-primary block mb-2 animate-glow">Ready to Transform</span>
            <span>Your Campus Experience?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students already using Scholatron to stay connected, 
            organized, and engaged with their campus community. Experience the future of campus life today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-xl px-12 py-6 bg-primary hover:bg-primary/90 glow-on-hover" asChild>
              <Link href="/login">
                Get Started Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-primary" />
              <span>Privacy-focused</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-primary" />
              <span>Built for students</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-16 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary font-brand mb-4 animate-pulse">Scholatron</h3>
            <p className="text-muted-foreground max-w-md leading-relaxed mb-4">
              A unified campus platform bringing academics, social life, and official communications 
              into one student-first web app.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Features</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-primary transition-colors">Posts & Feed</Link></li>
              <li><Link href="#features" className="hover:text-primary transition-colors">Campus Chat</Link></li>
              <li><Link href="#features" className="hover:text-primary transition-colors">Events & RSVP</Link></li>
              <li><Link href="#features" className="hover:text-primary transition-colors">Academic Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <span className="text-muted-foreground mb-4 md:mb-0">
            © 2025 Scholatron. Built for students, by students.
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Made with</span>
            <Heart className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">for campus communities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default async function HomePage() {
  const token = await getTokenFromCookie();
  if (token) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <MainFeatures />
      <AdditionalFeatures />
      <ProblemSolutionSection />
      <FutureFeatures />
      <CallToActionSection />
      <Footer />
    </div>
  );
}