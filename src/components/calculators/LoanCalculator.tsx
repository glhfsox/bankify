"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(36); // months
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateLoan = () => {
    // Convert annual interest rate to monthly and decimal form
    const monthlyRate = interestRate / 100 / 12;

    // Calculate monthly payment using the formula: P = L[i(1+i)^n]/[(1+i)^n-1]
    // Where P is the monthly payment, L is the loan amount, i is the interest rate per month, and n is the number of payments
    const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);

    // Calculate total payment over the life of the loan
    const total = payment * loanTerm;

    // Calculate total interest paid
    const interest = total - loanAmount;

    setMonthlyPayment(isNaN(payment) ? 0 : payment);
    setTotalPayment(isNaN(total) ? 0 : total);
    setTotalInterest(isNaN(interest) ? 0 : interest);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="loanAmount">Loan Amount</Label>
            <span className="text-sm font-medium">{formatCurrency(loanAmount)}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Slider
              id="loanAmount"
              min={1000}
              max={100000}
              step={1000}
              value={[loanAmount]}
              onValueChange={(value) => setLoanAmount(value[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-24"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Label htmlFor="interestRate" className="mr-1">Interest Rate</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                      <Info className="h-3 w-3" />
                      <span className="sr-only">Interest rate info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Annual interest rate (APR)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-sm font-medium">{interestRate}%</span>
          </div>
          <div className="flex gap-4 items-center">
            <Slider
              id="interestRate"
              min={0.1}
              max={30}
              step={0.1}
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-24"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="loanTerm">Loan Term (months)</Label>
            <span className="text-sm font-medium">{loanTerm} months</span>
          </div>
          <div className="flex gap-4 items-center">
            <Slider
              id="loanTerm"
              min={6}
              max={360}
              step={6}
              value={[loanTerm]}
              onValueChange={(value) => setLoanTerm(value[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-24"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t">
        <div className="grid gap-2">
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Monthly Payment:</span>
            <span className="font-semibold text-lg">{formatCurrency(monthlyPayment)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Total Payment:</span>
            <span className="font-medium">{formatCurrency(totalPayment)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Total Interest:</span>
            <span className="font-medium">{formatCurrency(totalInterest)}</span>
          </div>
        </div>
      </div>

      <Button className="w-full">
        Apply for a Loan <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
