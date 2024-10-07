"use client";

import React from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function UserWalkthrough() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);

  const questions = [
    "How many nicotine pouches do you use per day?",
    "How much do you pay for each nicotine pouch package?",
    "What are your main motivations for using this app?",
  ];

  const nicotineOptions = ["0-5", "6-10", "11-15", "16-20", "21+"];
  const motivationOptions = [
    "Tracking and reducing nicotine use",
    "Quitting nicotine entirely",
    "Curiosity about how nicotine pouches affect me",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleOptionSelection = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-[400px] shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">User Walkthrough</CardTitle>
        <CardDescription>Help us understand your needs</CardDescription>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {questions[currentQuestion]}
          </h2>
          {currentQuestion === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {nicotineOptions.map((option) => (
                <Button
                  key={option}
                  variant={
                    answers[currentQuestion] === option ? "default" : "outline"
                  }
                  onClick={() => handleOptionSelection(option)}
                  className="w-full h-12 text-lg"
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
          {currentQuestion === 1 && (
            <div className="space-y-2">
              <Input
                id="price-input"
                value={answers[1]}
                onChange={handleInputChange}
                placeholder="Enter price (e.g., $5.99)"
                className="text-lg h-12"
              />
              <p className="text-sm text-muted-foreground">
                Please enter the price in your local currency
              </p>
            </div>
          )}
          {currentQuestion === 2 && (
            <div className="space-y-3">
              {motivationOptions.map((option) => (
                <Button
                  key={option}
                  variant={
                    answers[currentQuestion] === option ? "default" : "outline"
                  }
                  onClick={() => handleOptionSelection(option)}
                  className="w-full justify-start text-left h-auto py-3 px-4 text-sm"
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        {isLastQuestion ? (
          <Button
            onClick={() =>
              alert(`Walkthrough completed! Answers: ${answers.join(", ")}`)
            }
          >
            Finish
            <CheckCircle2 className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          currentQuestion === 1 && (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
}
