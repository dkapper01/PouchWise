"use client";

import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Clock, Cigarette, Award, DollarSign, Heart, Zap } from "lucide-react";

const EnhancedNicotineTrackerComponent = () => {
  const [lastIntake, setLastIntake] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);

  useEffect(() => {
    const storedLastIntake = localStorage.getItem("lastNicotineIntake");
    const storedStreak = localStorage.getItem("nicotineStreak");
    if (storedLastIntake) {
      setLastIntake(parseInt(storedLastIntake, 10));
    }
    if (storedStreak) {
      setStreak(parseInt(storedStreak, 10));
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lastIntake) {
        const now = Date.now();
        const diff = now - lastIntake;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setElapsedTime({ days, hours, minutes, seconds });

        // Calculate progress (assuming a goal of 30 days)
        const progressValue = Math.min(
          (diff / (30 * 24 * 60 * 60 * 1000)) * 100,
          100
        );
        setProgress(progressValue);

        // Update streak
        const newStreak = Math.floor(diff / (24 * 60 * 60 * 1000));
        if (newStreak > streak) {
          setStreak(newStreak);
          localStorage.setItem("nicotineStreak", newStreak.toString());
        }

        // Calculate money saved (assuming $10 per day spent on nicotine)
        const savedAmount = (diff / (24 * 60 * 60 * 1000)) * 10;
        setMoneySaved(savedAmount);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lastIntake, streak]);

  const handleNicotineIntake = () => {
    const now = Date.now();
    setLastIntake(now);
    localStorage.setItem("lastNicotineIntake", now.toString());
    setStreak(0);
    localStorage.setItem("nicotineStreak", "0");
  };

  const getMotivationalMessage = () => {
    const totalHours = elapsedTime.days * 24 + elapsedTime.hours;
    if (totalHours < 1)
      return "You can do this! The first hours are the toughest.";
    if (totalHours < 24) return "Great job! The first day is a big milestone.";
    if (totalHours < 72)
      return "Incredible progress! Your body is thanking you.";
    return "You're a star! Keep up the amazing work!";
  };

  const getColorClass = () => {
    if (progress < 33) return "text-red-500";
    if (progress < 66) return "text-yellow-500";
    return "text-green-500";
  };

  const getHealthBenefits = () => {
    const totalHours = elapsedTime.days * 24 + elapsedTime.hours;
    if (totalHours < 24)
      return "Your heart rate and blood pressure are starting to return to normal.";
    if (totalHours < 48)
      return "Your carbon monoxide levels have returned to normal.";
    if (totalHours < 72) return "Your sense of taste and smell are improving.";
    if (totalHours < 336) return "Your lung function is beginning to improve.";
    return "Your risk of heart disease has started to drop.";
  };

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <Card className="w-full max-w-2xl mx-auto border-none shadow-none">
      {/* <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Your Nicotine-Free Journey
        </CardTitle>
      </CardHeader> */}
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <div className="relative flex items-center justify-center">
              <svg className="w-48 h-48">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="88"
                  cx="96"
                  cy="96"
                />
                <motion.circle
                  className={getColorClass()}
                  strokeWidth="8"
                  strokeDasharray={88 * 2 * Math.PI}
                  strokeDashoffset={88 * 2 * Math.PI * ((100 - progress) / 100)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="88"
                  cx="96"
                  cy="96"
                  initial={{ strokeDashoffset: 88 * 2 * Math.PI }}
                  animate={{
                    strokeDashoffset:
                      88 * 2 * Math.PI * ((100 - progress) / 100),
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>
              <span className="absolute text-4xl font-bold">{`${Math.round(progress)}%`}</span>
            </div>
            <p className="text-center text-lg font-medium mt-4">
              {getMotivationalMessage()}
            </p>
          </div>
          <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
            <Clock className="h-8 w-8 mb-2" />
            <p className="text-sm font-medium">Time Smoke-Free</p>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <div className="text-center">
                <p className="text-xl font-bold">
                  {formatTime(elapsedTime.days)}
                </p>
                <p className="text-xs">Days</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">
                  {formatTime(elapsedTime.hours)}
                </p>
                <p className="text-xs">Hours</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">
                  {formatTime(elapsedTime.minutes)}
                </p>
                <p className="text-xs">Mins</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">
                  {formatTime(elapsedTime.seconds)}
                </p>
                <p className="text-xs">Secs</p>
              </div>
            </div>
          </div>
          <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
            <Award className="h-8 w-8 mb-2" />
            <p className="text-sm font-medium">Current Streak</p>
            <p className="text-xl font-bold">{`${streak} days`}</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
            <DollarSign className="h-8 w-8 mb-2" />
            <p className="text-sm font-medium">Money Saved</p>
            <p className="text-xl font-bold">{`$${moneySaved.toFixed(2)}`}</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
            <Heart className="h-8 w-8 mb-2" />
            <p className="text-sm font-medium">Health Benefit</p>
            <p className="text-sm text-center">{getHealthBenefits()}</p>
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Zap className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">Quick Tips</h3>
          </div>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Stay hydrated to help manage cravings</li>
            <li>Practice deep breathing when urges hit</li>
            <li>Keep your hands busy with a stress ball or fidget toy</li>
            <li>Reach out to a support person when you need encouragement</li>
          </ul>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <Cigarette className="mr-2 h-4 w-4" /> Record Nicotine Intake
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Recording a new intake will reset your progress. Remember, every
                moment smoke-free is a victory!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleNicotineIntake}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default EnhancedNicotineTrackerComponent;
