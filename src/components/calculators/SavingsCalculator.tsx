"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(1000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(100);
  const [years, setYears] = useState(5);
  const [interestRate, setInterestRate] = useState(2.5);
  const [compoundFrequency, setCompoundFrequency] = useState("monthly");
  const [totalInterest, setTotalInterest] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);

  const calculateSavings = useCallback(() => {
    let compoundsPerYear;
    switch (compoundFrequency) {
      case "daily":
        compoundsPerYear = 365;
        break;
      case "weekly":
        compoundsPerYear = 52;
        break;
      case "monthly":
        compoundsPerYear = 12;
        break;
      case "quarterly":
        compoundsPerYear = 4;
        break;
      case "annually":
        compoundsPerYear = 1;
        break;
      default:
        compoundsPerYear = 12;
    }

    const rate = interestRate / 100 / compoundsPerYear;
    const timeCompounding = years * compoundsPerYear;
    
    let balance = initialDeposit;
    let totalDeposits = initialDeposit;
    let yearlyInterest = 0;
    
    // For each compound period
    for (let period = 1; period <= timeCompounding; period++) {
      // Add monthly deposit
      balance += monthlyDeposit;
      totalDeposits += monthlyDeposit;
      
      // Add interest for this period
      const periodInterest = balance * rate;
      balance += periodInterest;
      yearlyInterest += periodInterest;
    }
    
    setTotalInterest(Math.round(yearlyInterest));
    setFinalBalance(Math.round(balance));
  }, [initialDeposit, monthlyDeposit, years, interestRate, compoundFrequency]);

  // Update calculations when inputs change
  useEffect(() => {
    calculateSavings();
  }, [initialDeposit, monthlyDeposit, years, interestRate, compoundFrequency, calculateSavings]);

  const handleInitialDepositChange = (value: string) => {
    const amount = parseInt(value.replace(/,/g, ""));
    if (!isNaN(amount)) {
      setInitialDeposit(amount);
    } else if (value === "") {
      setInitialDeposit(0);
    }
  };

  const handleMonthlyDepositChange = (value: string) => {
    const amount = parseInt(value.replace(/,/g, ""));
    if (!isNaN(amount)) {
      setMonthlyDeposit(amount);
    } else if (value === "") {
      setMonthlyDeposit(0);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            Savings Calculator
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-5 w-5 ml-2 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Calculate how your savings will grow over time with regular
                    deposits and compound interest.
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
                  <Label htmlFor="initialDeposit">Initial Deposit</Label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(initialDeposit)}
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                    $
                  </span>
                  <Input
                    id="initialDeposit"
                    type="text"
                    className="rounded-l-none"
                    value={initialDeposit.toLocaleString()}
                    onChange={(e) => handleInitialDepositChange(e.target.value)}
                  />
                </div>
                <Slider
                  value={[initialDeposit]}
                  min={0}
                  max={50000}
                  step={500}
                  onValueChange={(value) => setInitialDeposit(value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="monthlyDeposit">Monthly Deposit</Label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(monthlyDeposit)}
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                    $
                  </span>
                  <Input
                    id="monthlyDeposit"
                    type="text"
                    className="rounded-l-none"
                    value={monthlyDeposit.toLocaleString()}
                    onChange={(e) => handleMonthlyDepositChange(e.target.value)}
                  />
                </div>
                <Slider
                  value={[monthlyDeposit]}
                  min={0}
                  max={1000}
                  step={25}
                  onValueChange={(value) => setMonthlyDeposit(value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="years">Time Period (Years)</Label>
                  <span className="text-sm text-muted-foreground">
                    {years} years
                  </span>
                </div>
                <Slider
                  id="years"
                  value={[years]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(value) => setYears(value[0])}
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
                  min={0.1}
                  max={10}
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="compoundFrequency">Compound Frequency</Label>
                <Select
                  value={compoundFrequency}
                  onValueChange={setCompoundFrequency}
                >
                  <SelectTrigger id="compoundFrequency" className="mt-2">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Savings Summary</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <span>Initial Deposit:</span>
                    <span className="font-medium">
                      {formatCurrency(initialDeposit)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Deposits:</span>
                    <span className="font-medium">
                      {formatCurrency(
                        initialDeposit + monthlyDeposit * 12 * years
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest Earned:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(
                        finalBalance -
                          (initialDeposit + monthlyDeposit * 12 * years)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span>Final Balance:</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(finalBalance)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-[300px] bg-secondary/20 rounded-lg flex flex-col items-center justify-center p-6">
                <p className="text-center text-muted-foreground mb-3">
                  Savings Growth Visualization
                </p>
                <div className="w-full grid grid-cols-5 gap-2 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        className="w-full bg-primary/20 rounded-t-md"
                        style={{ 
                          height: `${60 + (i * 30)}px`,
                          opacity: 0.4 + (i * 0.15)
                        }}
                      ></div>
                      <div className="text-xs mt-1">Year {Math.round(i * years/4)}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-center text-muted-foreground mt-4">
                  With {formatCurrency(monthlyDeposit)} monthly deposits at {interestRate.toFixed(1)}% interest,<br />
                  compounded {compoundFrequency}, you'll have <strong>{formatCurrency(finalBalance)}</strong> in {years} years.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
