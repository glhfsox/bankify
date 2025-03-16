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
  LineChart,
  Line,
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

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(7);
  const [investmentType, setInvestmentType] = useState("balanced");
  const [chartData, setChartData] = useState<Record<string, unknown>[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const riskProfiles = {
    conservative: { color: "#4CAF50", range: "3-5%" },
    balanced: { color: "#2196F3", range: "5-8%" },
    aggressive: { color: "#F44336", range: "8-12%" },
  };

  const calculateInvestment = useCallback(() => {
    let monthlyRate = interestRate / 100 / 12;
    let months = years * 12;
    let totalContrib = initialInvestment;
    
    const data = [];
    let currentValue = initialInvestment;

    for (let year = 0; year <= years; year++) {
      // If it's not the starting year, calculate growth
      if (year > 0) {
        // Calculate 12 months of growth
        for (let month = 0; month < 12; month++) {
          currentValue = currentValue * (1 + monthlyRate) + monthlyContribution;
          if (year < years || month === 11) {
            totalContrib += monthlyContribution;
          }
        }
      }

      // Push yearly data point
      data.push({
        year,
        value: Math.round(currentValue),
        contributions: year === 0 ? initialInvestment : Math.round(totalContrib),
      });
    }

    // Calculate our final statistics
    const totalInvested = totalContrib;
    const finalValue = Math.round(currentValue);
    const totalInterestEarned = finalValue - totalInvested;

    setChartData(data);
    setTotalContributions(totalInvested);
    setTotalInterest(totalInterestEarned);
    setFinalAmount(finalValue);
  }, [initialInvestment, monthlyContribution, years, interestRate]);

  // Update calculations when inputs change
  useEffect(() => {
    calculateInvestment();
  }, [initialInvestment, monthlyContribution, years, interestRate, calculateInvestment]);

  // Update interest rate when investment type changes
  useEffect(() => {
    switch (investmentType) {
      case "conservative":
        setInterestRate(4);
        break;
      case "balanced":
        setInterestRate(7);
        break;
      case "aggressive":
        setInterestRate(10);
        break;
      default:
        setInterestRate(7);
    }
  }, [investmentType]);

  const handleInitialInvestmentChange = (value: string) => {
    const amount = parseInt(value.replace(/,/g, ""));
    if (!isNaN(amount)) {
      setInitialInvestment(amount);
    } else if (value === "") {
      setInitialInvestment(0);
    }
  };

  const handleMonthlyContributionChange = (value: string) => {
    const amount = parseInt(value.replace(/,/g, ""));
    if (!isNaN(amount)) {
      setMonthlyContribution(amount);
    } else if (value === "") {
      setMonthlyContribution(0);
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
            Investment Calculator
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-5 w-5 ml-2 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Calculate potential investment growth based on initial
                    investment, monthly contributions, and expected rate of
                    return.
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
                  <Label htmlFor="initialInvestment">Initial Investment</Label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(initialInvestment)}
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                    $
                  </span>
                  <Input
                    id="initialInvestment"
                    type="text"
                    className="rounded-l-none"
                    value={initialInvestment.toLocaleString()}
                    onChange={(e) => handleInitialInvestmentChange(e.target.value)}
                  />
                </div>
                <Slider
                  value={[initialInvestment]}
                  min={0}
                  max={100000}
                  step={1000}
                  onValueChange={(value) => setInitialInvestment(value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="monthlyContribution">
                    Monthly Contribution
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(monthlyContribution)}
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                    $
                  </span>
                  <Input
                    id="monthlyContribution"
                    type="text"
                    className="rounded-l-none"
                    value={monthlyContribution.toLocaleString()}
                    onChange={(e) =>
                      handleMonthlyContributionChange(e.target.value)
                    }
                  />
                </div>
                <Slider
                  value={[monthlyContribution]}
                  min={0}
                  max={2000}
                  step={50}
                  onValueChange={(value) => setMonthlyContribution(value[0])}
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
                  max={40}
                  step={1}
                  onValueChange={(value) => setYears(value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="investmentType">Investment Profile</Label>
                <Select
                  value={investmentType}
                  onValueChange={setInvestmentType}
                >
                  <SelectTrigger id="investmentType" className="mt-2">
                    <SelectValue placeholder="Select investment profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">
                      Conservative ({riskProfiles.conservative.range})
                    </SelectItem>
                    <SelectItem value="balanced">
                      Balanced ({riskProfiles.balanced.range})
                    </SelectItem>
                    <SelectItem value="aggressive">
                      Aggressive ({riskProfiles.aggressive.range})
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="interestRate">
                    Expected Annual Return (%)
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {interestRate}%
                  </span>
                </div>
                <Slider
                  id="interestRate"
                  value={[interestRate]}
                  min={1}
                  max={15}
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Projection Summary</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <span>Total Contributions:</span>
                    <span className="font-medium">
                      {formatCurrency(totalContributions)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest Earned:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span>Final Amount:</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(finalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                      dataKey="year"
                      label={{
                        value: "Years",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
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
                    <Line
                      type="monotone"
                      dataKey="contributions"
                      name="Contributions"
                      stroke="#9CA3AF"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Total Value"
                      stroke={riskProfiles[investmentType as keyof typeof riskProfiles].color}
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
