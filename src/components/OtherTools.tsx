import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Palette } from "lucide-react";

interface Tool {
  title: string;
  description: string;
  url: string;
  icon: any;
  category: string;
}

interface OtherToolsProps {
  currentTool: string;
}

const OtherTools = ({ currentTool }: OtherToolsProps) => {
  const tools: Tool[] = [
    {
      title: "글자수 계산기",
      description: "텍스트의 글자수, 단어수, 문장수를 실시간으로 계산합니다.",
      url: "/tools/character-counter",
      icon: FileText,
      category: "General"
    },
    {
      title: "QR 코드 생성기",
      description: "URL, 텍스트, 연락처 정보 등을 예쁜 QR 코드로 생성합니다.",
      url: "/tools/qr-generator",
      icon: Palette,
      category: "General"
    }
  ];

  const otherTools = tools.filter(tool => tool.url !== currentTool);

  if (otherTools.length === 0) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">다른 도구들</CardTitle>
        <p className="text-sm text-muted-foreground">
          더 많은 유용한 도구들을 확인해보세요
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {otherTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link
                key={index}
                to={tool.url}
                className="group block p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-accent transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {tool.description}
                    </p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          to="/tools"
          className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors mt-4"
        >
          <span>모든 도구 보기</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default OtherTools;