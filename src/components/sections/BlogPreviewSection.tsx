"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    title: "The importance of financial planning and how to create",
    date: "Dec 19, 2024",
    type: "Article",
    image: "https://ext.same-assets.com/2819033009/2961596616.png",
    slug: "the-importance-of-financial-planning-and-how-to-create",
  },
  {
    title: "The basics of investing and why it's important for you",
    date: "Dec 13, 2024",
    type: "News",
    image: "https://ext.same-assets.com/1334640187/3565345367.jpeg",
    slug: "the-basics-of-investing-and-why-it-s-important-for-you",
  },
  {
    title: "The power of budgeting and how to make it",
    date: "Dec 13, 2024",
    type: "News",
    image: "https://ext.same-assets.com/1896764883/1830082065.jpeg",
    slug: "the-power-of-budgeting-and-how-to-make-it",
  },
];

export default function BlogPreviewSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-muted-foreground block mb-3">
            Blogs
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Explore our expert articles and insights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden shadow-sm border hover:shadow-md transition-shadow h-full">
              <Link href={`/blogs/${post.slug}`} className="block h-full">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="object-cover w-full h-48"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-3">
                    <span className="inline-block text-xs font-medium bg-secondary rounded-full px-2.5 py-1">
                      {post.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
