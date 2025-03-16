"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [monthlyTaxes, setMonthlyTaxes] = useState(0);
  const [monthlyInsurance, setMonthlyInsurance] = useState(0);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0);

  // Property tax rate (estimated at 1.1% of home value annually)
  const propertyTaxRate = 0.011;
  
  // Home insurance rate (estimated at 0.5% of home value annually)
  const insuranceRate = 0.005;

  const calculateMortgage = useCallback(() => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate principal and interest payment
    let payment;
    if (interestRate === 0) {
      payment = loanAmount / numberOfPayments;
    } else {
      payment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    // Calculate property tax and insurance
    const annualTaxes = homePrice * propertyTaxRate;
    const monthlyTaxPayment = annualTaxes / 12;
    
    const annualInsurance = homePrice * insuranceRate;
    const monthlyInsurancePayment = annualInsurance / 12;
    
    // Total monthly payment (principal, interest, taxes, insurance)
    const total = payment + monthlyTaxPayment + monthlyInsurancePayment;

    setMonthlyPayment(payment);
    setMonthlyTaxes(monthlyTaxPayment);
    setMonthlyInsurance(monthlyInsurancePayment);
    setTotalMonthlyPayment(total);
  }, [homePrice, downPayment, interestRate, loanTerm]);

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm, calculateMortgage]);

  // Keep downPayment and downPaymentPercent in sync
  useEffect(() => {
    const percent = (downPayment / homePrice) * 100;
    setDownPaymentPercent(parseFloat(percent.toFixed(1)));
  }, [downPayment, homePrice]);

  const handleHomePriceChange = (value: string) => {
    const price = parseInt(value.replace(/,/g, ""));
    if (!isNaN(price)) {
      setHomePrice(price);
      // Keep the same downpayment percentage
      setDownPayment(Math.round(price * (downPaymentPercent / 100)));
    } else if (value === "") {
      setHomePrice(0);
      setDownPayment(0);
    }
  };

  const handleDownPaymentChange = (value: string) => {
    const payment = parseInt(value.replace(/,/g, ""));
    if (!isNaN(payment) && payment <= homePrice) {
      setDownPayment(payment);
    } else if (value === "") {
      setDownPayment(0);
    } else if (payment > homePrice) {
      setDownPayment(homePrice);
    }
  };

  const handleDownPaymentPercentChange = (value: number[]) => {
    const percent = value[0];
    setDownPaymentPercent(percent);
    setDownPayment(Math.round(homePrice * (percent / 100)));
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
            Mortgage Calculator
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-5 w-5 ml-2 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Calculate your monthly mortgage payment, including principal,
                    interest, property taxes, and home insurance.
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
                  <Label htmlFor="homePrice">Home Price</Label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(homePrice)}
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                    $
                  </span>
                  <Input
                    id="homePrice"
                    type="text"
                    className="rounded-l-none"
                    value={homePrice.toLocaleString()}
                    onChange={(e) => handleHomePriceChange(e.target.value)}
                  />
                </div>
                <Slider
                  value={[homePrice]}
                  min={50000}
                  max={1000000}
                  step={5000}
                  onValueChange={(value) => setHomePrice(value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="downPayment">Down Payment</Label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(downPayment)} ({downPaymentPercent}%)
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                    $
                  </span>
                  <Input
                    id="downPayment"
                    type="text"
                    className="rounded-l-none"
                    value={downPayment.toLocaleString()}
                    onChange={(e) => handleDownPaymentChange(e.target.value)}
                  />
                </div>
                <Slider
                  value={[downPaymentPercent]}
                  min={0}
                  max={50}
                  step={0.5}
                  onValueChange={handleDownPaymentPercentChange}
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
                  max={10}
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                  <span className="text-sm text-muted-foreground">
                    {loanTerm} years
                  </span>
                </div>
                <Slider
                  id="loanTerm"
                  value={[loanTerm]}
                  min={5}
                  max={30}
                  step={5}
                  onValueChange={(value) => setLoanTerm(value[0])}
                  className="mt-2"
                />
              </div>

              <div className="bg-muted p-4 rounded-lg mt-8">
                <h3 className="font-semibold mb-2">Mortgage Summary</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(homePrice - downPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Principal & Interest:</span>
                    <span className="font-medium">{formatCurrency(monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property Taxes:</span>
                    <span>{formatCurrency(monthlyTaxes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Homeowners Insurance:</span>
                    <span>{formatCurrency(monthlyInsurance)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span>Total Monthly Payment:</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(totalMonthlyPayment)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-[300px] bg-secondary/20 rounded-lg flex flex-col items-center justify-center p-6">
                <p className="text-center text-muted-foreground mb-3">
                  Monthly Payment Breakdown
                </p>
                <div className="w-full rounded-md overflow-hidden mt-4">
                  <div 
                    className="h-10 bg-blue-500 text-white flex items-center px-2 text-xs"
                    style={{ 
                      width: `${(monthlyPayment / totalMonthlyPayment) * 100}%`,
                      minWidth: '60px'
                    }}
                  >
                    Principal & Interest
                  </div>
                  <div className="flex">
                    <div 
                      className="h-10 bg-amber-500 text-white flex items-center px-2 text-xs"
                      style={{ 
                        width: `${(monthlyTaxes / totalMonthlyPayment) * 100}%`,
                        minWidth: '40px'
                      }}
                    >
                      Taxes
                    </div>
                    <div 
                      className="h-10 bg-green-500 text-white flex items-center px-2 text-xs"
                      style={{ 
                        width: `${(monthlyInsurance / totalMonthlyPayment) * 100}%`,
                        minWidth: '40px'
                      }}
                    >
                      Insurance
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Your monthly payment of {formatCurrency(totalMonthlyPayment)} includes
                    principal, interest, property taxes, and insurance.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h3 className="font-medium mb-2">Loan Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Your mortgage of {formatCurrency(homePrice - downPayment)} at {interestRate}% for {loanTerm} years.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total interest paid over the life of the loan: 
                    {formatCurrency((monthlyPayment * loanTerm * 12) - (homePrice - downPayment))}
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h3 className="font-medium mb-2">Mortgage Tips</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>A 20% down payment helps avoid PMI</li>
                    <li>Consider 15-year loans for lower rates</li>
                    <li>Extra payments reduce total interest</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                <h3 className="font-medium mb-2">Affordability Check</h3>
                <p className="text-sm text-muted-foreground">
                  Financial experts recommend your monthly housing costs should not exceed
                  28% of your gross monthly income.
                </p>
                <div className="mt-3">
                  <Label htmlFor="income" className="text-sm">
                    Enter your annual income to check affordability:
                  </Label>
                  <div className="flex mt-1">
                    <span className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                      $
                    </span>
                    <Input id="income" type="text" className="rounded-l-none" placeholder="Annual income" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
