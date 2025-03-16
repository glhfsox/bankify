import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About | Bankify",
  description: "Learn more about Bankify - your trusted partner for banking and financial solutions.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-8">
              <h1 className="text-sm font-medium text-muted-foreground mb-3">About us</h1>
              <h2 className="text-4xl md:text-5xl font-medium mb-6">
                Achieve your financial goals effortlessly with Bankify
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Begin your path to smarter money management with Bankify, designed for effortless tracking and planning.
              </p>
            </div>

            <div className="mt-12 relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://ext.same-assets.com/3777654603/212563925.jpeg"
                alt="Bankify Team"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium mb-6">
                Discover the powerful results that Bankify delivers to users
              </h2>
              <Button asChild variant="default" className="rounded-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Total transaction</h3>
                <p className="text-4xl md:text-5xl font-bold text-primary">$1M+</p>
              </div>

              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Users satisfaction</h3>
                <p className="text-4xl md:text-5xl font-bold text-primary">99%</p>
              </div>

              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Active users</h3>
                <p className="text-4xl md:text-5xl font-bold text-primary">750K</p>
              </div>

              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Saving collected</h3>
                <p className="text-4xl md:text-5xl font-bold text-primary">$10M</p>
              </div>
            </div>

            <div className="mt-16 text-muted-foreground text-center max-w-3xl mx-auto">
              <p className="mb-6">
                We believe managing your finances should be simple, secure, and effective. Our platform is designed to provide you with all the tools you need to track your spending, set savings goals, and optimize your financial decisions, all in one place.
              </p>
              <p>
                Whether you're an individual looking to streamline your budgeting or a business managing multiple accounts, Bankify makes financial management accessible and efficient.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              <div className="w-full lg:w-1/3">
                <h2 className="text-3xl font-medium mb-4">Vision & Goals</h2>
                <h3 className="text-2xl font-medium mb-6">Shaping the future of personal finance</h3>
              </div>

              <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-background rounded-xl p-6 shadow-sm">
                  <h4 className="text-xl font-medium mb-3 text-primary">Financial Independence</h4>
                  <p className="text-muted-foreground">
                    Our vision is to help individuals achieve financial freedom by providing tools that simplify money management, track spending, and optimize savings.
                  </p>
                </div>

                <div className="bg-background rounded-xl p-6 shadow-sm">
                  <h4 className="text-xl font-medium mb-3 text-primary">Financial Clarity</h4>
                  <p className="text-muted-foreground">
                    Bankify aims to bring clarity to personal finances by offering intuitive solutions that enable users to better understand and control their financial situation.
                  </p>
                </div>

                <div className="bg-background rounded-xl p-6 shadow-sm md:col-span-2">
                  <h4 className="text-xl font-medium mb-3 text-primary">Enable Smarter Choices</h4>
                  <p className="text-muted-foreground">
                    Our goal is to make financial management accessible and efficient for everyone, helping users set and reach their financial goals with ease and confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-6">
                Meet the passionate team behind Bankify's success
              </h2>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/team">View All Team</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="aspect-w-3 aspect-h-4 relative">
                  <Image
                    src="https://ext.same-assets.com/2819033009/2961596616.png"
                    alt="Jason Clark"
                    width={400}
                    height={500}
                    className="object-cover w-full h-[280px]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium">Jason Clark</h3>
                  <p className="text-muted-foreground">Marketing Director</p>
                </div>
              </div>

              <div className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="aspect-w-3 aspect-h-4 relative">
                  <Image
                    src="https://ext.same-assets.com/42283417/2715309103.png"
                    alt="Emily Hayes"
                    width={400}
                    height={500}
                    className="object-cover w-full h-[280px]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium">Emily Hayes</h3>
                  <p className="text-muted-foreground">Chief Risk Officer</p>
                </div>
              </div>

              <div className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="aspect-w-3 aspect-h-4 relative">
                  <Image
                    src="https://ext.same-assets.com/3251457275/2287587938.png"
                    alt="Thomas Evans"
                    width={400}
                    height={500}
                    className="object-cover w-full h-[280px]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium">Thomas Evans</h3>
                  <p className="text-muted-foreground">Head of Product Development</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-8">
              Join our mission to empower financial freedom
            </h2>
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link href="/careers">Open positions</Link>
            </Button>

            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="https://ext.same-assets.com/1361898908/850609408.webp"
                  alt="Team Collaboration"
                  width={900}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
