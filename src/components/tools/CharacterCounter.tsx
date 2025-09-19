import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Hash, Type, List, HardDrive } from "lucide-react";

interface CharacterCounterProps {
  isModal?: boolean;
}

const CharacterCounter = ({ isModal = false }: CharacterCounterProps) => {
  const [text, setText] = useState("");

  // localStorage에서 저장된 텍스트 불러오기
  useEffect(() => {
    const savedText = localStorage.getItem('characterCounter_text');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  // 텍스트 변경 시 localStorage에 저장
  const handleTextChange = (value: string) => {
    setText(value);
    localStorage.setItem('characterCounter_text', value);
  };

  // 바이트 수 계산 (UTF-8 기준)
  const getByteLength = (str: string) => {
    return new Blob([str]).size;
  };

  // 통계 계산
  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    bytes: getByteLength(text),
    words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
    sentences: text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
    paragraphs: text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length,
    lines: text === "" ? 0 : text.split(/\n/).length
  };

  const statItems = [
    { icon: Type, label: "공백 포함 글자수", value: stats.characters, color: "bg-blue-50 text-blue-600" },
    { icon: Hash, label: "공백 제외 글자수", value: stats.charactersNoSpaces, color: "bg-purple-50 text-purple-600" },
    { icon: HardDrive, label: "바이트수", value: stats.bytes, color: "bg-indigo-50 text-indigo-600" },
    { icon: FileText, label: "단어수", value: stats.words, color: "bg-green-50 text-green-600" },
    { icon: List, label: "문장수", value: stats.sentences, color: "bg-orange-50 text-orange-600" },
    { icon: List, label: "줄수", value: stats.lines, color: "bg-cyan-50 text-cyan-600" }
  ];

  return (
    <div className={`${isModal ? 'max-w-full' : 'max-w-6xl mx-auto'} ${isModal ? 'p-0' : 'p-6'} space-y-6`}>
      {!isModal && (
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
            글자수 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">계산기</span>
          </h1>
          <p className="text-muted-foreground">
            텍스트의 글자수, 바이트수, 단어수를 실시간으로 계산합니다.
          </p>
        </div>
      )}

      {/* 통계 카드들 */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="text-center">
              <CardContent className="p-2">
                <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center mx-auto mb-1`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-lg font-bold text-foreground">{item.value.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 텍스트 입력 영역 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            텍스트 입력
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="여기에 텍스트를 입력하세요. 글자수, 단어수, 문장수가 실시간으로 계산됩니다."
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            className="min-h-[300px] resize-none text-base leading-relaxed"
          />

          {/* 하단 요약 정보 */}
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <Badge variant="secondary" className="text-sm">
              공백 포함: {stats.characters.toLocaleString()}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              공백 제외: {stats.charactersNoSpaces.toLocaleString()}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              바이트수: {stats.bytes.toLocaleString()}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              단어수: {stats.words.toLocaleString()}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              문장수: {stats.sentences.toLocaleString()}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              줄수: {stats.lines.toLocaleString()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 추가 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>사용 팁</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• 실시간으로 텍스트 통계가 업데이트됩니다.</p>
          <p>• 단어는 공백으로 구분되며, 문장은 마침표(.), 느낌표(!), 물음표(?)로 구분됩니다.</p>
          <p>• 문단은 빈 줄로 구분됩니다.</p>
          <p>• 블로그 글, 보고서, SNS 게시물 작성 시 글자수 제한 확인에 유용합니다.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterCounter;