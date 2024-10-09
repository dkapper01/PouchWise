"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Cigarette, Award, Heart, Zap } from "lucide-react";

export function EnhancedQuitSmokingTracker() {
  const [lastSmoked, setLastSmoked] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lastSmoked");
      return saved ? new Date(JSON.parse(saved)) : new Date();
    }
    return new Date();
  });
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [streak, setStreak] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("streak") || "0", 10);
    }
    return 0;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - lastSmoked.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeElapsed({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [lastSmoked]);

  const handleSmoked = () => {
    const now = new Date();
    setLastSmoked(now);
    localStorage.setItem("lastSmoked", JSON.stringify(now));
    setStreak(0);
    localStorage.setItem("streak", "0");
  };

  useEffect(() => {
    const checkStreak = () => {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      if (lastSmoked < oneDayAgo) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem("streak", newStreak.toString());
      }
    };

    const dailyCheck = setInterval(checkStreak, 60 * 60 * 1000); // Check every hour
    checkStreak(); // Check immediately on component mount

    return () => clearInterval(dailyCheck);
  }, [lastSmoked, streak]);

  const progressPercentage = Math.min((timeElapsed.days / 30) * 100, 100);

  const healthBenefits = [
    { time: "20 minutes", benefit: "Heart rate and blood pressure drop" },
    {
      time: "12 hours",
      benefit: "Carbon monoxide in bloodstream drops to normal",
    },
    {
      time: "2 weeks",
      benefit: "Circulation improves and lung function increases",
    },
    {
      time: "1 to 9 months",
      benefit: "Coughing and shortness of breath decrease",
    },
  ];

  const currentBenefit = healthBenefits.find((benefit, index) => {
    const nextBenefit = healthBenefits[index + 1];
    if (!nextBenefit) return true;
    const [currentValue, currentUnit] = benefit.time.split(" ");
    const [nextValue, nextUnit] = nextBenefit.time.split(" ");
    const currentTime =
      currentUnit === "months"
        ? parseInt(currentValue) * 30 * 24
        : parseInt(currentValue) * (currentUnit === "hours" ? 1 : 24);
    const nextTime =
      nextUnit === "months"
        ? parseInt(nextValue) * 30 * 24
        : parseInt(nextValue) * (nextUnit === "hours" ? 1 : 24);
    return (
      timeElapsed.days * 24 + timeElapsed.hours >= currentTime &&
      timeElapsed.days * 24 + timeElapsed.hours < nextTime
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex  justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-6">
          <CardTitle className="text-3xl font-bold">
            Quit Smoking Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="relative">
            <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-purple-500  progress-ring__circle stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (progressPercentage / 100) * 251.2}
              ></circle>
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-4xl font-bold text-purple-700">
                {timeElapsed.days}
              </p>
              <p className="text-sm font-medium text-purple-600">Days</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-purple-100 p-2 rounded-lg">
              <p className="text-2xl font-bold text-purple-700">
                {timeElapsed.hours}
              </p>
              <p className="text-xs font-medium text-purple-600">Hours</p>
            </div>
            <div className="bg-pink-100 p-2 rounded-lg">
              <p className="text-2xl font-bold text-pink-700">
                {timeElapsed.minutes}
              </p>
              <p className="text-xs font-medium text-pink-600">Minutes</p>
            </div>
            <div className="bg-indigo-100 p-2 rounded-lg">
              <p className="text-2xl font-bold text-indigo-700">
                {timeElapsed.seconds}
              </p>
              <p className="text-xs font-medium text-indigo-600">Seconds</p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-green-100 p-3 rounded-lg">
            <div className="flex items-center">
              <Award className="text-yellow-500 mr-2" />
              <span className="font-semibold text-green-700">Streak</span>
            </div>
            <span className="text-2xl font-bold text-green-700">
              {streak} days
            </span>
          </div>

          <Button
            onClick={handleSmoked}
            className="w-full py-4 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white"
          >
            <Cigarette className="mr-2 h-5 w-5" />I Smoked (Reset)
          </Button>

          {currentBenefit && (
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                <Heart className="mr-2 text-red-500" />
                Current Health Benefit
              </h3>
              <p className="text-sm text-blue-700">
                <span className="font-medium">{currentBenefit.time}:</span>{" "}
                {currentBenefit.benefit}
              </p>
            </div>
          )}

          <div className="text-center text-sm text-purple-700">
            <Zap className="inline mr-1 h-4 w-4 text-yellow-500" />
            Keep going! Every moment smoke-free is a victory.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
