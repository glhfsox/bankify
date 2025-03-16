"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type AnimatedButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  href?: string;
  onClick?: () => void;
  whileHover?: any;
  whileTap?: any;
  [x: string]: any;
};

export function AnimatedButton({
  children,
  variant = "default",
  size = "default",
  className,
  href,
  onClick,
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
  ...props
}: AnimatedButtonProps) {
  const buttonContent = (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Button variant={variant} size={size} className={cn("overflow-hidden", className)} asChild {...props}>
        <Link href={href}>{buttonContent}</Link>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("overflow-hidden", className)}
      onClick={onClick}
      {...props}
    >
      {buttonContent}
    </Button>
  );
}
