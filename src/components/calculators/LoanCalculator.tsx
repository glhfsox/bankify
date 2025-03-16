"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(3);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateLoan = useCallback(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (interestRate === 0) {
      const payment = principal / numberOfPayments;
      setMonthlyPayment(payment);
      setTotalInterest(0);
      setTotalPayment(principal);
    } else {
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      setMonthlyPayment(payment);
      setTotalInterest(payment * numberOfPayments - principal);
      setTotalPayment(payment * numberOfPayments);
    }
  }, [loanAmount, interestRate, loanTerm]);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, calculateLoan]);

  const handleLoanAmountChange = (value: string) => {
    const amount = parseInt(value.replace(/,/g, ""));
    if (!isNaN(amount)) {
      setLoanAmount(amount);
    } else if (value === "") {
      setLoanAmount(0);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartData = [
    { name: "Principal", value: loanAmount, color: "#6366F1" },
    { name: "Interest", value: totalInterest, color: "#F59E0B" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            Loan Calculator
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-5 w-5 ml-2 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Calculate your monthly payments, total interest, and total
                    payment amount for a fixed-rate loan.
                  </p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                    $
                  </span>
                  <Input
                    id="loanAmount"
                    type="text"
                    className="rounded-l-none"
                    value={loanAmount.toLocaleString()}
                    onChange={(e) => handleLoanAmountChange(e.target.value)}
                  />
                </div>
                <Slider
                  value={[loanAmount]}
                  min={1000}
                  max={100000}
                  step={1000}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <span className="text-sm text-muted-foreground">
                    {interestRate.toFixed(1)}%
                  </span>
                </div>
                <Slider
                  id="interestRate"
                  value={[interestRate]}
                  min={0}
                  max={20}
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                  <span className="text-sm text-muted-foreground">
                    {loanTerm} {loanTerm === 1 ? "year" : "years"}
                  </span>
                </div>
                <Slider
                  id="loanTerm"
                  value={[loanTerm]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(value) => setLoanTerm(value[0])}
                  className="mt-2"
                />
              </div>

              <div className="bg-muted p-4 rounded-lg mt-8">
                <h3 className="font-semibold mb-2">Loan Summary</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-bold">
                      {formatCurrency(monthlyPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Principal:</span>
                    <span>{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest:</span>
                    <span className="text-amber-600">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span>Total Payment:</span>
                    <span className="font-medium">{formatCurrency(totalPayment)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => 
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h3 className="font-medium mb-2">Payment Breakdown</h3>
                <p className="text-sm text-muted-foreground">
                  Your monthly payment of {formatCurrency(monthlyPayment)} will pay off your 
                  {" "}{formatCurrency(loanAmount)} loan in {loanTerm} {loanTerm === 1 ? "year" : "years"}.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  You will pay a total of {formatCurrency(totalInterest)} in interest, which is 
                  {" "}{totalInterest > 0 ? ((totalInterest / loanAmount) * 100).toFixed(1) : "0"}% of your loan amount.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <h3 className="font-medium mb-2">Loan Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>A shorter loan term means higher monthly payments but less interest overall.</li>
                  <li>Consider making extra payments to reduce the principal and save on interest.</li>
                  <li>Shop around for the best interest rates to minimize your total cost.</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
