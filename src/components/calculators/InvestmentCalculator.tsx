"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnimatedSection } from "@/components/ui/animated-section";

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(7);
  const [investmentType, setInvestmentType] = useState("balanced");
  const [projectionData, setProjectionData] = useState<Array<Record<string, unknown>>>([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);

  const riskProfiles = {
    conservative: { min: 3, max: 5, default: 4, color: "#4ade80" }, // Green
    balanced: { min: 5, max: 9, default: 7, color: "#3b82f6" }, // Blue
    aggressive: { min: 8, max: 12, default: 10, color: "#ef4444" } // Red
  };

  const calculateInvestment = useCallback(() => {
    let balance = initialInvestment;
    let totalContributions = initialInvestment;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;
    
    const data = [];
    
    // Calculate values for each year
    for (let year = 1; year <= years; year++) {
      let yearlyContributions = 0;
      
      // Process each month in the year
      for (let month = 1; month <= 12; month++) {
        if (year === 1 && month === 1) continue; // Skip first month as we already have initial investment
        
        yearlyContributions += monthlyContribution;
        balance += monthlyContribution;
        balance *= (1 + monthlyRate);
      }
      
      totalContributions += yearlyContributions;
      
      data.push({
        year,
        balance: Math.round(balance),
        contributions: totalContributions,
        interest: Math.round(balance - totalContributions)
      });
    }
    
    setTotalInvested(Math.round(totalContributions));
    setTotalInterest(Math.round(balance - totalContributions));
    setFinalBalance(Math.round(balance));
    setProjectionData(data);
  }, [initialInvestment, monthlyContribution, interestRate, years]);

  // Set interest rate when investment type changes
  useEffect(() => {
    const profile = riskProfiles[investmentType as keyof typeof riskProfiles];
    setInterestRate(profile.default);
  }, [investmentType]);

  // Recalculate when any input changes
  useEffect(() => {
    calculateInvestment();
  }, [initialInvestment, monthlyContribution, years, interestRate, calculateInvestment]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: any[], label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-3 shadow-lg">
          <p className="font-medium">Year {label}</p>
          <p className="text-sm">Balance: {formatCurrency(payload[0].value)}</p>
          <p className="text-sm">Contributions: {formatCurrency(payload[1].value)}</p>
          <p className="text-sm">Interest: {formatCurrency(payload[2].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <AnimatedSection className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Investment Calculator</span>
            <Select value={investmentType} onValueChange={setInvestmentType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Risk profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="initialInvestment" className="flex items-center">
                    Initial Investment
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="ml-1 h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">The amount you start with.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <span className="text-sm">{formatCurrency(initialInvestment)}</span>
                </div>
                <Slider
                  id="initialInvestment"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={[initialInvestment]}
                  onValueChange={([value]) => setInitialInvestment(value)}
                />
                <Input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                  <span className="text-sm">{formatCurrency(monthlyContribution)}</span>
                </div>
                <Slider
                  id="monthlyContribution"
                  min={0}
                  max={2000}
                  step={50}
                  value={[monthlyContribution]}
                  onValueChange={([value]) => setMonthlyContribution(value)}
                />
                <Input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="years">Investment Period (Years)</Label>
                  <span className="text-sm">{years} years</span>
                </div>
                <Slider
                  id="years"
                  min={1}
                  max={40}
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
                  <Label htmlFor="interestRate">Annual Return Rate (%)</Label>
                  <span className="text-sm">{interestRate}%</span>
                </div>
                <Slider
                  id="interestRate"
                  min={riskProfiles[investmentType as keyof typeof riskProfiles].min}
                  max={riskProfiles[investmentType as keyof typeof riskProfiles].max}
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

              <div className="pt-4 grid grid-cols-3 gap-4">
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-muted-foreground text-xs">Total Invested</div>
                  <div className="font-semibold">{formatCurrency(totalInvested)}</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-muted-foreground text-xs">Total Interest</div>
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
                <BarChart
                  data={projectionData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="balance" name="Balance" fill={riskProfiles[investmentType as keyof typeof riskProfiles].color} />
                  <Bar dataKey="contributions" name="Contributions" fill="#94a3b8" />
                  <Bar dataKey="interest" name="Interest" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 p-4 bg-secondary/30 rounded-lg text-sm">
            <p>This calculator provides an estimate of potential investment growth and does not guarantee actual returns. 
            Investment performance depends on various factors including market conditions, fees, and more. For personalized advice, consult a financial advisor.</p>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
