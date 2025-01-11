"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { FaCircleNotch, FaSpinner } from "react-icons/fa";

export function Loader({ className, loading }) {
  return (
    <div
      className={cn(
        `flex justify-center items-center ${!loading && "hidden"}`,
        className
      )}
    >
      <FaCircleNotch className="w-full h-full animate-spin " />
    </div>
  );
}
