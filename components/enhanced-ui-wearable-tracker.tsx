"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
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
import {
  AlertCircle,
  Heart,
  Cigarette,
  Activity,
  Zap,
  Settings,
  Bluetooth,
  ChevronDown,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { Slider } from "../components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

interface DataPoint {
  id: number;
  timestamp: string;
  nicotine: number;
  heartRate: number;
}

const EnhancedUiWearableTracker = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [nicotine, setNicotine] = useState("");
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastNicotineIntake, setLastNicotineIntake] = useState<Date | null>(
    null
  );
  const [dailyNicotineGoal, setDailyNicotineGoal] = useState(10); // Default goal: 10mg
  const [showRealTimeUpdates, setShowRealTimeUpdates] = useState(true);
  const [chartTimeRange, setChartTimeRange] = useState(60); // Default: 60 minutes
  const [isPaired, setIsPaired] = useState(false);
  const [isPairing, setIsPairing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isMonitoring && isPaired) {
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
  }, [isMonitoring, lastNicotineIntake, isPaired]);

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

  const handlePairDevice = () => {
    setIsPairing(true);
    // Simulate pairing process
    setTimeout(() => {
      setIsPaired(true);
      setIsPairing(false);
    }, 3000);
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
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border-none shadow-xl">
        <CardHeader className="flex flex-col md:flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Wearable Nicotine and Heart Rate Tracker
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Monitor how nicotine affects your heart rate in real-time
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-6 w-6" />
                <span className="sr-only">Open settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                  <span>Real-time Updates</span>
                  <Switch
                    id="real-time-updates"
                    checked={showRealTimeUpdates}
                    onCheckedChange={setShowRealTimeUpdates}
                  />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span>Chart Time Range</span>
                    <span>{chartTimeRange} min</span>
                  </div>
                  <Slider
                    value={[chartTimeRange]}
                    onValueChange={(value) => setChartTimeRange(value[0])}
                    max={120}
                    min={10}
                    step={10}
                  />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto"
            >
              <Button
                onClick={() => setIsMonitoring(!isMonitoring)}
                variant={isMonitoring ? "destructive" : "default"}
                className="w-full md:w-48 font-semibold text-lg py-6"
                disabled={!isPaired}
              >
                {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
              </Button>
            </motion.div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 text-lg py-6 w-full md:w-auto"
                >
                  <Bluetooth className="h-5 w-5" />
                  <span>{isPaired ? "Device Paired" : "Pair Device"}</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Pair Your Wearable Device</DialogTitle>
                  <DialogDescription>
                    Make sure your wearable device is turned on and in pairing
                    mode.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center space-y-4 py-4">
                  {isPairing ? (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                      <p className="text-lg">Pairing...</p>
                    </div>
                  ) : isPaired ? (
                    <div className="flex flex-col items-center space-y-2 text-green-500">
                      <Zap className="h-12 w-12" />
                      <p className="text-lg font-semibold">
                        Device paired successfully!
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={handlePairDevice}
                      size="lg"
                      className="text-lg py-6"
                    >
                      Start Pairing
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <AnimatePresence>
            {isMonitoring && isPaired && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Alert
                  variant="default"
                  className="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700"
                >
                  <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-lg font-semibold text-green-800 dark:text-green-200">
                    Monitoring Active
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-300">
                    Your heart rate is being monitored in real-time.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          <form
            onSubmit={handleNicotineIntake}
            className="flex flex-col md:flex-row items-end space-x-0 md:space-x-4"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor="nicotine" className="text-lg font-medium">
                Nicotine Consumed (mg)
              </Label>
              <Input
                id="nicotine"
                type="number"
                step="0.1"
                min="0"
                value={nicotine}
                onChange={(e) => setNicotine(e.target.value)}
                required
                className="border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 text-lg py-6"
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto"
            >
              <Button
                type="submit"
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg py-6 w-full"
              >
                Log Nicotine Intake
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <Heart className="text-red-500 h-8 w-8 mr-2" />
              Current Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <span className="text-6xl font-bold text-red-600 dark:text-red-400">
                {isPaired ? lastHeartRate : "--"}
              </span>
              <span className="text-3xl text-gray-600 dark:text-gray-300 ml-2">
                bpm
              </span>
            </div>
            {!isPaired && (
              <p className="text-center text-gray-500 mt-4 text-lg">
                Pair your device to see heart rate
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <Cigarette className="text-gray-500 h-8 w-8 mr-2" />
              Daily Nicotine Intake
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <span className="text-6xl font-bold text-gray-800 dark:text-gray-200">
                  {totalNicotine.toFixed(2)}
                </span>
                <span className="text-3xl text-gray-600 dark:text-gray-300 ml-2">
                  mg
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-lg text-gray-600 dark:text-gray-300">
                  <span>Progress towards daily goal:</span>
                  <span>{nicotineProgress.toFixed(0)}%</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${nicotineProgress}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <Progress
                    className="h-3 bg-gray-200 dark:bg-gray-700"
                    // Replace 'indicatorClassName' with a valid prop or modify the component to accept it
                    // indicatorClassName="bg-purple-500"
                    // Use a valid prop instead, e.g., 'color' if applicable
                    color="bg-purple-500"
                  />
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <Activity className="text-blue-500 h-8 w-8 mr-2" />
              Summary Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-600 dark:text-gray-300">
                  Average Heart Rate:
                </span>
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {isPaired ? `${averageHeartRate} bpm` : "--"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-600 dark:text-gray-300">
                  Daily Nicotine Goal:
                </span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-24 text-lg">
                      {dailyNicotineGoal} mg
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Adjust Daily Nicotine Goal
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Set your target for daily nicotine consumption.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="goal">Goal</Label>
                          <Input
                            id="goal"
                            type="number"
                            className="col-span-2 h-8"
                            value={dailyNicotineGoal}
                            onChange={(e) =>
                              setDailyNicotineGoal(parseFloat(e.target.value))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {data.length > 0 && isPaired && (
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-none overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              Nicotine and Heart Rate Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="heartRate" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="heartRate" className="text-lg font-medium">
                  Heart Rate
                </TabsTrigger>
                <TabsTrigger value="nicotine" className="text-lg font-medium">
                  Nicotine Intake
                </TabsTrigger>
              </TabsList>
              <TabsContent value="heartRate">
                <ChartContainer
                  config={{
                    heartRate: {
                      label: "Heart Rate (bpm)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={
                        showRealTimeUpdates
                          ? data.slice(-chartTimeRange * 12)
                          : data
                      }
                    >
                      <defs>
                        <linearGradient
                          id="heartRateGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis
                        dataKey="timestamp"
                        stroke="#888"
                        tick={{ fill: "#888", fontSize: 12 }}
                        tickFormatter={(value) =>
                          new Date(value).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        }
                      />
                      <YAxis
                        stroke="#888"
                        tick={{ fill: "#888", fontSize: 12 }}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        wrapperStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "10px",
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: "20px" }} />
                      <Area
                        type="monotone"
                        dataKey="heartRate"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#heartRateGradient)"
                        strokeWidth={2}
                        name="Heart Rate (bpm)"
                        animationDuration={300}
                      />
                    </AreaChart>
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
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient
                          id="nicotineGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis
                        dataKey="timestamp"
                        stroke="#888"
                        tick={{ fill: "#888", fontSize: 12 }}
                        tickFormatter={(value) =>
                          new Date(value).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        }
                      />
                      <YAxis
                        stroke="#888"
                        tick={{ fill: "#888", fontSize: 12 }}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        wrapperStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "10px",
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: "20px" }} />
                      <Area
                        type="stepAfter"
                        dataKey="nicotine"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#nicotineGradient)"
                        strokeWidth={2}
                        name="Nicotine (mg)"
                        animationDuration={300}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedUiWearableTracker;
