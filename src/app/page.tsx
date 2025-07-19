"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, BarChart3, Brain, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen gradient-background-bg">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-primary-bg rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">EmoGraph</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link href={"/auth/sign-in"}>
              <Button variant="ghost">Sign In</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6">
        <div className="text-center py-20 fade-in">
          <div className="float">
            <div className="w-20 h-20 gradient-primary-bg rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Track Your Emotions
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            Discover patterns in your mood with AI-powered insights. Build
            emotional awareness one day at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={`/dashboard`}>
              <Button className="hero-button text-lg px-10 py-6">
                Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 py-20">
          <Card className="glass-card p-8 text-center fade-in stagger-1">
            <div className="w-16 h-16 gradient-good-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Daily Mood Tracking</h3>
            <p className="text-foreground/70">
              Log your emotions with simple emoji selections and personal notes.
            </p>
          </Card>

          <Card className="glass-card p-8 text-center fade-in stagger-2">
            <div className="w-16 h-16 gradient-neutral-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Analysis</h3>
            <p className="text-foreground/70">
              Get intelligent insights about your emotional patterns and trends.
            </p>
          </Card>

          <Card className="glass-card p-8 text-center fade-in stagger-3">
            <div className="w-16 h-16 gradient-bad-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Beautiful Visualizations
            </h3>
            <p className="text-foreground/70">
              See your emotional journey through stunning charts and graphs.
            </p>
          </Card>
        </div>

        {/* Demo Section */}
        <div className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              See It In Action
            </h2>
            <p className="text-xl text-foreground/80">
              Experience the simplicity of emotion tracking
            </p>
          </div>

          <Card className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">
              How are you feeling today?
            </h3>

            <div className="flex justify-center space-x-8 mb-8">
              <button className="emotion-button emotion-button-good">
                <span className="text-3xl">😊</span>
              </button>
              <button className="emotion-button emotion-button-neutral">
                <span className="text-3xl">😐</span>
              </button>
              <button className="emotion-button emotion-button-bad">
                <span className="text-3xl">😔</span>
              </button>
            </div>

            <div className="space-y-4">
              <textarea
                className="w-full p-4 rounded-xl border bg-white/50 backdrop-blur-sm resize-none"
                placeholder="What's on your mind today?"
                rows={3}
              />
              <Button className="w-full hero-button">Log My Emotion</Button>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center py-20">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-foreground/80 mb-8">
            Join thousands of users discovering their emotional patterns
          </p>
          <Link href={"/auth/sign-up"}>
            <Button className="hero-button w-auto text-xl px-12 py-6">
              Create Free Account <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/20">
        <div className="text-center text-foreground/60">
          <p>&copy; 2024 EmoGraph. Made with ❤️ for emotional wellness.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
