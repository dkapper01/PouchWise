"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Zap, Award, Heart, AlertTriangle } from "lucide-react";

export function NicotineIngestionTracker() {
  const [lastIngested, setLastIngested] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lastIngested");
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
      const diff = now.getTime() - lastIngested.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeElapsed({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [lastIngested]);

  const handleIngested = () => {
    const now = new Date();
    setLastIngested(now);
    localStorage.setItem("lastIngested", JSON.stringify(now));
    setStreak(0);
    localStorage.setItem("streak", "0");
  };

  useEffect(() => {
    const checkStreak = () => {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      if (lastIngested < oneDayAgo) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem("streak", newStreak.toString());
      }
    };

    const dailyCheck = setInterval(checkStreak, 60 * 60 * 1000); // Check every hour
    checkStreak(); // Check immediately on component mount

    return () => clearInterval(dailyCheck);
  }, [lastIngested, streak]);

  const progressPercentage = Math.min((timeElapsed.days / 30) * 100, 100);

  const healthBenefits = [
    {
      time: "20 minutes",
      benefit: "Heart rate and blood pressure begin to normalize",
    },
    {
      time: "12 hours",
      benefit: "Carbon monoxide levels in blood drop to normal",
    },
    {
      time: "2 weeks",
      benefit: "Circulation improves and lung function increases",
    },
    { time: "1 to 3 months", benefit: "Risk of heart attack begins to drop" },
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 flex flex-col text-white font-sans">
      {/* <header className="py-8 px-4 text-center bg-purple-900 bg-opacity-50">
        <h1 className="text-4xl font-bold tracking-tight">
          Nicotine-Free Journey
        </h1>
      </header> */}

      <main className="flex-grow flex flex-col p-6 space-y-8 w-full">
        <div className="relative w-full max-w-xs mx-auto aspect-square">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              className="text-purple-300 opacity-25 stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <circle
              className="text-purple-200 progress-ring__circle stroke-current"
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
            <p className="text-6xl font-bold text-purple-100">
              {timeElapsed.days}
            </p>
            <p className="text-xl font-medium text-purple-200">Days</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Hours", value: timeElapsed.hours },
            { label: "Minutes", value: timeElapsed.minutes },
            { label: "Seconds", value: timeElapsed.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-purple-800 bg-opacity-50 p-4 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm"
            >
              <p className="text-3xl font-bold text-purple-100">{item.value}</p>
              <p className="text-sm font-medium text-purple-200">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center bg-purple-800 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm">
          <div className="flex items-center">
            <Award className="text-yellow-300 mr-3 h-8 w-8" />
            <span className="font-semibold text-xl">Streak</span>
          </div>
          <span className="text-4xl font-bold text-yellow-300">
            {streak} days
          </span>
        </div>

        <Button
          onClick={handleIngested}
          className="w-full py-6 text-xl font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Log Nicotine Intake
        </Button>

        {/* {currentBenefit && (
          <div className="bg-purple-800 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm">
            <h3 className="font-semibold mb-3 flex items-center text-xl">
              <Heart className="mr-3 text-red-400 h-7 w-7" />
              Current Health Benefit
            </h3>
            <p className="text-lg">
              <span className="font-medium text-purple-200">
                {currentBenefit.time}:
              </span>{" "}
              {currentBenefit.benefit}
            </p>
          </div>
        )} */}

        {/* <div className="text-center bg-purple-800 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm">
          <Zap className="inline mr-2 h-6 w-6 text-yellow-300" />
          <span className="text-lg">
            Every moment nicotine-free is a step towards a healthier you!
          </span>
        </div> */}
      </main>
    </div>
  );
}
