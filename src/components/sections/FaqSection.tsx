"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What features does Bankify offer?",
    answer: "Bankify offers a comprehensive suite of features including transaction monitoring, spending analysis, account balance tracking, bill payment reminders, secure transfers between accounts, and personalized alerts for important financial activities.",
  },
  {
    question: "Is Bankify secure to use for my financial information?",
    answer: "Yes, Bankify employs bank-level security measures including end-to-end encryption, two-factor authentication, and regular security audits to ensure your financial information remains private and protected.",
  },
  {
    question: "Can I link multiple bank accounts to Bankify?",
    answer: "Yes, Bankify allows you to connect and manage multiple bank accounts from different financial institutions in one place, giving you a comprehensive view of your financial situation.",
  },
  {
    question: "Does Bankify support mobile transactions?",
    answer: "Absolutely! Bankify provides a fully responsive experience across all devices, allowing you to manage your finances, track transactions, and make payments seamlessly from your smartphone or tablet.",
  },
  {
    question: "How do I set up my Bankify account?",
    answer: "Setting up a Bankify account is simple. Just visit our website, click on 'Get Started', fill in your basic information, and follow the guided process to link your financial accounts. The entire setup takes only a few minutes.",
  },
  {
    question: "Can I track my spending over time?",
    answer: "Yes, Bankify provides detailed analytics and visualizations that allow you to track your spending patterns over time, categorize expenses, and identify areas where you can optimize your budget.",
  },
];

export default function FaqSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-muted-foreground block mb-3">
            Faq's
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Got questions? We have answers
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
