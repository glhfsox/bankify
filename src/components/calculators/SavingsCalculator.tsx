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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [interestRate, setInterestRate] = useState(5);
  const [years, setYears] = useState(10);
  const [compoundFrequency, setCompoundFrequency] = useState("monthly");
  const [taxRate, setTaxRate] = useState(25);
  const [includeTax, setIncludeTax] = useState(false);

  const [futureValue, setFutureValue] = useState(0);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [afterTaxAmount, setAfterTaxAmount] = useState(0);
  const [yearlyResults, setYearlyResults] = useState<any[]>([]);

  useEffect(() => {
    calculateSavings();
  }, [
    initialDeposit,
    monthlyContribution,
    interestRate,
    years,
    compoundFrequency,
    taxRate,
    includeTax,
  ]);

  const calculateSavings = () => {
    // Determine number of compounds per year
    const compoundsPerYear = getCompoundsPerYear(compoundFrequency);

    // Monthly contribution to match compounding period
    const contributionPerPeriod =
      compoundFrequency === "annually" ? monthlyContribution * 12 :
      compoundFrequency === "semi-annually" ? monthlyContribution * 6 :
      compoundFrequency === "quarterly" ? monthlyContribution * 3 :
      compoundFrequency === "monthly" ? monthlyContribution :
      compoundFrequency === "daily" ? (monthlyContribution * 12) / 365 : monthlyContribution;

    // Total number of compounding periods
    const periods = years * compoundsPerYear;

    // Interest rate per period
    const ratePerPeriod = interestRate / 100 / compoundsPerYear;

    let cumulativeValue = initialDeposit;
    let yearlyData = [];

    // Calculate year-by-year growth
    for (let year = 1; year <= years; year++) {
      const periodsThisYear = compoundsPerYear;

      for (let period = 0; period < periodsThisYear; period++) {
        // Add interest
        cumulativeValue += cumulativeValue * ratePerPeriod;

        // Add contribution (except for the initial deposit)
        if (year > 1 || period > 0) {
          cumulativeValue += contributionPerPeriod;
        }
      }

      yearlyData.push({
        year,
        value: cumulativeValue,
      });
    }

    // Calculate total deposits
    const totalDepositsAmount = initialDeposit + (monthlyContribution * 12 * years);

    // Calculate interest earned
    const interestEarnedAmount = cumulativeValue - totalDepositsAmount;

    // Calculate after-tax amount if tax is considered
    const taxAmount = includeTax ? interestEarnedAmount * (taxRate / 100) : 0;
    const afterTaxValue = cumulativeValue - taxAmount;

    setFutureValue(cumulativeValue);
    setTotalDeposits(totalDepositsAmount);
    setInterestEarned(interestEarnedAmount);
    setAfterTaxAmount(afterTaxValue);
    setYearlyResults(yearlyData);
  };

  const getCompoundsPerYear = (frequency: string) => {
    switch (frequency) {
      case "annually": return 1;
      case "semi-annually": return 2;
      case "quarterly": return 4;
      case "monthly": return 12;
      case "daily": return 365;
      default: return 12;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="initialDeposit">Initial Deposit</Label>
            <span className="text-sm font-medium">{formatCurrency(initialDeposit)}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Slider
              id="initialDeposit"
              min={0}
              max={50000}
              step={100}
              value={[initialDeposit]}
              onValueChange={(value) => setInitialDeposit(value[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(Number(e.target.value))}
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
                    <p>Annual interest rate</p>
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
              max={15}
              step={0.1}
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-16"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="years">Time Period (years)</Label>
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
            <Label htmlFor="compoundFrequency">Compound Frequency</Label>
            <Select
              value={compoundFrequency}
              onValueChange={setCompoundFrequency}
            >
              <SelectTrigger id="compoundFrequency">
                <SelectValue placeholder="Compound Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annually">Annually</SelectItem>
                <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="includeTax"
            checked={includeTax}
            onChange={(e) => setIncludeTax(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="includeTax" className="text-sm font-medium">
            Include Tax on Interest Earnings
          </Label>
        </div>

        {includeTax && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="taxRate">Tax Rate</Label>
              <span className="text-sm font-medium">{taxRate}%</span>
            </div>
            <div className="flex gap-4 items-center">
              <Slider
                id="taxRate"
                min={0}
                max={50}
                step={1}
                value={[taxRate]}
                onValueChange={(value) => setTaxRate(value[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-16"
              />
            </div>
          </div>
        )}
      </div>

      <div className="pt-6 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-secondary/20">
            <h4 className="text-sm text-muted-foreground mb-1">Future Value</h4>
            <p className="text-xl font-semibold">{formatCurrency(futureValue)}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/20">
            <h4 className="text-sm text-muted-foreground mb-1">Total Deposits</h4>
            <p className="text-xl font-semibold">{formatCurrency(totalDeposits)}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/20">
            <h4 className="text-sm text-muted-foreground mb-1">Interest Earned</h4>
            <p className="text-xl font-semibold">{formatCurrency(interestEarned)}</p>
          </div>
          {includeTax && (
            <div className="p-4 rounded-lg bg-secondary/20">
              <h4 className="text-sm text-muted-foreground mb-1">After-Tax Amount</h4>
              <p className="text-xl font-semibold">{formatCurrency(afterTaxAmount)}</p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 border-t">
        <h3 className="font-medium mb-4">Year-by-Year Projection</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {yearlyResults.map((item) => (
            <div key={item.year} className="flex justify-between p-2 rounded-md hover:bg-secondary/10">
              <span>Year {item.year}</span>
              <span className="font-medium">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full">
        Open Savings Account <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
