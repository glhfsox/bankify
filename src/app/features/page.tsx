import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export const metadata = {
  title: "Features | Bankify",
  description: "Discover the powerful features that make Bankify the leading banking and finance solution.",
};

const mainFeatures = [
  {
    id: "transaction-monitoring",
    title: "Transaction Monitoring",
    description: "Track and review all your transactions in real-time, with detailed analytics and categorization to help you understand your spending patterns.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 16H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: "https://ext.same-assets.com/3326104566/344829349.png",
  },
  {
    id: "budgeting-tools",
    title: "Budgeting Tools",
    description: "Set and manage budgets for different spending categories, track your progress, and receive notifications when you're approaching your limits.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <path d="M10.5 6H13.5M10.5 10H13.5M6 14H18M6 18H18M8.4 3H15.6C16.9255 3 17.5882 3 18.1176 3.21799C18.5828 3.40973 18.9703 3.79728 19.162 4.26249C19.38 4.79183 19.38 5.45453 19.38 6.78V17.22C19.38 18.5454 19.38 19.2082 19.162 19.7375C18.9703 20.2027 18.5828 20.5903 18.1176 20.782C17.5882 21 16.9255 21 15.6 21H8.4C7.07452 21 6.41178 21 5.88235 20.782C5.41716 20.5903 5.02966 20.2027 4.83799 19.7375C4.62 19.2082 4.62 18.5454 4.62 17.22V6.78C4.62 5.45453 4.62 4.79183 4.83799 4.26249C5.02966 3.79728 5.41716 3.40973 5.88235 3.21799C6.41178 3 7.07452 3 8.4 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: "https://ext.same-assets.com/1459482300/2179784176.jpeg",
  },
  {
    id: "account-management",
    title: "Account Management",
    description: "Connect and manage multiple bank accounts in one place, with a unified dashboard that gives you a comprehensive view of your financial situation.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6.75V12H17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: "https://ext.same-assets.com/767497691/3678082912.jpeg",
  },
  {
    id: "secure-payments",
    title: "Secure Payments",
    description: "Make fast and secure payments to anyone, with advanced encryption and authentication to protect your financial information at all times.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <path d="M9 12L11 14L15 10M20.6179 5.98434C20.4132 5.99472 20.2072 5.99997 20 5.99997C16.9265 5.99997 14.123 4.84453 11.9999 2.94434C9.87691 4.84446 7.07339 5.99985 4 5.99985C3.79277 5.99985 3.58678 5.9946 3.38213 5.98422C3.1327 6.94783 3 7.95842 3 9.00001C3 14.5915 6.82432 19.2898 12 20.622C17.1757 19.2898 21 14.5915 21 9.00001C21 7.95847 20.8673 6.94791 20.6179 5.98434Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: "https://ext.same-assets.com/2640175853/3198953618.jpeg",
  },
];

const additionalFeatures = [
  "Real-time balance updates",
  "Automated savings plans",
  "Bill payment reminders",
  "Expense categorization",
  "Financial goal setting",
  "Investment tracking",
  "Receipt scanning and storage",
  "Financial reports and insights",
  "Tax preparation support",
  "Multi-currency support",
  "Recurring payment management",
  "Custom notifications and alerts"
];

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h1 className="text-sm font-medium text-muted-foreground mb-3">Features</h1>
              <h2 className="text-4xl md:text-5xl font-medium mb-6">
                Powerful tools for your financial journey
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Discover how our comprehensive suite of features can transform your approach to managing finances.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-xl bg-background p-8 shadow-sm">
                <div className="space-y-4">
                  <div className="text-primary w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 18V20M12 18V22M8 18V20M3 14H21M4 10H20C20.5523 10 21 10.4477 21 11V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V11C3 10.4477 3.44772 10 4 10ZM8 10V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V10H8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium">All-in-one banking solution</h3>
                  <p className="text-muted-foreground">
                    Manage all your financial needs in one unified platform. Connect your accounts, track spending, set budgets, and make payments—all in one place.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {additionalFeatures.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://ext.same-assets.com/3110547893/1844224918.svg+xml"
                  alt="Bankify App Dashboard"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-6">
                Core features that make Bankify stand out
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Our platform offers a comprehensive set of tools to help you manage your finances with ease and confidence.
              </p>
            </div>

            <div className="space-y-24">
              {mainFeatures.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
                >
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                    <Button asChild variant="outline" className="rounded-full">
                      <Link href={`/features#${feature.id}`}>Learn more</Link>
                    </Button>
                  </div>

                  <div className="w-full lg:w-1/2">
                    <div className="bg-secondary/50 rounded-xl p-4 shadow-lg">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-6">
                More powerful features to explore
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Beyond our core offerings, Bankify provides a wide range of features to enhance your financial management experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalFeatures.map((feature, index) => (
                <Card key={index} className="shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">{feature}</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Advanced tools that help you stay on top of your finances and make informed decisions.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              Ready to take control of your finances?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied users who have transformed their financial management with Bankify's powerful features.
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link href="/contact">Get Started Today</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
