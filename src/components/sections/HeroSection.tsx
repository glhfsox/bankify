"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <AnimatedSection className="text-center mx-auto max-w-3xl mb-12">
          <div className="flex justify-center mb-4">
            <motion.div
              className="bg-primary/10 rounded-full py-1 px-4 flex items-center space-x-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <div className="flex items-center space-x-1">
                <motion.span
                  className="block w-2 h-2 rounded-full bg-yellow-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.2 }}
                ></motion.span>
                <motion.span
                  className="block w-2 h-2 rounded-full bg-green-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.2 }}
                ></motion.span>
                <motion.span
                  className="block w-2 h-2 rounded-full bg-red-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.2 }}
                ></motion.span>
              </div>
              <div className="text-xs font-medium text-primary flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                14,3800 Reviews
              </div>
            </motion.div>
          </div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Manage your banking and finances in one place
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create account, Simply
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <AnimatedButton
              href="/contact"
              size="lg"
              className="rounded-full px-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </AnimatedButton>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.3}>
          <div className="relative">
            <motion.div
              className="bg-gradient-to-b from-primary/5 to-transparent rounded-3xl p-6 md:p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Image
                src="https://ext.same-assets.com/3326104566/344829349.png"
                alt="Banking Dashboard"
                width={1200}
                height={700}
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full py-2 px-6 flex items-center space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <p className="text-sm font-medium">We process $2 Billion+ transactions with</p>
              <div className="flex space-x-2">
                <motion.div
                  className="w-6 h-6 bg-blue-100 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                ></motion.div>
                <motion.div
                  className="w-6 h-6 bg-blue-200 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
