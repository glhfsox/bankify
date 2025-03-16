import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact | Bankify",
  description: "Get in touch with the Bankify team for any questions, support, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-8">
              <h1 className="text-sm font-medium text-muted-foreground mb-3">Contact Us</h1>
              <h2 className="text-4xl md:text-5xl font-medium mb-6">
                Get in touch with our team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have questions about Bankify? Looking to partner with us? Or just want to say hello? We'd love to hear from you!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h3 className="text-2xl font-medium mb-6">Send us a message</h3>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email address" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What is this regarding?" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
                  </div>

                  <Button type="submit" className="rounded-full px-8">
                    Send Message
                  </Button>
                </form>
              </div>

              <div>
                <h3 className="text-2xl font-medium mb-6">Contact information</h3>
                <p className="text-muted-foreground mb-8">
                  If you prefer, you can reach out to us directly using the contact information below.
                </p>

                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardContent className="p-6 flex">
                      <div className="mr-4 bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium mb-1">Email</h4>
                        <p className="text-muted-foreground">support@bankify.com</p>
                        <p className="text-muted-foreground">info@bankify.com</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex">
                      <div className="mr-4 bg-primary/10 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium mb-1">Phone</h4>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-muted-foreground">+1 (555) 987-6543</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex">
                      <div className="mr-4 bg-primary/10 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium mb-1">Address</h4>
                        <p className="text-muted-foreground">
                          123 Finance Street <br />
                          San Francisco, CA 94105 <br />
                          United States
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-10">
                  <h4 className="text-xl font-medium mb-4">Business Hours</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find quick answers to common questions about Bankify.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h4 className="text-xl font-medium mb-3">How quickly will I receive a response?</h4>
                  <p className="text-muted-foreground">
                    We strive to respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h4 className="text-xl font-medium mb-3">Do you offer technical support?</h4>
                  <p className="text-muted-foreground">
                    Yes, we provide 24/7 technical support for all Bankify users. You can reach our technical team via email or phone.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h4 className="text-xl font-medium mb-3">Can I schedule a demo?</h4>
                  <p className="text-muted-foreground">
                    Absolutely! We'd be happy to walk you through Bankify's features. Simply fill out the contact form and mention your interest in a demo.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h4 className="text-xl font-medium mb-3">How do I report an issue?</h4>
                  <p className="text-muted-foreground">
                    You can report any issues through our contact form or by emailing support@bankify.com with details of the problem you're experiencing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
