"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlurImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  quality?: number;
  priority?: boolean;
}

export function BlurImage({
  src,
  alt,
  width,
  height,
  className,
  objectFit = "cover",
  quality = 85,
  priority = false,
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("overflow-hidden relative", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        className={cn(
          "duration-700 ease-in-out",
          isLoading
            ? "scale-105 blur-sm grayscale"
            : "scale-100 blur-0 grayscale-0",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down",
        )}
        onLoadingComplete={() => setIsLoading(false)}
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse",
          !isLoading && "opacity-0 invisible"
        )}
        style={{ animationDuration: "1.5s" }}
      />
    </div>
  );
}
