import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, Palette, Grid3X3 } from "lucide-react";

interface Tool {
  title: string;
  url: string;
  icon: any;
}

interface FloatingToolsNavProps {
  currentTool: string;
}

const FloatingToolsNav = ({ currentTool }: FloatingToolsNavProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const tools: Tool[] = [
    {
      title: "글자수 계산기",
      url: "/tools/character-counter",
      icon: FileText
    },
    {
      title: "QR 코드 생성기",
      url: "/tools/qr-generator",
      icon: Palette
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="shadow-elegant border-primary/20 overflow-hidden">
        {isExpanded ? (
          <div className="p-3 min-w-[200px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">도구</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6 p-0"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                const isActive = currentTool === tool.url;

                return (
                  <Link
                    key={index}
                    to={tool.url}
                    className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:bg-accent ${
                      isActive ? 'bg-primary/10 border border-primary/20' : ''
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className={`text-xs font-medium ${
                      isActive ? 'text-primary' : 'text-foreground'
                    }`}>
                      {tool.title}
                    </span>
                  </Link>
                );
              })}
              <Link
                to="/tools"
                className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:bg-accent border-t border-border mt-2 pt-2"
              >
                <Grid3X3 className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">
                  모든 도구
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="h-12 w-12 p-0 rounded-full"
          >
            <Grid3X3 className="h-5 w-5" />
          </Button>
        )}
      </Card>
    </div>
  );
};

export default FloatingToolsNav;