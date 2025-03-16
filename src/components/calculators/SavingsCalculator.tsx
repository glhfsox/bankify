"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnimatedSection } from "@/components/ui/animated-section";

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(1000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(100);
  const [years, setYears] = useState(5);
  const [interestRate, setInterestRate] = useState(2.5);
  const [compoundFrequency, setCompoundFrequency] = useState("monthly");
  const [finalBalance, setFinalBalance] = useState(0);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [chartData, setChartData] = useState<Array<Record<string, unknown>>>([]);

  const calculateSavings = useCallback(() => {
    // Number of compounds per year
    const compoundsPerYear = {
      daily: 365,
      weekly: 52,
      monthly: 12,
      quarterly: 4,
      annually: 1
    }[compoundFrequency];

    // Interest rate per compound period
    const r = interestRate / 100 / compoundsPerYear;
    
    // Total number of compound periods
    const n = compoundsPerYear * years;
    
    // Periods per month for deposits
    const periodsPerMonth = compoundsPerYear / 12;
    
    let balance = initialDeposit;
    const deposits = initialDeposit + (monthlyDeposit * 12 * years);
    const data = [];
    
    const periodsPerYear = compoundsPerYear;
    const monthsPerPeriod = 12 / periodsPerYear;
    
    // For each compound period
    for (let period = 1; period <= n; period++) {
      // Add the monthly contribution (adjusted for compound frequency)
      balance += monthlyDeposit * monthsPerPeriod;
      
      // Apply interest
      const interestForPeriod = balance * r;
      balance += interestForPeriod;
      
      // Record data points for each year
      if (period % periodsPerYear === 0 || period === n) {
        const year = Math.ceil(period / periodsPerYear);
        data.push({
          year,
          balance: Math.round(balance)
        });
      }
    }
    
    setFinalBalance(Math.round(balance));
    setTotalDeposits(deposits);
    setTotalInterest(Math.round(balance - deposits));
    setChartData(data);
  }, [initialDeposit, monthlyDeposit, years, interestRate, compoundFrequency]);

  useEffect(() => {
    calculateSavings();
  }, [initialDeposit, monthlyDeposit, years, interestRate, compoundFrequency, calculateSavings]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: Array<Record<string, unknown>>, label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-3 shadow-lg">
          <p className="font-medium">Year {label}</p>
          <p className="text-sm">Balance: {formatCurrency(Number(payload[0].value))}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <AnimatedSection className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Savings Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="initialDeposit" className="flex items-center">
                    Initial Deposit
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="ml-1 h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">The amount you start with in your savings account.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <span className="text-sm">{formatCurrency(initialDeposit)}</span>
                </div>
                <Slider
                  id="initialDeposit"
                  min={0}
                  max={50000}
                  step={500}
                  value={[initialDeposit]}
                  onValueChange={([value]) => setInitialDeposit(value)}
                />
                <Input
                  type="number"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(Number(e.target.value))}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="monthlyDeposit">Monthly Deposit</Label>
                  <span className="text-sm">{formatCurrency(monthlyDeposit)}</span>
                </div>
                <Slider
                  id="monthlyDeposit"
                  min={0}
                  max={1000}
                  step={50}
                  value={[monthlyDeposit]}
                  onValueChange={([value]) => setMonthlyDeposit(value)}
                />
                <Input
                  type="number"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="years">Time Period (Years)</Label>
                  <span className="text-sm">{years} years</span>
                </div>
                <Slider
                  id="years"
                  min={1}
                  max={30}
                  step={1}
                  value={[years]}
                  onValueChange={([value]) => setYears(value)}
                />
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <span className="text-sm">{interestRate}%</span>
                </div>
                <Slider
                  id="interestRate"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={[interestRate]}
                  onValueChange={([value]) => setInterestRate(value)}
                />
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="compoundFrequency">Compound Frequency</Label>
                <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                  <SelectTrigger id="compoundFrequency">
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

              <div className="pt-4 grid grid-cols-3 gap-4">
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-muted-foreground text-xs">Total Deposited</div>
                  <div className="font-semibold">{formatCurrency(totalDeposits)}</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-muted-foreground text-xs">Interest Earned</div>
                  <div className="font-semibold">{formatCurrency(totalInterest)}</div>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <div className="text-primary text-xs">Final Balance</div>
                  <div className="font-semibold">{formatCurrency(finalBalance)}</div>
                </div>
              </div>
            </div>

            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                  <YAxis tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    name="Savings Balance" 
                    stroke="#3b82f6" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 p-4 bg-secondary/30 rounded-lg text-sm">
            <p>This calculator provides an estimate based on constant interest rates and regular deposits. Actual savings growth 
            may vary based on changing interest rates, deposit frequency, and account terms.</p>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
