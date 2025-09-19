import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ToolsSidebar from "@/components/ToolsSidebar";
import ToolsFloatingSidebar from "@/components/ToolsFloatingSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Code, Palette, FileText, Calculator, Shield, Zap, FileImage } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Tools = () => {
  const developerTools = [
    {
      icon: Code,
      title: "마크다운 미리보기",
      description: "마크다운 문서를 실시간으로 미리보고 HTML로 변환하세요.",
      category: "Developer",
      url: "/tools/markdown-preview"
    },
    // {
    //   icon: Code,
    //   title: "JSON 포맷터 & 검증기",
    //   description: "구문 강조 표시와 오류 감지 기능으로 JSON 데이터를 포맷하고 검증하며 압축할 수 있습니다.",
    //   category: "Developer",
    //   url: "/tools/json-formatter",
    //   featured: true
    // },
    // {
    //   icon: Palette,
    //   title: "컬러 팔레트 생성기",
    //   description: "웹 프로젝트를 위한 조화로운 컬러 팔레트를 생성하고 hex, RGB, HSL 값을 제공합니다.",
    //   category: "Design",
    //   url: "/tools/color-palette"
    // },
    // {
    //   icon: Shield,
    //   title: "비밀번호 생성기",
    //   description: "사용자 정의 가능한 길이와 문자 세트로 안전한 비밀번호를 생성합니다.",
    //   category: "Security",
    //   url: "/tools/password-generator"
    // },
    // {
    //   icon: Zap,
    //   title: "CSS 압축기",
    //   description: "CSS 코드를 압축하고 최적화하여 파일 크기를 줄이고 성능을 향상시킵니다.",
    //   category: "Developer",
    //   url: "/tools/css-minifier"
    // },
    // {
    //   icon: Calculator,
    //   title: "단위 변환기",
    //   description: "길이, 무게, 온도 등 다양한 단위 간 변환을 지원합니다.",
    //   category: "General",
    //   url: "/tools/unit-converter"
    // }
  ];

  const generalTools = [
    {
      icon: FileText,
      title: "글자수 계산기",
      description: "텍스트의 글자수, 단어수, 문장수를 실시간으로 계산합니다.",
      category: "General",
      url: "/tools/character-counter"
    },
    // {
    //   icon: FileText,
    //   title: "텍스트 차이점 검사기",
    //   description: "두 텍스트 문서를 비교하고 차이점을 강조 표시합니다.",
    //   category: "General",
    //   url: "/tools/text-diff"
    // },
    // {
    //   icon: Calculator,
    //   title: "주택담보대출 계산기",
    //   description: "대출의 월 상환금, 이자, 상환 스케줄을 계산합니다.",
    //   category: "Finance",
    //   url: "/tools/mortgage-calculator"
    // },
    {
      icon: Palette,
      title: "QR 코드 생성기",
      description: "URL, 텍스트, 연락처 정보 등을 예쁜 QR 코드로 생성합니다.",
      category: "General",
      url: "/tools/qr-generator"
    },
    {
      icon: FileImage,
      title: "이미지 PDF 변환기",
      description: "여러 이미지를 하나의 PDF 파일로 변환합니다.",
      category: "General",
      url: "/tools/pdf-generator"
    }
  ];

  const allTools = [...developerTools, ...generalTools];
  const categories = ["전체", "일반 도구", "개발 도구"];
  const [activeCategory, setActiveCategory] = useState("전체");

  const getFilteredTools = () => {
    if (activeCategory === "전체") return { general: generalTools, developer: developerTools };
    if (activeCategory === "일반 도구") return { general: generalTools, developer: [] };
    if (activeCategory === "개발 도구") return { general: [], developer: developerTools };
    return { general: [], developer: [] };
  };

  const { general: filteredGeneralTools, developer: filteredDeveloperTools } = getFilteredTools();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Desktop Sidebar + Mobile Floating Sidebar */}
      <div className="flex">
        {/* Desktop Left Sidebar */}
        <ToolsSidebar tools={allTools} />

        {/* Mobile Floating Sidebar */}
        <ToolsFloatingSidebar tools={allTools} />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Hero Section */}
          <section className="bg-gradient-subtle py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Useful <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tools</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              필요한 도구를 자유롭게 활용해보세요.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === activeCategory ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* General Tools */}
      {filteredGeneralTools.length > 0 && (
        <section className="py-16 border-b border-border animate-in fade-in-0 duration-500">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-8 text-center">
              General Tools
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              누구나 유용하게 사용할 수 있는 일상적인 도구들
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGeneralTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="font-display text-lg">{tool.title}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="w-fit">{tool.category}</Badge>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-1 space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                        {tool.description}
                      </p>

                      <Button size="sm" variant="outline" className="w-full mt-auto" asChild>
                        <Link to={tool.url}>
                          Try Now
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Developer Tools */}
      {filteredDeveloperTools.length > 0 && (
        <section className="py-16 animate-in fade-in-0 duration-500">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-8 text-center">
              Developer Tools
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              개발과 프로그래밍 작업을 위한 전문적인 도구들
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeveloperTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="font-display text-lg">{tool.title}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="w-fit">{tool.category}</Badge>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-1 space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                        {tool.description}
                      </p>

                      <Button size="sm" variant="outline" className="w-full mt-auto" asChild>
                        <Link to={tool.url}>
                          Try Now
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Tools;