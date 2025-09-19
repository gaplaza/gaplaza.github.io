import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  // TODO: 실제 블로그 포스트 데이터로 교체 필요
  const featuredPost = null;
  // {
  //   title: "Building Scalable React Applications: A Complete Guide",
  //   excerpt: "Learn the best practices for architecting large-scale React applications, including state management, component organization, and performance optimization techniques.",
  //   author: "Gaplaz",
  //   date: "2024-03-15",
  //   readTime: "12 min read",
  //   category: "Tutorial",
  //   slug: "building-scalable-react-applications"
  // };

  const blogPosts = [
    // {
    //   title: "Understanding Web Performance Metrics",
    //   excerpt: "A deep dive into Core Web Vitals and how to optimize your website for better user experience and search rankings.",
    //   author: "Gaplaz",
    //   date: "2024-03-10",
    //   readTime: "8 min read",
    //   category: "Performance",
    //   slug: "web-performance-metrics"
    // },
    // {
    //   title: "TypeScript Best Practices for 2024",
    //   excerpt: "Essential TypeScript patterns and techniques that every developer should know to write maintainable code.",
    //   author: "Gaplaz",
    //   date: "2024-03-05",
    //   readTime: "10 min read",
    //   category: "Tutorial",
    //   slug: "typescript-best-practices-2024"
    // },
    // {
    //   title: "Database Design Fundamentals",
    //   excerpt: "Master the principles of database design, normalization, and optimization for modern web applications.",
    //   author: "Gaplaz",
    //   date: "2024-02-28",
    //   readTime: "15 min read",
    //   category: "Database",
    //   slug: "database-design-fundamentals"
    // },
    // {
    //   title: "API Security: Complete Implementation Guide",
    //   excerpt: "Comprehensive guide to securing REST APIs including authentication, authorization, and protection against common vulnerabilities.",
    //   author: "Gaplaz",
    //   date: "2024-02-20",
    //   readTime: "12 min read",
    //   category: "Security",
    //   slug: "api-security-guide"
    // },
    // {
    //   title: "Modern CSS Techniques and Layouts",
    //   excerpt: "Explore advanced CSS features like Grid, Flexbox, and custom properties to create responsive, maintainable stylesheets.",
    //   author: "Gaplaz",
    //   date: "2024-02-15",
    //   readTime: "9 min read",
    //   category: "CSS",
    //   slug: "modern-css-techniques"
    // },
    // {
    //   title: "Docker for JavaScript Developers",
    //   excerpt: "Learn containerization fundamentals and how to effectively use Docker in your JavaScript development workflow.",
    //   author: "Gaplaz",
    //   date: "2024-02-10",
    //   readTime: "11 min read",
    //   category: "DevOps",
    //   slug: "docker-javascript-developers"
    // }
  ];

  const categories = ["All", "Tutorial", "Performance", "Security", "CSS", "Database", "DevOps"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Developer <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              최근 관심있는 것, 공부하고 있는 것들이 올라오는 곳입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Empty State */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {featuredPost || blogPosts.length > 0 ? (
            <div>
              {/* 실제 블로그 포스트들이 여기에 표시될 예정 */}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-display font-bold text-2xl text-muted-foreground">📝</span>
              </div>
              <h3 className="font-display font-bold text-2xl mb-4">
                블로그 준비 중
              </h3>
              <p className="text-muted-foreground mb-8">
                곧 유용한 개발 관련 글들을 공유할 예정입니다. 조금만 기다려 주세요!
              </p>
              <Button asChild>
                <a href="/tools">
                  도구 페이지 둘러보기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;