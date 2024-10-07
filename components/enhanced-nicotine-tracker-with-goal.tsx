"use client";

import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Cigarette,
  Trophy,
  Medal,
  Award,
  TrendingDown,
  Calendar,
  Users,
  Target,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const consumptionData = [
  { day: "Mon", amount: 8 },
  { day: "Tue", amount: 7 },
  { day: "Wed", amount: 6 },
  { day: "Thu", amount: 8 },
  { day: "Fri", amount: 5 },
  { day: "Sat", amount: 4 },
  { day: "Sun", amount: 5 },
];

export function EnhancedNicotineTrackerWithGoal() {
  const [consumption, setConsumption] = useState(5);
  const [streak, setStreak] = useState(7);
  const [savings, setSavings] = useState(35);
  const [goal, setGoal] = useState(10);
  const [tempGoal, setTempGoal] = useState(goal.toString());

  const handleConsumption = (amount: number) => {
    setConsumption(Math.max(0, consumption + amount));
    if (amount > 0) {
      setSavings(Math.max(0, savings - 5));
    } else {
      setSavings(savings + 5);
    }
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempGoal(e.target.value);
  };

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal = parseInt(tempGoal, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      setGoal(newGoal);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt="User avatar"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">John Doe</CardTitle>
              <CardDescription className="text-purple-200">
                Level 5 Quitter
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white text-purple-700">
            Rank: #42
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Daily Goal: {goal}</span>
            <span className="text-sm font-medium">
              {consumption} / {goal}
            </span>
          </div>
          <Progress
            value={(consumption / goal) * 100}
            className="w-full bg-purple-300"
          />
          <div className="mt-4 flex justify-between items-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleConsumption(-1)}
            >
              <Cigarette className="mr-2 h-4 w-4" />
              Remove
            </Button>
            <span className="text-lg font-bold">Streak: {streak} days</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleConsumption(1)}
            >
              <Cigarette className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Set Your Daily Goal</CardTitle>
          <CardDescription>
            Adjust your daily nicotine consumption target
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleGoalSubmit}
            className="flex items-end space-x-2"
          >
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="goal">Daily Goal</Label>
              <Input
                type="number"
                id="goal"
                placeholder="Enter your daily goal"
                value={tempGoal}
                onChange={handleGoalChange}
                min="1"
              />
            </div>
            <Button type="submit">Set Goal</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
          <CardDescription>Milestones on your journey to quit</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-yellow-100 rounded-lg">
            <Trophy className="h-12 w-12 mx-auto text-yellow-500" />
            <p className="mt-2 text-sm font-medium">1 Week Streak</p>
            <Badge variant="secondary" className="mt-2">
              Achieved
            </Badge>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg">
            <Medal className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm font-medium">50% Reduction</p>
            <Badge variant="outline" className="mt-2">
              In Progress
            </Badge>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg">
            <Award className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm font-medium">Smoke-Free Month</p>
            <Badge variant="outline" className="mt-2">
              Locked
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Weekly consumption overview</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={consumptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-green-100 rounded-lg">
              <TrendingDown className="h-8 w-8 mx-auto text-green-500" />
              <p className="mt-2 text-xl font-bold text-green-700">30%</p>
              <p className="text-sm text-green-600">Reduction</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg">
              <Calendar className="h-8 w-8 mx-auto text-blue-500" />
              <p className="mt-2 text-xl font-bold text-blue-700">{streak}</p>
              <p className="text-sm text-blue-600">Day Streak</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg">
              <Users className="h-8 w-8 mx-auto text-purple-500" />
              <p className="mt-2 text-xl font-bold text-purple-700">
                ${savings}
              </p>
              <p className="text-sm text-purple-600">Saved</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg">
              <Target className="h-8 w-8 mx-auto text-yellow-500" />
              <p className="mt-2 text-xl font-bold text-yellow-700">{goal}</p>
              <p className="text-sm text-yellow-600">Daily Goal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community Ranking</CardTitle>
          <CardDescription>See how you compare to others</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-right">Streak</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Alice Johnson"
                      />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    Alice Johnson
                  </div>
                </TableCell>
                <TableCell>10</TableCell>
                <TableCell className="text-right">30 days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">2</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Bob Smith"
                      />
                      <AvatarFallback>BS</AvatarFallback>
                    </Avatar>
                    Bob Smith
                  </div>
                </TableCell>
                <TableCell>9</TableCell>
                <TableCell className="text-right">28 days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">3</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Charlie Brown"
                      />
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                    Charlie Brown
                  </div>
                </TableCell>
                <TableCell>8</TableCell>
                <TableCell className="text-right">25 days</TableCell>
              </TableRow>
              <TableRow className="bg-muted/50">
                <TableCell className="font-medium">42</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="John Doe"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    John Doe
                  </div>
                </TableCell>
                <TableCell>5</TableCell>
                <TableCell className="text-right">7 days</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
