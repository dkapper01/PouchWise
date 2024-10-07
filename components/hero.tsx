"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <Card className="bg-background/90 backdrop-blur-2xl border-none shadow-2xl overflow-hidden">
      <CardContent className="p-8 sm:p-12 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />
        <div className="flex flex-col justify-center space-y-10 max-w-4xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 text-sm font-semibold bg-primary/10 text-primary px-4 py-1.5 rounded-full inline-flex items-center">
              {/* <Ring className="w-4 h-4 mr-2" /> */}
              AI-Powered Smart Ring Technology
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Revolutionize
              </span>
              <span className="block mt-2 text-foreground">
                Your Nicotine Health Journey
              </span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground text-center leading-relaxed">
            Experience a new era of health management with our AI smart ring,
            designed specifically for nicotine users. Track your progress, earn
            rewards, and receive personalized insights to support your wellness
            journey every step of the way.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 justify-center">
            <Button
              size="lg"
              className="group text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg hover:shadow-xl text-white"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-full border-2 hover:bg-primary/5 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
