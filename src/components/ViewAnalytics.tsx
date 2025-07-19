import { Heart, LogOut, User } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const ViewAnalytics = () => {
  return (
    <div className="min-h-screen gradient-background-bg">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary-bg rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">EmoGraph</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-6">
        <div className="container mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">View Analytics</h1>
            <p className="text-foreground/70">See your daily analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAnalytics;
