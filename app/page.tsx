"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const getGmail = async () => {
    const response = await fetch("/api/getGmail");
  };

  const useGPT = async () => {
    const response = await fetch("/api/useGPT");
  };

  return (
    <main>
      <div>
        <h1>Job Seeker</h1>
        <Button onClick={getGmail}>Get Gmails</Button>
        <Button onClick={useGPT}>Parse With GPT</Button>
      </div>
    </main>
  );
}
