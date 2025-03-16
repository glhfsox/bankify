"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AnimatedButton } from "@/components/ui/animated-button";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Integration", href: "/integration" },
  { name: "Features", href: "/features" },
  { name: "Blogs", href: "/blogs" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="py-4 border-b sticky top-0 z-40 w-full bg-background/95 backdrop-blur">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
              <path
                fill="currentColor"
                d="M3.55 19.09l1.41 1.41 1.79-1.8-1.41-1.41zM11 20h2v3h-2zM1 11h3v2H1zM13 4h-2V1h2zM19.09 3.55l-1.41 1.41 1.8 1.79 1.41-1.41zM17.24 18.71l1.79 1.8 1.41-1.41-1.8-1.79zM20 11h3v2h-3zM12 5.95L17.05 11H7L12 5.95zM12 16c1.66 0 3-1.34 3-3 0-.07-.03-.13-.04-.2l-2.96-2.96-2.96 2.96c-.01.07-.04.13-.04.2 0 1.66 1.34 3 3 3z"
              />
            </svg>
          </div>
          <span className="text-xl font-medium">Bankify</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link href="/auth/login" className="flex items-center">
              <LogIn className="mr-1 h-4 w-4" /> Login
            </Link>
          </Button>
          <AnimatedButton
            href="/auth/register"
            className="rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            Sign Up
          </AnimatedButton>
        </div>

        {/* Mobile navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t flex flex-col space-y-3">
                <Button asChild variant="outline" className="w-full rounded-full" onClick={() => setIsOpen(false)}>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild className="rounded-full w-full" onClick={() => setIsOpen(false)}>
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
