"use client";

import React, { useState, useEffect } from "react";
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

export function FullWidthNicotineInfoComponent() {
  const [factOfTheDay, setFactOfTheDay] = useState("");

  const infoList = [
    {
      icon: <AlertTriangle className="h-6 w-6 text-yellow-400" />,
      title: "Highly Addictive",
      shortDesc: "Nicotine is highly addictive and can lead to dependence.",
      longDesc:
        "Nicotine activates the brain's reward circuits, making it difficult to quit and increasing the risk of long-term addiction. It can be as addictive as heroin or cocaine.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-400" />,
      title: "Rapid Brain Absorption",
      shortDesc:
        "It takes about 10 seconds for nicotine to reach the brain after inhalation.",
      longDesc:
        "This quick action contributes to its addictive nature and provides an almost immediate 'high' to users. The rapid onset of effects is one reason why cigarettes and e-cigarettes are so addictive.",
    },
    {
      icon: <Heart className="h-6 w-6 text-red-400" />,
      title: "Cardiovascular Effects",
      shortDesc: "Nicotine increases heart rate and blood pressure.",
      longDesc:
        "These effects can strain the heart and blood vessels, potentially leading to long-term cardiovascular problems. Nicotine can increase heart rate by 10 to 20 beats per minute and raise blood pressure by 5 to 10 mmHg.",
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      title: "Brain Development Impact",
      shortDesc:
        "It can affect brain development in adolescents and young adults.",
      longDesc:
        "Nicotine can interfere with the formation of brain synapses, potentially impacting attention, learning, and susceptibility to addiction. The brain continues developing until about age 25, making young people particularly vulnerable to nicotine's effects.",
    },
    {
      icon: <Zap className="h-6 w-6 text-orange-400" />,
      title: "Dual Action",
      shortDesc: "Nicotine acts as both a stimulant and a sedative.",
      longDesc:
        "It can increase alertness and calmness simultaneously, which contributes to its complex effects on mood and behavior. This dual action is why some people report that nicotine helps them concentrate and reduces stress.",
    },
    {
      icon: <Cigarette className="h-6 w-6 text-gray-400" />,
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
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500">
      <header className="w-full bg-gradient-to-r from-purple-600 to-purple-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center">
            Nicotine Awareness
          </h1>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <section className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Key Information on Nicotine Consumption
            </h2>
            <p className="text-purple-200">
              Understanding the effects and risks of nicotine use
            </p>
          </section>

          <section className="bg-purple-800/50 rounded-lg border border-purple-300/30 p-4">
            <h3 className="text-lg font-semibold mb-2 text-purple-100">
              Fact of the Day
            </h3>
            <p className="text-sm text-purple-200">{factOfTheDay}</p>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infoList.map((item, index) => (
              <div
                key={index}
                className="bg-purple-800/30 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg border border-purple-300/20 p-4"
              >
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0 mr-4">{item.icon}</div>
                  <h3 className="font-semibold text-lg text-purple-100">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-purple-200 mb-2">{item.shortDesc}</p>
                <p className="text-sm text-purple-300">{item.longDesc}</p>
              </div>
            ))}
          </section>

          <section className="text-center">
            <Button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white w-full max-w-md hover:from-purple-600 hover:to-purple-800 transition-all duration-300 py-6 text-lg">
              Start Your Nicotine-Free Journey Today
            </Button>
          </section>

          <section className="bg-purple-800/30 rounded-lg border border-purple-300/20 p-4">
            <h3 className="text-lg font-semibold mb-4 text-purple-100">
              Helpful Resources
            </h3>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-200 hover:text-purple-100 flex items-center"
                  >
                    {resource.title}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
