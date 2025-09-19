import { useState } from "react";
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

interface ToolsSidebarProps {
  tools: Tool[];
  currentTool?: string;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}

const ToolsSidebar = ({ tools, currentTool, isCollapsed = false, setIsCollapsed }: ToolsSidebarProps) => {

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
    <div className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-24 p-4">
        <Card className="shadow-elegant border-primary/20">
          {/* 헤더 */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base">도구 목록</h3>
                <p className="text-sm text-muted-foreground">빠른 이동</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed?.(!isCollapsed)}
                className="h-8 w-8 p-0"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* 도구 목록 */}
          {!isCollapsed && (
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              <div className="space-y-1">
                {tools.map((tool, index) => {
                  const Icon = tool.icon;
                  const isActive = currentTool === tool.url;

                  return (
                    <Link
                      key={index}
                      to={tool.url}
                      className={`block p-3 rounded-lg transition-all duration-200 hover:bg-accent group ${
                        isActive ? 'bg-primary/10 border border-primary/20' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-primary/20' : 'bg-muted'
                        } transition-colors group-hover:bg-primary/20`}>
                          <Icon className={`w-4 h-4 ${
                            isActive ? 'text-primary' : 'text-muted-foreground'
                          } group-hover:text-primary`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium truncate ${
                            isActive ? 'text-primary' : 'text-foreground'
                          }`}>
                            {tool.title}
                          </div>
                          <Badge
                            variant="secondary"
                            className={`text-xs mt-1 ${getCategoryColor(tool.category)}`}
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

          {/* 접힌 상태 */}
          {isCollapsed && (
            <div className="p-2 space-y-2">
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
                <div className="text-center text-xs text-muted-foreground py-2">
                  +{tools.length - 8}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ToolsSidebar;