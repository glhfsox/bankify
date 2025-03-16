"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container">
        <div className="relative rounded-2xl bg-primary/80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 mix-blend-multiply"></div>

          <div className="relative z-10 flex flex-col items-center text-center py-16 px-4">
            <div className="bg-white rounded-full p-4 mb-8">
              <svg width="32" height="32" viewBox="0 0 24 24" className="text-primary">
                <path
                  d="M9 21H15M9 21C9 19.8954 8.10457 19 7 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H17C15.8954 19 15 19.8954 15 21M9 21C9 19.8954 9.89543 19 11 19H13C14.1046 19 15 19.8954 15 21M12 11H12.01M8 11H8.01M16 11H16.01M12 7H12.01M8 7H8.01M16 7H16.01M12 15H12.01M8 15H8.01M16 15H16.01"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
              Your trusted easy partner in financial growth forever
            </h2>

            <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
              <Link href="/contact">Contact Us</Link>
            </Button>

            <div className="mt-8 flex items-center justify-center">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/30"></div>
                <div className="w-8 h-8 rounded-full bg-white/30"></div>
                <div className="w-8 h-8 rounded-full bg-white/30"></div>
              </div>
              <div className="ml-3 text-sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block mr-1"
                >
                  <path
                    d="M11.049 2.927C11.3483 2.00573 12.6517 2.00574 12.951 2.927L14.43 7.43709C14.5623 7.84189 14.9393 8.11213 15.3643 8.11213H20.0988C21.0732 8.11213 21.4797 9.35193 20.6879 9.93709L16.8503 12.752C16.5057 13.0109 16.3584 13.4514 16.4906 13.8562L17.9695 18.3663C18.2688 19.2876 17.2124 20.0499 16.4205 19.4647L12.5829 16.6498C12.2384 16.3909 11.7616 16.3909 11.4171 16.6498L7.5795 19.4647C6.7876 20.0499 5.73119 19.2876 6.0305 18.3663L7.50939 13.8562C7.64163 13.4514 7.49435 13.0109 7.14971 12.752L3.31209 9.93709C2.52026 9.35193 2.92681 8.11213 3.90121 8.11213H8.63574C9.06074 8.11213 9.43767 7.84189 9.56991 7.43709L11.049 2.927Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                14,3800 Reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
