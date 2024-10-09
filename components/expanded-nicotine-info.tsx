"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  AlertTriangle,
  Clock,
  Heart,
  Brain,
  Zap,
  Cigarette,
  ExternalLink,
} from "lucide-react";

export function ExpandedNicotineInfoComponent() {
  const [factOfTheDay, setFactOfTheDay] = useState("");

  const infoList = [
    {
      icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
      title: "Highly Addictive",
      shortDesc: "Nicotine is highly addictive and can lead to dependence.",
      longDesc:
        "Nicotine activates the brain's reward circuits, making it difficult to quit and increasing the risk of long-term addiction. It can be as addictive as heroin or cocaine.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      title: "Rapid Brain Absorption",
      shortDesc:
        "It takes about 10 seconds for nicotine to reach the brain after inhalation.",
      longDesc:
        "This quick action contributes to its addictive nature and provides an almost immediate 'high' to users. The rapid onset of effects is one reason why cigarettes and e-cigarettes are so addictive.",
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Cardiovascular Effects",
      shortDesc: "Nicotine increases heart rate and blood pressure.",
      longDesc:
        "These effects can strain the heart and blood vessels, potentially leading to long-term cardiovascular problems. Nicotine can increase heart rate by 10 to 20 beats per minute and raise blood pressure by 5 to 10 mmHg.",
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      title: "Brain Development Impact",
      shortDesc:
        "It can affect brain development in adolescents and young adults.",
      longDesc:
        "Nicotine can interfere with the formation of brain synapses, potentially impacting attention, learning, and susceptibility to addiction. The brain continues developing until about age 25, making young people particularly vulnerable to nicotine's effects.",
    },
    {
      icon: <Zap className="h-6 w-6 text-orange-500" />,
      title: "Dual Action",
      shortDesc: "Nicotine acts as both a stimulant and a sedative.",
      longDesc:
        "It can increase alertness and calmness simultaneously, which contributes to its complex effects on mood and behavior. This dual action is why some people report that nicotine helps them concentrate and reduces stress.",
    },
    {
      icon: <Cigarette className="h-6 w-6 text-gray-500" />,
      title: "Multiple Sources",
      shortDesc: "Cigarettes are not the only source of nicotine.",
      longDesc:
        "Nicotine is also found in e-cigarettes, nicotine patches, gum, and other tobacco products, each with their own risks and potential for addiction. Even 'nicotine-free' e-cigarettes have been found to contain trace amounts of nicotine.",
    },
  ];

  const resources = [
    {
      title: "Quit Smoking",
      url: "https://www.cdc.gov/tobacco/quit_smoking/index.htm",
    },
    { title: "Nicotine Anonymous", url: "https://nicotine-anonymous.org/" },
    { title: "SmokeFree.gov", url: "https://smokefree.gov/" },
  ];

  const facts = [
    "Nicotine can be detected in the body for up to 3 days after use.",
    "Nicotine withdrawal symptoms typically peak within 2-3 days of quitting.",
    "The half-life of nicotine in the body is about 2 hours.",
    "Nicotine can cross the placenta and affect fetal development.",
    "Nicotine can be absorbed through the skin, which is why nicotine patches are effective.",
  ];

  useEffect(() => {
    setFactOfTheDay(facts[Math.floor(Math.random() * facts.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Card className="w-full max-w-3xl mx-auto overflow-hidden my-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Key Information on Nicotine Consumption
          </CardTitle>
          <CardDescription>
            Understanding the effects and risks of nicotine use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Fact of the Day</h3>
            <p className="text-sm">{factOfTheDay}</p>
          </div>
          <ul className="space-y-4">
            {infoList.map((item, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
              >
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 mr-4">{item.icon}</div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.shortDesc}</p>
                  <p className="text-sm text-gray-700">{item.longDesc}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
