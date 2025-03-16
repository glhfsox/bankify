"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="pb-10 border-b mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-6">
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
              <p className="text-muted-foreground mb-6">
                Elevate your digital presence with intuitive functionality and seamless design.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Main Pages</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Other Pages</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-muted-foreground hover:text-foreground">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/integration" className="text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-muted-foreground hover:text-foreground">
                    Team
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Subscribe</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your Email Address"
                  className="rounded-full bg-secondary"
                />
                <Button type="submit" className="rounded-full px-4">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bankify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
