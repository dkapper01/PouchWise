import React from "react";
import { NicotineIngestionTracker } from "../../components/nicotine-ingestion-tracker";
import BottomNavBar from "../../components/BottomNavBar";
export default function ProgressPage() {
  return (
    <div>
      <NicotineIngestionTracker />
      <BottomNavBar />
    </div>
  );
}
