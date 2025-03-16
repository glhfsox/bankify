"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { motion } from "framer-motion";
import {
  BarChart,
  CreditCard,
  DollarSign,
  Landmark,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

// Mock data
const accounts = [
  {
    name: "Main Account",
    balance: "$12,546.00",
    cardNumber: "**** **** **** 4582",
    change: "+$2,235.00",
    positive: true,
  },
  {
    name: "Savings Account",
    balance: "$4,256.00",
    cardNumber: "**** **** **** 1236",
    change: "+$1,654.00",
    positive: true,
  },
  {
    name: "Investment Account",
    balance: "$32,651.00",
    cardNumber: "**** **** **** 8974",
    change: "-$1,250.00",
    positive: false,
  },
];

const recentTransactions = [
  {
    name: "Apple Store",
    amount: "$129.99",
    date: "Today, 2:34 PM",
    type: "expense",
  },
  {
    name: "Salary Deposit",
    amount: "$4,250.00",
    date: "Yesterday, 10:00 AM",
    type: "income",
  },
  {
    name: "Amazon",
    amount: "$49.99",
    date: "Jun 14, 2024",
    type: "expense",
  },
  {
    name: "Transfer to Savings",
    amount: "$500.00",
    date: "Jun 13, 2024",
    type: "transfer",
  },
  {
    name: "Netflix Subscription",
    amount: "$15.99",
    date: "Jun 10, 2024",
    type: "expense",
  },
];

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="py-8 md:py-12 bg-secondary/20 min-h-screen">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar */}
            <AnimatedSection
              className="lg:w-1/4 flex flex-col space-y-4"
              direction="left"
              delay={0.1}
            >
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">John Doe</h3>
                      <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </div>

                  <nav className="space-y-1">
                    <Button
                      variant="secondary"
                      className="w-full justify-start mb-1 bg-primary/5 text-primary"
                    >
                      <BarChart className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Cards
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Transactions
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Landmark className="mr-2 h-4 w-4" />
                      Investments
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </nav>
                </CardContent>
              </Card>

              <Card className="shadow-md bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Premium Plan</h3>
                  <p className="text-sm mb-4 text-primary-foreground/80">
                    Upgrade to unlock more features and get detailed financial insights.
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full text-primary"
                  >
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Main Content */}
            <div className="lg:w-3/4 space-y-6">
              <AnimatedSection delay={0.2}>
                <Card className="shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xl">Your Accounts</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-muted-foreground"
                    >
                      Add New Account
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {accounts.map((account, i) => (
                        <motion.div
                          key={account.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        >
                          <div className="bg-secondary/50 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <h3 className="font-medium">{account.name}</h3>
                            <p className="text-2xl font-bold my-2">{account.balance}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                {account.cardNumber}
                              </span>
                              <span
                                className={`text-xs flex items-center ${
                                  account.positive ? "text-green-500" : "text-red-500"
                                }`}
                              >
                                {account.positive ? (
                                  <ArrowUpRight className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 mr-1" />
                                )}
                                {account.change}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <Card className="shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xl">Recent Transactions</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-muted-foreground"
                    >
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {recentTransactions.map((transaction, i) => (
                        <motion.div
                          key={transaction.name + i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                          className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                transaction.type === "income"
                                  ? "bg-green-100 text-green-600"
                                  : transaction.type === "expense"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {transaction.type === "income" ? (
                                <ArrowUpRight className="h-5 w-5" />
                              ) : transaction.type === "expense" ? (
                                <ArrowDownRight className="h-5 w-5" />
                              ) : (
                                <CreditCard className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{transaction.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {transaction.date}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`font-medium ${
                              transaction.type === "income"
                                ? "text-green-600"
                                : transaction.type === "expense"
                                ? "text-red-600"
                                : ""
                            }`}
                          >
                            {transaction.type === "income" ? "+" : transaction.type === "expense" ? "-" : ""}
                            {transaction.amount}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
