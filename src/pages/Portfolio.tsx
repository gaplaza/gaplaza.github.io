import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Calendar } from "lucide-react";

const Portfolio = () => {
  // TODO: 실제 프로젝트 데이터로 교체 필요
  const projects = [
    // {
    //   title: "E-Commerce Platform",
    //   description: "Full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
    //   image: "/api/placeholder/400/250",
    //   tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    //   githubUrl: "https://github.com/gaplaza/ecommerce-platform",
    //   liveUrl: "https://demo-ecommerce.gaplaz.dev",
    //   date: "2024-03"
    // },
    // {
    //   title: "Task Management App",
    //   description: "Collaborative project management tool with real-time updates, team collaboration features, and advanced reporting capabilities.",
    //   image: "/api/placeholder/400/250",
    //   tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    //   githubUrl: "https://github.com/gaplaza/task-manager",
    //   liveUrl: "https://tasks.gaplaz.dev",
    //   date: "2024-02"
    // },
    // {
    //   title: "API Documentation Generator",
    //   description: "Automated tool for generating beautiful API documentation from OpenAPI specifications with interactive testing capabilities.",
    //   image: "/api/placeholder/400/250",
    //   tags: ["TypeScript", "Express", "Swagger", "Docker"],
    //   githubUrl: "https://github.com/gaplaza/api-docs-generator",
    //   liveUrl: "https://api-docs.gaplaz.dev",
    //   date: "2024-01"
    // },
    // {
    //   title: "Weather Analytics Dashboard",
    //   description: "Real-time weather data visualization dashboard with predictive analytics and location-based insights using machine learning.",
    //   image: "/api/placeholder/400/250",
    //   tags: ["Python", "React", "D3.js", "Machine Learning"],
    //   githubUrl: "https://github.com/gaplaza/weather-dashboard",
    //   liveUrl: "https://weather.gaplaz.dev",
    //   date: "2023-12"
    // },
    // {
    //   title: "Blockchain Voting System",
    //   description: "Decentralized voting platform ensuring transparency and security using blockchain technology with smart contracts.",
    //   image: "/api/placeholder/400/250",
    //   tags: ["Solidity", "Web3.js", "React", "Ethereum"],
    //   githubUrl: "https://github.com/gaplaza/blockchain-voting",
    //   liveUrl: "https://voting.gaplaz.dev",
    //   date: "2023-11"
    // },
    // {
    //   title: "Code Quality Analyzer",
    //   description: "Static code analysis tool that provides insights into code quality, security vulnerabilities, and performance optimizations.",
    //   image: "/api/placeholder/400/250",
    //   tags: ["Python", "AST", "Static Analysis", "CLI"],
    //   githubUrl: "https://github.com/gaplaza/code-analyzer",
    //   liveUrl: null,
    //   date: "2023-10"
    // }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              여태까지 진행한 프로젝트들을 공유합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 프로젝트 카드들이 여기에 표시될 예정 */}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-display font-bold text-2xl text-muted-foreground">GP</span>
              </div>
              <h3 className="font-display font-bold text-2xl mb-4">
                포트폴리오 준비 중
              </h3>
              <p className="text-muted-foreground mb-8">
                곧 멋진 프로젝트들을 공유할 예정입니다. 조금만 기다려 주세요!
              </p>
              <Button asChild>
                <a href="/tools">
                  도구 페이지 둘러보기
                  <ExternalLink className="w-4 h-4 ml-2" />
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

export default Portfolio;