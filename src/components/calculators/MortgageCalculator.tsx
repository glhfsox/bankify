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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30); // years
  const [propertyTax, setPropertyTax] = useState(2400);
  const [homeInsurance, setHomeInsurance] = useState(1000);
  const [pmi, setPmi] = useState(0);
  const [includeExpenses, setIncludeExpenses] = useState("yes");

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [principalInterest, setPrincipalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [
    propertyPrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax,
    homeInsurance,
    includeExpenses,
  ]);

  // Update down payment percent when down payment changes
  useEffect(() => {
    const percent = (downPayment / propertyPrice) * 100;
    setDownPaymentPercent(parseFloat(percent.toFixed(1)));

    // Calculate PMI (Private Mortgage Insurance)
    // Typically applied when down payment is less than 20%
    if (downPaymentPercent < 20) {
      // Simple PMI calculation (approximately 0.5-1% of loan amount annually)
      const loanAmount = propertyPrice - downPayment;
      const annualPmi = loanAmount * 0.005;
      setPmi(annualPmi / 12);
    } else {
      setPmi(0);
    }
  }, [downPayment, propertyPrice, downPaymentPercent]);

  // Update down payment when down payment percent changes
  useEffect(() => {
    const dp = (propertyPrice * downPaymentPercent) / 100;
    setDownPayment(parseFloat(dp.toFixed(0)));
  }, [downPaymentPercent, propertyPrice]);

  const calculateMortgage = () => {
    // Calculate loan amount
    const loanAmount = propertyPrice - downPayment;

    // Convert annual interest rate to monthly and decimal form
    const monthlyRate = interestRate / 100 / 12;

    // Calculate loan term in months
    const termMonths = loanTerm * 12;

    // Calculate principal and interest payment
    const piPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);

    let monthlyPay = piPayment;

    // Add property tax, home insurance, and PMI if included
    if (includeExpenses === "yes") {
      const monthlyPropertyTax = propertyTax / 12;
      const monthlyHomeInsurance = homeInsurance / 12;
      monthlyPay = piPayment + monthlyPropertyTax + monthlyHomeInsurance + pmi;
    }

    // Calculate total payment over the life of the loan
    const totalPay = (monthlyPay * termMonths) + downPayment;

    // Calculate total interest paid
    const totalInt = (piPayment * termMonths) - loanAmount;

    setPrincipalInterest(isNaN(piPayment) ? 0 : piPayment);
    setMonthlyPayment(isNaN(monthlyPay) ? 0 : monthlyPay);
    setTotalPayment(isNaN(totalPay) ? 0 : totalPay);
    setTotalInterest(isNaN(totalInt) ? 0 : totalInt);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="propertyPrice">Property Price</Label>
              <span className="text-sm font-medium">{formatCurrency(propertyPrice)}</span>
            </div>
            <div className="flex gap-4 items-center">
              <Slider
                id="propertyPrice"
                min={50000}
                max={2000000}
                step={5000}
                value={[propertyPrice]}
                onValueChange={(value) => setPropertyPrice(value[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-28"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="downPayment">Down Payment</Label>
                <span className="text-sm font-medium">{formatCurrency(downPayment)}</span>
              </div>
              <Input
                id="downPayment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="downPaymentPercent">Down Payment %</Label>
                <span className="text-sm font-medium">{downPaymentPercent}%</span>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="downPaymentPercent"
                  min={0}
                  max={100}
                  step={0.5}
                  value={[downPaymentPercent]}
                  onValueChange={(value) => setDownPaymentPercent(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-16"
                />
              </div>
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

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="loanTerm">Loan Term</Label>
              <span className="text-sm font-medium">{loanTerm} years</span>
            </div>
            <div className="flex gap-4 items-center">
              <Slider
                id="loanTerm"
                min={5}
                max={40}
                step={5}
                value={[loanTerm]}
                onValueChange={(value) => setLoanTerm(value[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-16"
              />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Include in monthly payment</Label>
            <RadioGroup value={includeExpenses} onValueChange={setIncludeExpenses} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="includeYes" />
                <Label htmlFor="includeYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="includeNo" />
                <Label htmlFor="includeNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          {includeExpenses === "yes" && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="propertyTax">Property Tax (yearly)</Label>
                  <span className="text-sm font-medium">{formatCurrency(propertyTax)}</span>
                </div>
                <div className="flex gap-4 items-center">
                  <Slider
                    id="propertyTax"
                    min={0}
                    max={20000}
                    step={100}
                    value={[propertyTax]}
                    onValueChange={(value) => setPropertyTax(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="homeInsurance">Home Insurance (yearly)</Label>
                  <span className="text-sm font-medium">{formatCurrency(homeInsurance)}</span>
                </div>
                <div className="flex gap-4 items-center">
                  <Slider
                    id="homeInsurance"
                    min={0}
                    max={10000}
                    step={100}
                    value={[homeInsurance]}
                    onValueChange={(value) => setHomeInsurance(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
            </>
          )}

          <div className="p-4 rounded-lg bg-primary/5 space-y-3">
            <h3 className="font-medium">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Principal & Interest:</span>
                <span>{formatMoney(principalInterest)}/mo</span>
              </div>
              {includeExpenses === "yes" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Tax:</span>
                    <span>{formatMoney(propertyTax / 12)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Home Insurance:</span>
                    <span>{formatMoney(homeInsurance / 12)}/mo</span>
                  </div>
                  {pmi > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PMI:</span>
                      <span>{formatMoney(pmi)}/mo</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total Monthly Payment:</span>
                <span className="text-primary">{formatMoney(monthlyPayment)}/mo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-secondary/20">
            <h4 className="text-sm text-muted-foreground mb-1">Monthly Payment</h4>
            <p className="text-xl font-semibold">{formatMoney(monthlyPayment)}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/20">
            <h4 className="text-sm text-muted-foreground mb-1">Total Payment</h4>
            <p className="text-xl font-semibold">{formatCurrency(totalPayment)}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/20">
            <h4 className="text-sm text-muted-foreground mb-1">Total Interest</h4>
            <p className="text-xl font-semibold">{formatCurrency(totalInterest)}</p>
          </div>
        </div>
      </div>

      <Button className="w-full mt-4">
        Get Pre-Approved <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
