"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Trophy, Gift, Zap, Users, Award, Flame, Droplet } from "lucide-react";

export function PurpleGradientQuitNicotineApp() {
  const [userProgress, setUserProgress] = useState(70);
  const [streak, setStreak] = useState(7);
  const [coins, setCoins] = useState(350);

  const leaderboard = [
    { name: "Alex", days: 30, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Sam", days: 28, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Jordan", days: 25, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Casey", days: 21, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Taylor", days: 18, avatar: "/placeholder.svg?height=32&width=32" },
  ];

  const rewards = [
    { name: "1 Week Badge", progress: 100, icon: Award },
    { name: "1 Month Badge", progress: 70, icon: Trophy },
    { name: "$50 Gift Card", progress: 30, icon: Gift },
  ];

  const handleNicotineFreeDayClick = () => {
    setUserProgress((prev) => Math.min(prev + 10, 100));
    setStreak((prev) => prev + 1);
    setCoins((prev) => prev + 50);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 p-4 space-y-6">
      <Tabs defaultValue="leaderboard" className="">
        <TabsList className="flex justify-center bg-white bg-opacity-10">
          <TabsTrigger
            value="leaderboard"
            className="text-md text-white data-[state=active]:bg-purple-600"
          >
            Leaderboard
          </TabsTrigger>
          <TabsTrigger
            value="rewards"
            className="text-md text-white data-[state=active]:bg-purple-600"
          >
            Rewards
          </TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard">
          <Card className="w-full bg-white bg-opacity-10 backdrop-blur-sm border-purple-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center justify-center text-white">
                <Users className="mr-2 h-6 w-6" />
                Top Quitters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {leaderboard.map((user, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-purple-800 bg-opacity-50 rounded-lg p-4 transition-all hover:scale-102 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-purple-200 text-xl">
                        {index + 1}
                      </span>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-lg text-white">
                        {user.name}
                      </span>
                    </div>
                    <span className="text-lg font-medium bg-purple-600 text-white px-4 py-2 rounded-full">
                      {user.days} days
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rewards">
          <Card className="w-full bg-white bg-opacity-10 backdrop-blur-sm border-purple-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center justify-center text-white">
                <Gift className="mr-2 h-6 w-6" />
                Your Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {rewards.map((reward, index) => (
                  <li
                    key={index}
                    className="space-y-2 bg-purple-800 bg-opacity-50 rounded-lg p-4 transition-all hover:scale-102 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-lg flex items-center text-white">
                        <reward.icon className="h-6 w-6 mr-3 text-purple-300" />
                        {reward.name}
                      </span>
                      {reward.progress === 100 ? (
                        <Trophy className="h-6 w-6 text-yellow-400" />
                      ) : (
                        <span className="text-lg font-medium text-purple-200">
                          {reward.progress}%
                        </span>
                      )}
                    </div>
                    <Progress
                      value={reward.progress}
                      className="w-full h-3 rounded-full bg-purple-300"
                    />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
