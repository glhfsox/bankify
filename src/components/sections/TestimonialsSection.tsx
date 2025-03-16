"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Lena",
    testimonial: "Bankify transformed my banking experience with its intuitive design and powerful features. It's a game-changer for managing finances—highly recommend!",
    rating: 5,
    avatarSrc: "https://ext.same-assets.com/2093765451/242134178.svg+xml",
  },
  {
    name: "John Carter",
    testimonial: "Bankify has simplified my financial management. It's easy to use and extremely efficient!",
    rating: 5,
    avatarSrc: "",
  },
  {
    name: "Emily Davis",
    testimonial: "The intuitive design of Bankify has saved me so much time. It's perfect for managing transactions.",
    rating: 5,
    avatarSrc: "https://ext.same-assets.com/2093765451/242134178.svg+xml",
  },
  {
    name: "Michael Brown",
    testimonial: "Bankify's features are exactly what I needed. It's made managing my finances smoother and more organized.",
    rating: 5,
    avatarSrc: "https://ext.same-assets.com/2093765451/242134178.svg+xml",
  },
  {
    name: "Sarah Thompson",
    testimonial: "I've tried many tools, but Bankify stands out for its seamless interface",
    rating: 5,
    avatarSrc: "https://ext.same-assets.com/2093765451/242134178.svg+xml",
  },
  {
    name: "David Lee",
    testimonial: "Bankify is a must-have for anyone serious about managing their finances. It's both powerful and user-friendly.",
    rating: 5,
    avatarSrc: "",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-sm font-medium text-muted-foreground block mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Hear directly from our satisfied clients and users
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-sm h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <Avatar className="w-10 h-10 mr-3">
                    {testimonial.avatarSrc ? (
                      <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                    ) : null}
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{testimonial.name}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 flex-grow">
                  "{testimonial.testimonial}"
                </p>

                <div className="flex">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-yellow-500"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-primary text-white p-12 rounded-2xl text-center relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-md">
            <svg width="32" height="32" viewBox="0 0 24 24" className="text-primary">
              <path
                d="M19.9201 9.45C19.4201 4.96 15.9901 2.06 12.0001 2C8.01006 2.06 4.58006 4.96 4.08006 9.45C4.03006 9.89 4.06006 10.34 4.15006 10.77L5.26006 15.57C5.58006 16.79 6.71006 17.61 8.00006 17.59H16.0001C17.2901 17.61 18.4201 16.79 18.7401 15.57L19.8501 10.77C19.9401 10.34 19.9701 9.89 19.9201 9.45Z"
                fill="currentColor"
              />
              <path
                d="M16.6601 20.44C16.4501 21.34 15.6501 22 14.7301 22H9.27009C8.35009 22 7.55009 21.34 7.34009 20.44L7.00009 19H17.0001L16.6601 20.44Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-medium mb-8">
            I explored the banking features, and these tools are outstanding! Worth every investment.
          </h3>
          <div className="text-sm font-medium">
            Artem Pashchenko and Piotr Kharashkevich
          </div>
        </div>
      </div>
    </section>
  );
}
