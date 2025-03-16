"use client";

import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Set up your account",
    description: "Create an account quickly and securely to get started. Simply enter your details and link",
  },
  {
    number: "02",
    title: "Track and manage transactions",
    description: "Monitor your transactions in real-time, categorize expenses, and view detailed spending insights",
  },
  {
    number: "03",
    title: "Stay informed and take action",
    description: "Receive personalized alerts, set financial goals, and take action with smart tools",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-muted-foreground block mb-3">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl font-medium">
            How our process ensures a seamless banking experience
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://ext.same-assets.com/504471081/2967820111.webp"
                alt="Banking Experience"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />

              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-3 rounded-lg shadow-lg hidden md:flex items-center space-x-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 9.5L9 15M9 9.5L14.5 15"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-medium">Quick & Easy Process</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="space-y-10">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                      {step.number}
                    </div>
                    {step.number !== "03" && (
                      <div className="h-full w-0.5 bg-primary/20 my-2"></div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
