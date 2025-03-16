"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type AnimatedCardProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  delay?: number;
  onClick?: () => void;
  hoverEffect?: boolean;
};

export function AnimatedCard({
  children,
  className,
  contentClassName,
  delay = 0,
  onClick,
  hoverEffect = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
    >
      <Card className={cn(className)}>
        <CardContent className={cn("p-6", contentClassName)}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
