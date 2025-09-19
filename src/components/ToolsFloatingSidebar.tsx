import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Tool {
  icon: any;
  title: string;
  category: string;
  url: string;
}

interface ToolsFloatingSidebarProps {
  tools: Tool[];
  currentTool?: string;
}

const ToolsFloatingSidebar = ({ tools, currentTool }: ToolsFloatingSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // 접힌 상태가 기본
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Developer':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Design':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Security':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'General':
        return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Finance':
        return 'bg-pink-50 text-pink-600 border-pink-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="lg:hidden fixed right-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300">
      <Card className={`shadow-elegant border-primary/20 transition-all duration-300 ${
        isCollapsed ? 'w-14' : 'w-72'
      }`}>
        {/* 헤더 */}
        <div className="p-3 border-b border-border flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h3 className="font-semibold text-sm">도구 목록</h3>
              <p className="text-xs text-muted-foreground">빠른 이동</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* 도구 목록 - 펼친 상태 */}
        {!isCollapsed && (
          <div className="p-2 max-h-80 overflow-y-auto">
            <div className="space-y-1">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                const isActive = currentTool === tool.url;

                return (
                  <Link
                    key={index}
                    to={tool.url}
                    className={`block p-2 rounded-lg transition-all duration-200 hover:bg-accent group ${
                      isActive ? 'bg-primary/10 border border-primary/20' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${
                        isActive ? 'bg-primary/20' : 'bg-muted'
                      } transition-colors group-hover:bg-primary/20`}>
                        <Icon className={`w-3 h-3 ${
                          isActive ? 'text-primary' : 'text-muted-foreground'
                        } group-hover:text-primary`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-medium truncate ${
                          isActive ? 'text-primary' : 'text-foreground'
                        }`}>
                          {tool.title}
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-xs mt-0.5 ${getCategoryColor(tool.category)}`}
                        >
                          {tool.category}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* 접힌 상태 - 아이콘들 */}
        {isCollapsed && (
          <div className="p-2 space-y-1">
            {tools.slice(0, 8).map((tool, index) => {
              const Icon = tool.icon;
              const isActive = currentTool === tool.url;

              return (
                <Link
                  key={index}
                  to={tool.url}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:bg-accent ${
                    isActive ? 'bg-primary/10 border border-primary/20' : ''
                  }`}
                  title={tool.title}
                >
                  <Icon className={`w-4 h-4 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  } hover:text-primary`} />
                </Link>
              );
            })}
            {tools.length > 8 && (
              <div className="text-center text-xs text-muted-foreground py-1">
                +{tools.length - 8}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ToolsFloatingSidebar;