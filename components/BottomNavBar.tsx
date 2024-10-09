"use client";

import React from "react";
import {
  useFloating,
  offset,
  shift,
  flip,
  arrow,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import {
  AlertTriangle,
  Clock,
  Heart,
  Brain,
  Zap,
  Cigarette,
  ExternalLink,
  CircleDotDashed,
  Activity,
  Users,
  Book,
} from "lucide-react";
import Link from "next/link";

const Tooltip = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const arrowRef = React.useRef(null);
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(
            children,
            getReferenceProps({ ref: refs.setReference })
          )
        : children}
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          className="z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700"
          {...getFloatingProps()}
        >
          {label}
          <div ref={arrowRef} className="tooltip-arrow" />
        </div>
      )}
    </>
  );
};

export const BottomNavBar = () => {
  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <Tooltip label="Progress">
          <Link
            // type="button"
            href="/protected"
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <CircleDotDashed className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="sr-only">Progress</span>
          </Link>
        </Tooltip>
        <Tooltip label="Health">
          <Link
            href="/health"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Activity className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />

            <span className="sr-only">Health</span>
          </Link>
        </Tooltip>
        <div className="flex justify-center items-center">
          <Tooltip label="Log Nicotine Intake">
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
              <span className="sr-only">Log Nicotine Intake</span>
            </button>
          </Tooltip>
        </div>
        <Tooltip label="Community">
          <Link
            href="/community"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Users className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />

            <span className="sr-only">Community</span>
          </Link>
        </Tooltip>
        <Tooltip label="Motivation">
          <Link
            href="/motivation"
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Book className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="sr-only">Motivation</span>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default BottomNavBar;
