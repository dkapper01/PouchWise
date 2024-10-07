"use client";

import React, { useState, useEffect } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import { AlertCircle, Heart, Cigarette, Activity } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";

interface DataPoint {
  id: number;
  timestamp: string;
  nicotine: number;
  heartRate: number;
}

export function ImprovedWearableTracker() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [nicotine, setNicotine] = useState("");
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastNicotineIntake, setLastNicotineIntake] = useState<Date | null>(
    null
  );
  const [dailyNicotineGoal, setDailyNicotineGoal] = useState(10); // Default goal: 10mg
  const [showRealTimeUpdates, setShowRealTimeUpdates] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isMonitoring) {
      interval = setInterval(() => {
        const newDataPoint: DataPoint = {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          nicotine: 0,
          heartRate: simulateHeartRate(lastNicotineIntake),
        };
        setData((prevData) => [...prevData, newDataPoint]);
      }, 5000); // Simulate data every 5 seconds
    }

    return () => clearInterval(interval);
  }, [isMonitoring, lastNicotineIntake]);

  const simulateHeartRate = (lastIntake: Date | null): number => {
    const baseRate = 70; // Average resting heart rate
    const maxIncrease = 20; // Maximum heart rate increase due to nicotine
    const decayTime = 30 * 60 * 1000; // 30 minutes in milliseconds

    if (!lastIntake) return baseRate;

    const timeSinceIntake = Date.now() - lastIntake.getTime();
    const increase = Math.max(
      0,
      maxIncrease * (1 - timeSinceIntake / decayTime)
    );
    return Math.round(baseRate + increase + Math.random() * 5 - 2.5); // Add some randomness
  };

  const handleNicotineIntake = (e: React.FormEvent) => {
    e.preventDefault();
    const nicotineAmount = parseFloat(nicotine);
    if (nicotineAmount > 0) {
      const newDataPoint: DataPoint = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        nicotine: nicotineAmount,
        heartRate:
          data.length > 0
            ? data[data.length - 1].heartRate
            : simulateHeartRate(null),
      };
      setData([...data, newDataPoint]);
      setLastNicotineIntake(new Date());
      setNicotine("");
    }
  };

  const averageHeartRate =
    data.length > 0
      ? Math.round(
          data.reduce((sum, point) => sum + point.heartRate, 0) / data.length
        )
      : 0;

  const totalNicotine = data.reduce((sum, point) => sum + point.nicotine, 0);
  const nicotineProgress = (totalNicotine / dailyNicotineGoal) * 100;

  const lastHeartRate = data.length > 0 ? data[data.length - 1].heartRate : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Wearable Nicotine and Heart Rate Tracker
          </CardTitle>
          <CardDescription>
            Monitor how nicotine affects your heart rate in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setIsMonitoring(!isMonitoring)}
              variant={isMonitoring ? "destructive" : "default"}
              className="w-40"
            >
              {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
            </Button>
            <div className="flex items-center space-x-2">
              <Switch
                id="real-time-updates"
                checked={showRealTimeUpdates}
                onCheckedChange={setShowRealTimeUpdates}
              />
              <Label htmlFor="real-time-updates">Real-time Updates</Label>
            </div>
          </div>
          {isMonitoring && (
            <Alert variant="default">
              <Activity className="h-4 w-4" />
              <AlertTitle>Monitoring Active</AlertTitle>
              <AlertDescription>
                Your heart rate is being monitored in real-time.
              </AlertDescription>
            </Alert>
          )}
          <form
            onSubmit={handleNicotineIntake}
            className="flex items-end space-x-2"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor="nicotine">Nicotine Consumed (mg)</Label>
              <Input
                id="nicotine"
                type="number"
                step="0.1"
                min="0"
                value={nicotine}
                onChange={(e) => setNicotine(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Log Nicotine Intake</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="text-red-500" />
                  <span>Heart Rate:</span>
                </div>
                <span className="text-2xl font-bold">{lastHeartRate} bpm</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cigarette className="text-gray-500" />
                  <span>Daily Nicotine:</span>
                </div>
                <span className="text-2xl font-bold">
                  {totalNicotine.toFixed(2)} mg
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Progress towards daily goal:</span>
                  <span>{nicotineProgress.toFixed(0)}%</span>
                </div>
                <Progress value={nicotineProgress} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Average Heart Rate:</span>
                <span className="text-2xl font-bold">
                  {averageHeartRate} bpm
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Nicotine Consumed:</span>
                <span className="text-2xl font-bold">
                  {totalNicotine.toFixed(2)} mg
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Daily Nicotine Goal:</span>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={dailyNicotineGoal}
                    onChange={(e) =>
                      setDailyNicotineGoal(parseFloat(e.target.value))
                    }
                    className="w-20"
                  />
                  <span>mg</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Nicotine and Heart Rate Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="heartRate">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
                <TabsTrigger value="nicotine">Nicotine Intake</TabsTrigger>
              </TabsList>
              <TabsContent value="heartRate">
                <ChartContainer
                  config={{
                    heartRate: {
                      label: "Heart Rate (bpm)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={showRealTimeUpdates ? data.slice(-60) : data}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="heartRate"
                        stroke="var(--color-heartRate)"
                        name="Heart Rate (bpm)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
              <TabsContent value="nicotine">
                <ChartContainer
                  config={{
                    nicotine: {
                      label: "Nicotine (mg)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="stepAfter"
                        dataKey="nicotine"
                        stroke="var(--color-nicotine)"
                        name="Nicotine (mg)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
