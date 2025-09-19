import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, FileText, Eye } from "lucide-react";
import { marked } from "marked";

interface MarkdownPreviewProps {
  isModal?: boolean;
}

const MarkdownPreview = ({ isModal = false }: MarkdownPreviewProps) => {
  const [markdown, setMarkdown] = useState(`# 마크다운 미리보기

안녕하세요! 이것은 **마크다운 미리보기** 도구입니다.

## 주요 기능

- **실시간 미리보기**: 입력과 동시에 결과 확인
- **구문 강조**: 마크다운 문법 지원
- **복사/다운로드**: 결과물 저장 가능

### 지원하는 문법

1. **제목**: \`# ## ### #### ##### ######\`
2. **강조**: \`**굵게**\`, \`*기울임*\`, \`~~취소선~~\`
3. **링크**: \`[텍스트](URL)\`
4. **이미지**: \`![alt텍스트](이미지URL)\`
5. **코드**: \`\`\`인라인 코드\`\`\` 또는 블록 코드

\`\`\`javascript
// 코드 블록 예시
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### 목록

- 순서 없는 목록
  - 중첩된 항목
  - 또 다른 항목

1. 순서 있는 목록
2. 두 번째 항목
3. 세 번째 항목

### 인용문

> 이것은 인용문입니다.
> 여러 줄로 작성할 수 있습니다.

### 표

| 제목1 | 제목2 | 제목3 |
|-------|-------|-------|
| 내용1 | 내용2 | 내용3 |
| 내용4 | 내용5 | 내용6 |

---

**지금 바로 왼쪽 입력창에서 마크다운을 작성해보세요!**`);

  const [htmlOutput, setHtmlOutput] = useState("");

  // marked 설정
  useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }, []);

  // 마크다운을 HTML로 변환
  useEffect(() => {
    const convertToHtml = async () => {
      try {
        const html = await marked(markdown);
        setHtmlOutput(html);
      } catch (error) {
        console.error("마크다운 변환 오류:", error);
        setHtmlOutput("<p>마크다운 변환 중 오류가 발생했습니다.</p>");
      }
    };

    convertToHtml();
  }, [markdown]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // TODO: 토스트 메시지 추가
      console.log(`${type} 복사 완료`);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setMarkdown("");
  };

  return (
    <div className={`${isModal ? 'max-w-full' : 'max-w-6xl mx-auto'} ${isModal ? 'p-0' : 'p-6'} space-y-6`}>
      {!isModal && (
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
            마크다운 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">미리보기</span>
          </h1>
          <p className="text-muted-foreground">
            마크다운 문서를 실시간으로 미리보고 HTML로 변환하세요.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 마크다운 입력 */}
        <Card>
          <CardHeader className="py-8">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              마크다운 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 justify-end">
              <Button
                onClick={clearAll}
                variant="outline"
                size="sm"
              >
                전체 삭제
              </Button>
              <Button
                onClick={() => copyToClipboard(markdown, "마크다운")}
                variant="outline"
                size="sm"
              >
                <Copy className="w-4 h-4 mr-1" />
                복사
              </Button>
              <Button
                onClick={() => downloadFile(markdown, "document.md", "text/markdown")}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-1" />
                .md 다운로드
              </Button>
            </div>
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="여기에 마크다운을 입력하세요..."
              className="min-h-[600px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* 미리보기 및 HTML 출력 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                출력 결과
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(htmlOutput, "HTML")}
                  variant="outline"
                  size="sm"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  HTML 복사
                </Button>
                <Button
                  onClick={() => downloadFile(htmlOutput, "document.html", "text/html")}
                  variant="outline"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  .html 다운로드
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">미리보기</TabsTrigger>
                <TabsTrigger value="html">HTML 코드</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-4">
                <div
                  className="prose prose-sm max-w-none min-h-[600px] p-4 border border-border rounded-lg overflow-auto bg-background"
                  dangerouslySetInnerHTML={{ __html: htmlOutput }}
                />
              </TabsContent>
              <TabsContent value="html" className="mt-4">
                <Textarea
                  value={htmlOutput}
                  readOnly
                  className="min-h-[600px] font-mono text-sm"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default MarkdownPreview;