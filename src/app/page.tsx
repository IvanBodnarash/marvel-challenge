"use client";

import { Suspense } from "react";
import { HomePageClient } from "@/components/home/HomePageClient";

export default function HomePage() {
  return (
    <Suspense fallback={<main />}>
      <HomePageClient />
    </Suspense>
  );
}
