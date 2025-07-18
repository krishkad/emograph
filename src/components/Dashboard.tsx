"use client"


import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, BarChart3, Calendar, TrendingUp, User, LogOut } from "lucide-react";

const Dashboard = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [getEmotion, setGetEmotion] = useState<string | null>(null);
  const [emotionText, setEmotionText] = useState("");
  const [todayEntries] = useState([
    { time: "9:00 AM", emotion: "😊", text: "Feeling great to start the day!", category: "good" },
    { time: "2:00 PM", emotion: "😐", text: "Work is getting a bit stressful", category: "neutral" },
  ]);

  const emotions = [
    { emoji: "😊", label: "Good", value: "good", class: "emotion-button-good" },
    { emoji: "😐", label: "Neutral", value: "neutral", class: "emotion-button-neutral" },
    { emoji: "😔", label: "Bad", value: "bad", class: "emotion-button-bad" },
  ];

  const handleSubmit = () => {
    if (selectedEmotion && emotionText.trim()) {
      // Here we would normally send to backend/AI analysis
      console.log("Emotion logged:", { emotion: selectedEmotion, text: emotionText });
      setSelectedEmotion(null);
      setEmotionText("");
    }
  };

  useEffect(() => {
    const getEmotions = async () => {
        const response = await fetch("/api/get-emotions");

        const res = await response.json();

        console.log({res});
        setGetEmotion(res.data);

    }

    getEmotions()
  }, [])

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

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-foreground/70">How are you feeling today?</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emotion Input Card */}
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">Log Your Current Mood</h2>
              
              {/* Emotion Selection */}
              <div className="flex justify-center space-x-8 mb-8">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.value}
                    className={`emotion-button ${emotion.class} ${
                      selectedEmotion === emotion.value ? 'ring-4 ring-primary/50 scale-110' : ''
                    }`}
                    onClick={() => setSelectedEmotion(emotion.value)}
                  >
                    <span className="text-4xl">{emotion.emoji}</span>
                  </button>
                ))}
              </div>

              {/* Selected Emotion Display */}
              {selectedEmotion && (
                <div className="text-center mb-6 fade-in">
                  <p className="text-lg font-medium">
                    You selected: <span className="capitalize">{selectedEmotion}</span> {emotions.find(e => e.value === selectedEmotion)?.emoji}
                  </p>
                </div>
              )}

              {/* Text Input */}
              <div className="space-y-4">
                <label className="block text-sm font-medium">What's on your mind?</label>
                <Textarea
                  value={emotionText}
                  onChange={(e) => setEmotionText(e.target.value)}
                  placeholder="Describe how you're feeling today..."
                  className="min-h-[120px] bg-white/50 backdrop-blur-sm border-white/30"
                />
                <Button 
                  onClick={handleSubmit}
                  disabled={!selectedEmotion || !emotionText.trim()}
                  className="w-full hero-button"
                >
                  Log My Emotion
                </Button>
              </div>
            </Card>

            {/* Today's Entries */}
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Today's Entries</h3>
                <Calendar className="w-5 h-5 text-foreground/60" />
              </div>
              
              <div className="space-y-4">
                {todayEntries.map((entry, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/30 rounded-xl">
                    <span className="text-2xl">{entry.emotion}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground/80">{entry.time}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          entry.category === 'good' ? 'bg-emotion-good-light text-emotion-good' :
                          entry.category === 'neutral' ? 'bg-emotion-neutral-light text-emotion-neutral' :
                          'bg-emotion-bad-light text-emotion-bad'
                        }`}>
                          {entry.category}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70">{entry.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Today's Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">Entries logged</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">Dominant mood</span>
                  <span className="font-semibold">😊 Good</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">Streak</span>
                  <span className="font-semibold">7 days</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-white/30">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start bg-white/30">
                  <Calendar className="w-4 h-4 mr-2" />
                  Mood Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start bg-white/30">
                  <Heart className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </Card>

            {/* Motivational Quote */}
            <Card className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm italic text-foreground/80 mb-2">
                today my overall emotion is {" "}
                <span className={getEmotion === "happy"? "text-green-500": getEmotion === "neutral" ?  "text-yellow-500": "text-red-500"}>{getEmotion}</span>
                
              </p>
              <p className="text-xs text-foreground/60">- Alan Watts</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;