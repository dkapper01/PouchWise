"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import {
  Activity,
  BarChart2,
  Bell,
  Heart,
  Mail,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export function ImprovedLandingPageComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-gray-800 md:hidden">
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            <Link
              className="text-lg font-medium hover:text-primary transition-colors"
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              className="text-lg font-medium hover:text-primary transition-colors"
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              className="text-lg font-medium hover:text-primary transition-colors"
              href="#signup"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  PouchWise:{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Coming Soon
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Track, understand, and optimize your nicotine pouch usage.
                  Make informed decisions for a healthier you.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Notify Me
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Be the first to know when we launch. No spam, we promise!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Upcoming{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Features
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <BarChart2 className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold mb-2">Usage Tracking</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Log and visualize your nicotine pouch consumption patterns
                    with ease.
                  </p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Heart className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold mb-2">Health Insights</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Gain personalized analytics on how nicotine affects your
                    health.
                  </p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Bell className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold mb-2">Smart Reminders</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Set goals and receive notifications to manage your
                    consumption effectively.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              How{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                It Works
              </span>
            </h2>
            <div className="space-y-12 md:space-y-16 lg:space-y-20">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-4">Track Your Usage</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Easily log your nicotine pouch consumption with just a few
                    taps. Our intuitive interface makes tracking effortless and
                    consistent.
                  </p>
                  <Button variant="outline" className="group">
                    Learn more{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full opacity-20 blur-xl"></div>
                    <BarChart2 className="h-32 w-32 text-primary relative z-10" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-4">
                    Analyze Your Habits
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Gain insights into your usage patterns and their potential
                    health impacts. Our advanced analytics help you understand
                    your habits better.
                  </p>
                  <Button variant="outline" className="group">
                    Learn more{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full opacity-20 blur-xl"></div>
                    <Heart className="h-32 w-32 text-primary relative z-10" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-4">
                    Improve Your Health
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Set personalized goals and receive smart reminders to help
                    you manage and reduce your nicotine consumption over time.
                  </p>
                  <Button variant="outline" className="group">
                    Learn more{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full opacity-20 blur-xl"></div>
                    <Bell className="h-32 w-32 text-primary relative z-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="signup"
          className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Be the First to Know
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                Sign up now to get early access and exclusive updates about
                PouchWise's launch.
              </p>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-primary-foreground text-primary"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-primary-foreground/80">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container px-4 md:px-6 py-8 mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">PouchWise</span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                className="text-sm hover:underline underline-offset-4"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-sm hover:underline underline-offset-4"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-sm hover:underline underline-offset-4"
                href="#"
              >
                Contact Us
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide  lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 PouchWise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
