"use client";

import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Line chart would go here in a real implementation
const LineChart = ({ data }: { data: any[] }) => (
  <div className="bg-secondary/10 h-64 rounded-lg p-4 flex items-center justify-center">
    <div className="text-center">
      <div className="text-muted-foreground">
        Investment Growth Chart
      </div>
      <div className="text-xs mt-2">
        Starting: {formatCurrency(data[0]?.value || 0)} →{" "}
        Ending: {formatCurrency(data[data.length - 1]?.value || 0)}
      </div>
    </div>
  </div>
);

// Format currency helper
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Portfolio allocation templates
const portfolioTemplates = {
  conservative: {
    name: "Conservative",
    returns: 4,
    risk: "Low",
    allocation: {
      bonds: 60,
      stocks: 30,
      cash: 10,
    },
  },
  balanced: {
    name: "Balanced",
    returns: 6,
    risk: "Medium",
    allocation: {
      bonds: 40,
      stocks: 50,
      cash: 10,
    },
  },
  growth: {
    name: "Growth",
    returns: 8,
    risk: "Medium-High",
    allocation: {
      bonds: 20,
      stocks: 70,
      cash: 10,
    },
  },
  aggressive: {
    name: "Aggressive",
    returns: 10,
    risk: "High",
    allocation: {
      bonds: 5,
      stocks: 90,
      cash: 5,
    },
  },
};

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [selectedPortfolio, setSelectedPortfolio] = useState("balanced");
  const [inflationRate, setInflationRate] = useState(2.5);
  const [feePercent, setFeePercent] = useState(0.5);

  const [results, setResults] = useState({
    futureValue: 0,
    totalInvested: 0,
    totalReturn: 0,
    inflationAdjusted: 0,
    totalFees: 0,
  });

  const [yearlyData, setYearlyData] = useState<any[]>([]);

  // Update expected return when portfolio changes
  useEffect(() => {
    if (portfolioTemplates[selectedPortfolio as keyof typeof portfolioTemplates]) {
      setExpectedReturn(portfolioTemplates[selectedPortfolio as keyof typeof portfolioTemplates].returns);
    }
  }, [selectedPortfolio]);

  // Calculate investment results
  useEffect(() => {
    calculateInvestment();
  }, [
    initialInvestment,
    monthlyContribution,
    years,
    expectedReturn,
    inflationRate,
    feePercent,
  ]);

  const calculateInvestment = () => {
    // Calculate monthly return rate
    const monthlyReturnRate = expectedReturn / 100 / 12;

    // Calculate monthly fee rate
    const monthlyFeeRate = feePercent / 100 / 12;

    // Calculate inflation rate per month
    const monthlyInflationRate = inflationRate / 100 / 12;

    // Monthly contribution amount
    const monthlyContributionAmount = monthlyContribution;

    // Initialize variables
    let currentValue = initialInvestment;
    let totalContributions = initialInvestment;
    let totalFees = 0;
    let projectionData = [];

    // Generate yearly data
    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        projectionData.push({
          year,
          value: currentValue,
          contributions: totalContributions,
          fees: 0,
        });
        continue;
      }

      // Process 12 months for each year
      for (let month = 1; month <= 12; month++) {
        // Add monthly contribution (except for year 0)
        currentValue += monthlyContributionAmount;
        totalContributions += monthlyContributionAmount;

        // Calculate and deduct fees
        const monthlyFee = currentValue * monthlyFeeRate;
        currentValue -= monthlyFee;
        totalFees += monthlyFee;

        // Add returns
        currentValue += currentValue * monthlyReturnRate;
      }

      projectionData.push({
        year,
        value: currentValue,
        contributions: totalContributions,
        fees: totalFees,
      });
    }

    // Calculate inflation-adjusted value
    const inflationFactor = Math.pow(1 + (inflationRate / 100), years);
    const inflationAdjustedValue = currentValue / inflationFactor;

    // Set results
    setResults({
      futureValue: currentValue,
      totalInvested: totalContributions,
      totalReturn: currentValue - totalContributions,
      inflationAdjusted: inflationAdjustedValue,
      totalFees: totalFees,
    });

    setYearlyData(projectionData);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="initialInvestment">Initial Investment</Label>
                <span className="text-sm font-medium">{formatCurrency(initialInvestment)}</span>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="initialInvestment"
                  min={0}
                  max={100000}
                  step={1000}
                  value={[initialInvestment]}
                  onValueChange={(value) => setInitialInvestment(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                <span className="text-sm font-medium">{formatCurrency(monthlyContribution)}</span>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="monthlyContribution"
                  min={0}
                  max={5000}
                  step={50}
                  value={[monthlyContribution]}
                  onValueChange={(value) => setMonthlyContribution(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="years">Time Period (years)</Label>
                <span className="text-sm font-medium">{years} years</span>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="years"
                  min={1}
                  max={40}
                  step={1}
                  value={[years]}
                  onValueChange={(value) => setYears(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-16"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="portfolioType">Investment Profile</Label>
              <Select
                value={selectedPortfolio}
                onValueChange={setSelectedPortfolio}
              >
                <SelectTrigger id="portfolioType">
                  <SelectValue placeholder="Select portfolio" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(portfolioTemplates).map(([key, portfolio]) => (
                    <SelectItem key={key} value={key}>
                      {portfolio.name} ({portfolio.returns}% return, {portfolio.risk} risk)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Label htmlFor="expectedReturn" className="mr-1">Expected Return</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                          <Info className="h-3 w-3" />
                          <span className="sr-only">Expected return info</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Average annual return before fees and inflation</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm font-medium">{expectedReturn}%</span>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="expectedReturn"
                  min={0}
                  max={15}
                  step={0.1}
                  value={[expectedReturn]}
                  onValueChange={(value) => setExpectedReturn(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-16"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Label htmlFor="inflationRate" className="mr-1">Inflation Rate</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                          <Info className="h-3 w-3" />
                          <span className="sr-only">Inflation rate info</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Average annual inflation rate</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm font-medium">{inflationRate}%</span>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="inflationRate"
                  min={0}
                  max={10}
                  step={0.1}
                  value={[inflationRate]}
                  onValueChange={(value) => setInflationRate(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-16"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Label htmlFor="feePercent" className="mr-1">Annual Fees</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                          <Info className="h-3 w-3" />
                          <span className="sr-only">Fees info</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Annual management fees and expenses</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm font-medium">{feePercent}%</span>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="feePercent"
                  min={0}
                  max={3}
                  step={0.05}
                  value={[feePercent]}
                  onValueChange={(value) => setFeePercent(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={feePercent}
                  onChange={(e) => setFeePercent(Number(e.target.value))}
                  className="w-16"
                />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/20">
              <h3 className="font-medium mb-3">Portfolio Allocation</h3>
              <div className="space-y-3">
                {selectedPortfolio && portfolioTemplates[selectedPortfolio as keyof typeof portfolioTemplates] && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-primary/20 rounded p-2 text-center">
                      <div className="text-xs text-muted-foreground">Stocks</div>
                      <div className="font-medium">{portfolioTemplates[selectedPortfolio as keyof typeof portfolioTemplates].allocation.stocks}%</div>
                    </div>
                    <div className="bg-primary/10 rounded p-2 text-center">
                      <div className="text-xs text-muted-foreground">Bonds</div>
                      <div className="font-medium">{portfolioTemplates[selectedPortfolio as keyof typeof portfolioTemplates].allocation.bonds}%</div>
                    </div>
                    <div className="bg-secondary/20 rounded p-2 text-center">
                      <div className="text-xs text-muted-foreground">Cash</div>
                      <div className="font-medium">{portfolioTemplates[selectedPortfolio as keyof typeof portfolioTemplates].allocation.cash}%</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="pt-6 border-t">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-secondary/20">
            <h4 className="text-sm text-muted-foreground mb-1">Future Value</h4>
            <p className="text-xl font-semibold">{formatCurrency(results.futureValue)}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/20">
            <h4 className="text-sm text-muted-foreground mb-1">Total Invested</h4>
            <p className="text-xl font-semibold">{formatCurrency(results.totalInvested)}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/20">
            <h4 className="text-sm text-muted-foreground mb-1">Investment Growth</h4>
            <p className="text-xl font-semibold">{formatCurrency(results.totalReturn)}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/20">
            <h4 className="text-sm text-muted-foreground mb-1">Inflation-Adjusted</h4>
            <p className="text-xl font-semibold">{formatCurrency(results.inflationAdjusted)}</p>
          </div>
        </div>

        <LineChart data={yearlyData} />
      </div>

      <Button className="w-full">
        Open Investment Account <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
