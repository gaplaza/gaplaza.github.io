import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileImage, Download, Upload, X, FileText, ArrowUp, ArrowDown } from "lucide-react";
import jsPDF from "jspdf";

interface PDFGeneratorProps {
  isModal?: boolean;
}

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

const PDFGenerator = ({ isModal = false }: PDFGeneratorProps) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("portrait");
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_IMAGES = 20;

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const currentCount = images.length;
    const remainingSlots = MAX_IMAGES - currentCount;

    if (remainingSlots <= 0) {
      alert(`최대 ${MAX_IMAGES}장의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    const skippedCount = files.length - filesToProcess.length;

    if (skippedCount > 0) {
      alert(`${MAX_IMAGES}장 제한으로 인해 ${skippedCount}장의 이미지가 제외되었습니다.`);
    }

    filesToProcess.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: ImageFile = {
            file,
            preview: e.target?.result as string,
            id: Date.now() + Math.random().toString()
          };
          setImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newImages.length) {
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
      setImages(newImages);
    }
  };

  const generatePDF = async () => {
    if (images.length === 0) return;

    setIsGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation: orientation as 'portrait' | 'landscape',
        unit: 'mm',
        format: pageSize
      });

      // PDF 메타데이터 설정
      pdf.setProperties({
        title: 'Images to PDF',
        subject: 'Generated PDF from images',
        author: 'Gaplaz Tools',
        creator: 'Gaplaz PDF Generator',
        producer: 'Gaplaz PDF Generator'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const maxWidth = pageWidth - (margin * 2);
      const maxHeight = pageHeight - (margin * 2);

      // 모든 이미지를 순차적으로 처리
      for (let i = 0; i < images.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        // 각 이미지를 Promise로 로드
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            try {
              const imgWidth = img.width;
              const imgHeight = img.height;
              const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);

              const finalWidth = imgWidth * ratio;
              const finalHeight = imgHeight * ratio;
              const x = (pageWidth - finalWidth) / 2;
              const y = (pageHeight - finalHeight) / 2;

              pdf.addImage(images[i].preview, 'JPEG', x, y, finalWidth, finalHeight);
              resolve();
            } catch (error) {
              reject(error);
            }
          };
          img.onerror = () => reject(new Error(`이미지 로드 실패: ${images[i].file.name}`));
          img.src = images[i].preview;
        });
      }

      // 모든 이미지가 처리된 후 PDF 저장
      pdf.save(`images-to-pdf-${Date.now()}.pdf`);
      setIsGenerating(false);
    } catch (error) {
      console.error('PDF 생성 오류:', error);
      setIsGenerating(false);
    }
  };

  const clearAll = () => {
    setImages([]);
  };

  return (
    <div className={`${isModal ? 'max-w-full' : 'max-w-5xl mx-auto'} ${isModal ? 'p-0' : 'p-6'} space-y-6`}>
      {!isModal && (
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
            이미지 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PDF 변환기</span>
          </h1>
          <p className="text-muted-foreground">
            여러 이미지를 하나의 PDF 파일로 변환합니다.
          </p>
        </div>
      )}

      {/* 단계별 진행 방식으로 변경 */}
      <div className="space-y-6">
        {/* 1단계: 이미지 업로드 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <FileImage className="w-5 h-5" />
              이미지 업로드
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDrop={(e) => {
                e.preventDefault();
                handleFileSelect(e.dataTransfer.files);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                클릭하거나 드래그해서 이미지 업로드
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, GIF 지원 (최대 {MAX_IMAGES}장)
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />

            {images.length > 0 && (
              <div className="flex gap-2">
                <Button
                  onClick={clearAll}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  전체 삭제
                </Button>
                <Badge variant="secondary" className="px-3 py-1">
                  {images.length}/{MAX_IMAGES}개
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 2단계: 이미지 미리보기 및 순서 조정 */}
        {images.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <FileText className="w-5 h-5" />
                이미지 순서 조정 ({images.length}/{MAX_IMAGES}개)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {images.map((image, index) => (
                  <div key={image.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{image.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(image.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveImage(index, 'up')}
                        disabled={index === 0}
                        className="h-8 w-8 p-0"
                        title="위로 이동"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </Button>
                      <span className="text-xs text-muted-foreground px-2">
                        {index + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveImage(index, 'down')}
                        disabled={index === images.length - 1}
                        className="h-8 w-8 p-0"
                        title="아래로 이동"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(image.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 3단계: PDF 설정 및 생성 */}
        {images.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                PDF 설정 및 생성
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div>
                  <Label htmlFor="page-size">페이지 크기</Label>
                  <Select value={pageSize} onValueChange={setPageSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4</SelectItem>
                      <SelectItem value="a3">A3</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="orientation">방향</Label>
                  <Select value={orientation} onValueChange={setOrientation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">세로 (Portrait)</SelectItem>
                      <SelectItem value="landscape">가로 (Landscape)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={generatePDF}
                  disabled={images.length === 0 || isGenerating}
                  className="w-full h-10"
                  size="lg"
                >
                  {isGenerating ? (
                    "PDF 생성 중..."
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      PDF 다운로드
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 사용 팁 */}
      {!isModal && (
        <Card>
          <CardHeader>
            <CardTitle>사용 팁</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• 여러 이미지를 선택하거나 드래그 앤 드롭으로 업로드할 수 있습니다.</p>
            <p>• 이미지 순서를 변경하려면 화살표 버튼을 사용하세요.</p>
            <p>• 각 이미지는 페이지 크기에 맞게 자동으로 조정됩니다.</p>
            <p>• 모든 처리는 브라우저에서 이루어지므로 파일이 서버에 업로드되지 않습니다.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PDFGenerator;