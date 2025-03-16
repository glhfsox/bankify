"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedCard } from "@/components/ui/animated-card";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-center">
          <AnimatedSection className="w-full lg:w-1/2" delay={0.2}>
            <div className="lg:max-w-lg space-y-6">
              <motion.div
                className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                Features
              </motion.div>
              <motion.h2
                className="text-3xl md:text-4xl font-medium leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Your <span className="text-primary">trusted</span> partner for easy
                <span className="text-primary"> Financial</span> direction
              </motion.h2>
            </div>
          </AnimatedSection>

          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedCard delay={0.3}>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    <path
                      d="M10.5 3.75H13.5C14.3284 3.75 15 4.42157 15 5.25V6.75C15 7.57843 14.3284 8.25 13.5 8.25H10.5C9.67157 8.25 9 7.57843 9 6.75V5.25C9 4.42157 9.67157 3.75 10.5 3.75Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.75 10.5H5.25C6.07843 10.5 6.75 11.1716 6.75 12V13.5C6.75 14.3284 6.07843 15 5.25 15H3.75C2.92157 15 2.25 14.3284 2.25 13.5V12C2.25 11.1716 2.92157 10.5 3.75 10.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.75 10.5H20.25C21.0784 10.5 21.75 11.1716 21.75 12V13.5C21.75 14.3284 21.0784 15 20.25 15H18.75C17.9216 15 17.25 14.3284 17.25 13.5V12C17.25 11.1716 17.9216 10.5 18.75 10.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.75 12H9V16.5C9 17.3284 9.67157 18 10.5 18H13.5C14.3284 18 15 17.3284 15 16.5V12H17.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M12 8.25V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Transaction</h3>
                <p className="text-muted-foreground">
                  Track and manage your transactions with ease and get real-time updates on all your financial activities.
                </p>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    <path
                      d="M18 2.25H6C4.75736 2.25 3.75 3.25736 3.75 4.5V19.5C3.75 20.7426 4.75736 21.75 6 21.75H18C19.2426 21.75 20.25 20.7426 20.25 19.5V4.5C20.25 3.25736 19.2426 2.25 18 2.25Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 12L10.5 15L16.5 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Wallet</h3>
                <p className="text-muted-foreground">
                  Manage your digital wallet securely and make payments with just a few clicks from anywhere.
                </p>
              </AnimatedCard>

              <AnimatedCard delay={0.5}>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    <path
                      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6.75V12H17.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Balance</h3>
                <p className="text-muted-foreground">
                  Monitor your account balance in real-time and get insights into your spending patterns.
                </p>
              </AnimatedCard>

              <motion.div
                className="relative bg-primary text-white rounded-xl p-6 flex flex-col justify-between h-full"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2">Stay on top of your weekly assets</h3>
                  <p className="text-primary-foreground/90">
                    Track and manage your weekly transactions effortlessly. Get a clear overview of all your spendings.
                  </p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="text-sm">
                    <div className="font-medium">weekly transactions</div>
                    <motion.div
                      className="font-bold text-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      +23%
                    </motion.div>
                  </div>
                  <AnimatedButton
                    href="/features"
                    variant="secondary"
                    className="text-primary rounded-full"
                  >
                    Get Started
                  </AnimatedButton>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
