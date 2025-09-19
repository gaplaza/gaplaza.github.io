import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Download, Palette, Copy, Check } from "lucide-react";
import QRCode from "qrcode";

interface QRGeneratorProps {
  isModal?: boolean;
}

const QRGenerator = ({ isModal = false }: QRGeneratorProps) => {
  const [text, setText] = useState("");
  const [qrDataURL, setQrDataURL] = useState("");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState("256");
  const [errorLevel, setErrorLevel] = useState("M");
  const [copied, setCopied] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // localStorage에서 저장된 텍스트 불러오기
  useEffect(() => {
    const savedText = localStorage.getItem('qrGenerator_text');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  // QR 코드 생성
  useEffect(() => {
    if (text.trim()) {
      generateQR();
      localStorage.setItem('qrGenerator_text', text);
    } else {
      setQrDataURL("");
    }
  }, [text, foregroundColor, backgroundColor, size, errorLevel, selectedEmoji]);

  const generateQR = async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 고해상도 캔버스 생성 (2배 크기)
      const scaleFactor = 2;
      const targetSize = parseInt(size);
      const highResSize = targetSize * scaleFactor;

      // 임시 고해상도 캔버스 생성
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = highResSize;
      tempCanvas.height = highResSize;

      await QRCode.toCanvas(tempCanvas, text, {
        width: highResSize,
        margin: 2,
        color: {
          dark: foregroundColor,
          light: backgroundColor
        },
        errorCorrectionLevel: errorLevel as any
      });

      // 이모티콘 추가 (고해상도)
      if (selectedEmoji) {
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          const centerX = tempCanvas.width / 2;
          const centerY = tempCanvas.height / 2;
          const emojiSize = highResSize * 0.15; // 고해상도 기준 크기

          // 배경 원 그리기
          tempCtx.fillStyle = backgroundColor;
          tempCtx.beginPath();
          tempCtx.arc(centerX, centerY, emojiSize / 1.5, 0, 2 * Math.PI);
          tempCtx.fill();

          // 고품질 이모티콘 렌더링
          tempCtx.font = `${emojiSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", serif`;
          tempCtx.textAlign = 'center';
          tempCtx.textBaseline = 'middle';
          tempCtx.imageSmoothingEnabled = true;
          tempCtx.imageSmoothingQuality = 'high';
          tempCtx.fillText(selectedEmoji, centerX, centerY);
        }
      }

      // 최종 캔버스에 다운스케일링
      canvas.width = targetSize;
      canvas.height = targetSize;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(tempCanvas, 0, 0, highResSize, highResSize, 0, 0, targetSize, targetSize);
      }

      const dataURL = canvas.toDataURL('image/png');
      setQrDataURL(dataURL);
    } catch (error) {
      console.error('QR 코드 생성 오류:', error);
    }
  };

  const downloadQR = () => {
    if (qrDataURL) {
      const link = document.createElement('a');
      link.download = `qrcode-${Date.now()}.png`;
      link.href = qrDataURL;
      link.click();
    }
  };

  const copyToClipboard = async () => {
    if (qrDataURL) {
      try {
        const response = await fetch(qrDataURL);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('클립보드 복사 실패:', error);
      }
    }
  };

  const colorPresets = [
    { name: "클래식", fg: "#000000", bg: "#ffffff" },
    { name: "블루", fg: "#1e40af", bg: "#dbeafe" },
    { name: "그린", fg: "#166534", bg: "#dcfce7" },
    { name: "퍼플", fg: "#7c3aed", bg: "#ede9fe" },
    { name: "핑크", fg: "#ed719e", bg: "#fce7f3" },
    { name: "다크", fg: "#ffffff", bg: "#1f2937" }
  ];

  const emojiOptions = [
    "❤️", "⭐", "✨", "🔥", "💎", "🎯",
    "☕", "🌟", "🚀", "💡", "🎨", "🌈",
    "📱", "💻", "🌐", "📍", "🏠"
  ];

  return (
    <div className={`${isModal ? 'max-w-full' : 'max-w-6xl mx-auto'} ${isModal ? 'p-0' : 'p-6'} space-y-6`}>
      {!isModal && (
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
            QR 코드 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">생성기</span>
          </h1>
          <p className="text-muted-foreground">
            URL, 텍스트, 연락처 정보 등을 예쁜 QR 코드로 변환합니다.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* 입력 및 설정 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR 코드 설정
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 텍스트 입력 */}
            <div>
              <Label htmlFor="qr-text">텍스트 또는 URL</Label>
              <Input
                id="qr-text"
                placeholder="https://example.com 또는 원하는 텍스트를 입력하세요"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* 크기 설정 */}
            <div>
              <Label htmlFor="qr-size">크기</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="128">128x128</SelectItem>
                  <SelectItem value="256">256x256</SelectItem>
                  <SelectItem value="512">512x512</SelectItem>
                  <SelectItem value="1024">1024x1024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 복원력 설정 */}
            <div>
              <Label htmlFor="error-level">복원력 설정</Label>
              <Select value={errorLevel} onValueChange={setErrorLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">낮음 (빠른 스캔)</SelectItem>
                  <SelectItem value="M">보통 (권장)</SelectItem>
                  <SelectItem value="Q">높음 (손상에 강함)</SelectItem>
                  <SelectItem value="H">최고 (매우 안전)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                높을수록 QR 코드가 더러워지거나 일부 손상되어도 읽을 수 있어요
              </p>
            </div>

            {/* 중앙 이모티콘 */}
            <div>
              <Label>중앙 이모티콘 (선택사항)</Label>
              <p className="text-xs text-muted-foreground mb-2">
                QR 코드 중앙에 넣을 이모티콘을 선택하세요
              </p>
              <div className="grid grid-cols-6 gap-2 mt-2 mb-2">
                <Button
                  variant={selectedEmoji === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedEmoji("")}
                  className="h-10 text-xs"
                >
                  없음
                </Button>
                {emojiOptions.map((emoji) => (
                  <Button
                    key={emoji}
                    variant={selectedEmoji === emoji ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedEmoji(emoji)}
                    className="h-10 text-lg"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>

            {/* 색상 프리셋 */}
            <div>
              <Label>색상 프리셋</Label>
              <p className="text-xs text-muted-foreground mb-2">
                빠른 선택 또는 아래에서 직접 색상을 조합하세요
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setForegroundColor(preset.fg);
                      setBackgroundColor(preset.bg);
                    }}
                    className="h-auto p-2 flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-6 h-6 rounded border-2"
                      style={{
                        backgroundColor: preset.bg,
                        borderColor: preset.fg
                      }}
                    >
                      <div
                        className="w-2 h-2 m-1 rounded-sm"
                        style={{ backgroundColor: preset.fg }}
                      />
                    </div>
                    <span className="text-xs">{preset.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* 커스텀 색상 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fg-color">전경색 (QR 코드)</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="fg-color"
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bg-color">배경색 (바탕)</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="bg-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR 코드 미리보기 */}
        <Card className="sticky top-8 self-start">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              미리보기
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center min-h-[300px] bg-muted/20 rounded-lg p-4">
              {text.trim() ? (
                <div className="space-y-4">
                  <canvas
                    ref={canvasRef}
                    className="border rounded-lg shadow-sm mx-auto"
                    style={{
                      width: `${parseInt(size) === 128 ? 128 : parseInt(size) === 256 ? 200 : parseInt(size) === 512 ? 250 : 300}px`,
                      height: `${parseInt(size) === 128 ? 128 : parseInt(size) === 256 ? 200 : parseInt(size) === 512 ? 250 : 300}px`,
                      maxWidth: '100%',
                      imageRendering: 'pixelated'
                    }}
                  />
                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={downloadQR}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      다운로드
                    </Button>
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied ? "복사됨!" : "복사"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>텍스트를 입력하면 QR 코드가 생성됩니다</p>
                </div>
              )}
            </div>

            {text.trim() && (
              <div className="space-y-2">
                <Label>정보</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    크기: {size}x{size}
                  </Badge>
                  <Badge variant="secondary">
                    복원력: {errorLevel === 'L' ? '낮음' : errorLevel === 'M' ? '보통' : errorLevel === 'Q' ? '높음' : '최고'}
                  </Badge>
                  <Badge variant="secondary">
                    길이: {text.length}자
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 사용 팁 */}
      {!isModal && (
        <Card>
          <CardHeader>
            <CardTitle>사용 팁</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• URL, 텍스트, 이메일, 전화번호 등 다양한 정보를 QR 코드로 변환할 수 있습니다.</p>
            <p>• 복원력이 높을수록 QR 코드가 손상되어도 읽을 수 있지만, 코드가 복잡해집니다.</p>
            <p>• 색상을 바꿀 때는 충분한 대비를 유지해야 스캔이 잘 됩니다.</p>
            <p>• 생성된 QR 코드는 PNG 형식으로 다운로드하거나 클립보드에 복사할 수 있습니다.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QRGenerator;