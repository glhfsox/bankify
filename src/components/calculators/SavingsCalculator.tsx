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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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
  const [chartData, setChartData] = useState<Record<string, unknown>[]>([]);
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
    
    const data = [];
    let balance = initialDeposit;
    let totalDeposits = initialDeposit;
    let yearlyInterest = 0;
    
    // Initial year (year 0)
    data.push({
      year: 0,
      deposits: initialDeposit,
      interest: 0,
      balance: initialDeposit,
    });
    
    // For each year
    for (let year = 1; year <= years; year++) {
      const yearlySavingsData = { 
        year, 
        deposits: 0, 
        interest: 0, 
        balance: 0 
      };
      
      // Calculate for each compound period within the year
      for (let period = 1; period <= compoundsPerYear; period++) {
        // Add monthly deposit
        balance += monthlyDeposit;
        totalDeposits += monthlyDeposit;
        
        // Add interest for this period
        const periodInterest = balance * rate;
        balance += periodInterest;
        yearlyInterest += periodInterest;
      }
      
      yearlySavingsData.deposits = Math.round(totalDeposits);
      yearlySavingsData.interest = Math.round(yearlyInterest);
      yearlySavingsData.balance = Math.round(balance);
      
      data.push(yearlySavingsData);
    }
    
    setChartData(data);
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

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="year" />
                    <YAxis
                      tickFormatter={(value) =>
                        new Intl.NumberFormat("en-US", {
                          notation: "compact",
                          compactDisplay: "short",
                        }).format(value)
                      }
                    />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Bar
                      dataKey="deposits"
                      name="Deposits"
                      stackId="a"
                      fill="#9CA3AF"
                    />
                    <Bar
                      dataKey="interest"
                      name="Interest"
                      stackId="a"
                      fill="#10B981"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
