import React from "react";
import { NicotineTracker } from "../../components/nicotine-tracker";
import BottomNavBar from "../../components/BottomNavBar";

export default function ProgressPage() {
  return (
    <div>
      <NicotineTracker />
      <BottomNavBar />
    </div>
  );
}
