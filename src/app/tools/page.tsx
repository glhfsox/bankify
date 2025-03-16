import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoanCalculator from "@/components/calculators/LoanCalculator";
import SavingsCalculator from "@/components/calculators/SavingsCalculator";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import InvestmentCalculator from "@/components/calculators/InvestmentCalculator";

export const metadata = {
  title: "Financial Tools | Bankify",
  description: "Use our financial calculators to plan your future investments, loans, and savings.",
};

export default function ToolsPage() {
  return (
    <>
      <Header />
      <main className="py-12 md:py-16 bg-secondary/20 min-h-screen">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Financial Tools</h1>
              <p className="text-muted-foreground">
                Plan your financial future with our powerful calculators.
              </p>
            </div>

            <Tabs defaultValue="loan" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="loan">Loan</TabsTrigger>
                <TabsTrigger value="mortgage">Mortgage</TabsTrigger>
                <TabsTrigger value="savings">Savings</TabsTrigger>
                <TabsTrigger value="investment">Investment</TabsTrigger>
              </TabsList>

              <Card>
                <TabsContent value="loan" className="mt-0">
                  <CardHeader>
                    <CardTitle>Loan Calculator</CardTitle>
                    <CardDescription>
                      Calculate your monthly payments and total interest for a loan.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LoanCalculator />
                  </CardContent>
                </TabsContent>

                <TabsContent value="mortgage" className="mt-0">
                  <CardHeader>
                    <CardTitle>Mortgage Calculator</CardTitle>
                    <CardDescription>
                      Estimate your monthly mortgage payments and total cost.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MortgageCalculator />
                  </CardContent>
                </TabsContent>

                <TabsContent value="savings" className="mt-0">
                  <CardHeader>
                    <CardTitle>Savings Calculator</CardTitle>
                    <CardDescription>
                      See how your money can grow with regular deposits.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SavingsCalculator />
                  </CardContent>
                </TabsContent>

                <TabsContent value="investment" className="mt-0">
                  <CardHeader>
                    <CardTitle>Investment Calculator</CardTitle>
                    <CardDescription>
                      Project the growth of your investments over time.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InvestmentCalculator />
                  </CardContent>
                </TabsContent>
              </Card>
            </Tabs>

            <div className="mt-12 p-6 bg-primary/5 rounded-lg">
              <h2 className="text-xl font-medium mb-3">Financial Planning Tips</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Start saving early to take advantage of compound interest</li>
                <li>Aim to keep your total debt payments under 36% of your gross income</li>
                <li>Build an emergency fund that covers 3-6 months of expenses</li>
                <li>Try to pay more than the minimum payment on your loans</li>
                <li>Consider the impact of inflation on your long-term financial goals</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
