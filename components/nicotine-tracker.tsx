"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import {
  Heart,
  Moon,
  Brain,
  Plus,
  Minus,
  RefreshCw,
  Droplet,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Input } from "../components/ui/input";

// Simulated data
const initialData = [
  { day: 1, nicotine: 0, healthRate: 90, sleep: 8, stress: 3 },
  { day: 2, nicotine: 12, healthRate: 88, sleep: 7, stress: 4 },
  { day: 3, nicotine: 6, healthRate: 89, sleep: 7.5, stress: 3.5 },
  { day: 4, nicotine: 18, healthRate: 86, sleep: 6, stress: 5 },
  { day: 5, nicotine: 0, healthRate: 88, sleep: 8, stress: 3 },
  { day: 6, nicotine: 12, healthRate: 87, sleep: 7, stress: 4 },
  { day: 7, nicotine: 6, healthRate: 88, sleep: 7.5, stress: 3.5 },
];

const motivationalQuotes = [
  "Every milligram reduction is a step towards better health.",
  "Your body thanks you for every bit of nicotine you avoid.",
  "Reducing nicotine intake is challenging, but you're up for it.",
  "You're stronger than your nicotine cravings.",
  "Each day with less nicotine is a victory for your health.",
];

export function NicotineTracker() {
  const [data, setData] = useState(initialData);
  const [nicotine, setNicotine] = useState(0);
  const [quote, setQuote] = useState(motivationalQuotes[0]);
  const [inputValue, setInputValue] = useState("");

  const logNicotine = useCallback((amount: number) => {
    setNicotine((prev) => {
      const newNicotine = Math.max(0, prev + amount);

      setData((prevData) => {
        const lastDay = prevData[prevData.length - 1].day;
        return [
          ...prevData,
          {
            day: lastDay + 1,
            nicotine: newNicotine,
            healthRate: Math.max(80, 90 - newNicotine / 2),
            sleep: Math.max(5, 8 - newNicotine / 12),
            stress: Math.min(10, 3 + newNicotine / 12),
          },
        ];
      });

      setQuote(
        motivationalQuotes[
          Math.floor(Math.random() * motivationalQuotes.length)
        ]
      );

      return newNicotine;
    });
  }, []);

  const resetDay = useCallback(() => {
    setNicotine(0);
    setQuote(
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    );
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount)) {
      logNicotine(amount);
      setInputValue("");
    }
  }, [inputValue, logNicotine]);

  const latestMetrics = useMemo(() => data[data.length - 1], [data]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500">
      {/* <header className="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-6 sticky top-0 z-10">
        <h1 className="text-3xl font-bold">Nicotine Tracker</h1>
        <p className="text-sm opacity-80">
          Monitor your health, one milligram at a time
        </p>
      </header> */}

      <main className="flex-1 p-4 space-y-6 overflow-y-auto">
        <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
          <CardHeader>
            <CardTitle className="text-white">Health Overview</CardTitle>
            <CardDescription className="text-purple-200">
              Your current health metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-white">
                <span className="flex items-center">
                  <Heart className="mr-2 text-red-300" /> Health Rate
                </span>
                <span className="font-bold">{latestMetrics.healthRate}%</span>
              </div>
              <Progress
                value={latestMetrics.healthRate}
                className="h-2 bg-purple-300/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-white">
                <span className="flex items-center">
                  <Moon className="mr-2 text-blue-300" /> Sleep
                </span>
                <span className="font-bold">
                  {latestMetrics.sleep.toFixed(1)} hrs
                </span>
              </div>
              <Progress
                value={latestMetrics.sleep * 10}
                className="h-2 bg-purple-300/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-white">
                <span className="flex items-center">
                  <Brain className="mr-2 text-purple-300" /> Stress Level
                </span>
                <span className="font-bold">
                  {latestMetrics.stress.toFixed(1)}/10
                </span>
              </div>
              <Progress
                value={latestMetrics.stress * 10}
                className="h-2 bg-purple-300/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
          <CardHeader>
            <CardTitle className="text-white">Nicotine Log</CardTitle>
            <CardDescription className="text-purple-200">
              Track your daily nicotine intake in milligrams
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-white">
              <span className="text-2xl font-bold">
                Today's Intake: {nicotine.toFixed(1)} mg
              </span>
              <div className="space-x-2">
                <Button
                  onClick={() => logNicotine(-0.5)}
                  size="icon"
                  variant="outline"
                  className="bg-purple-600 hover:bg-purple-700 border-purple-400"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => logNicotine(0.5)}
                  size="icon"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Enter mg of nicotine"
                value={inputValue}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                className="bg-purple-100 text-purple-900 placeholder-purple-400"
              />
              <Button
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Log
              </Button>
            </div>
            <Button
              onClick={resetDay}
              className="w-full bg-purple-600 hover:bg-purple-700"
              variant="outline"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Day
            </Button>
            <Card className="bg-purple-800/50 border-purple-300/20">
              <CardContent className="p-4">
                <p className="text-sm italic text-purple-100">
                  &ldquo;{quote}&rdquo;
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card> */}

        <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
          <CardHeader>
            <CardTitle className="text-white">Health Trends</CardTitle>
            <CardDescription className="text-purple-200">
              Your progress over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                  <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="rgba(255,255,255,0.5)"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(76, 29, 149, 0.8)",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="healthRate"
                    stroke="#a78bfa"
                    name="Health Rate"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sleep"
                    stroke="#93c5fd"
                    name="Sleep"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="stress"
                    stroke="#f87171"
                    name="Stress"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="nicotine"
                    stroke="#d1d5db"
                    name="Nicotine (mg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
