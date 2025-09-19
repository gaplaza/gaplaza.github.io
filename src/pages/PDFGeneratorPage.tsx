import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ToolsSidebar from "@/components/ToolsSidebar";
import ToolsFloatingSidebar from "@/components/ToolsFloatingSidebar";
import Breadcrumb from "@/components/Breadcrumb";
import OtherTools from "@/components/OtherTools";
import FloatingToolsNav from "@/components/FloatingToolsNav";
import PDFGenerator from "@/components/tools/PDFGenerator";
import { FileText, Palette, FileImage, Code } from "lucide-react";

const PDFGeneratorPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const allTools = [
    {
      icon: FileText,
      title: "글자수 계산기",
      category: "General",
      url: "/tools/character-counter"
    },
    {
      icon: Palette,
      title: "QR 코드 생성기",
      category: "General",
      url: "/tools/qr-generator"
    },
    {
      icon: FileImage,
      title: "이미지 PDF 변환기",
      category: "General",
      url: "/tools/pdf-generator"
    },
    {
      icon: Code,
      title: "마크다운 미리보기",
      category: "Developer",
      url: "/tools/markdown-preview"
    }
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "이미지 PDF 변환기" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Desktop Sidebar + Mobile Floating Sidebar */}
      <div className="flex">
        {/* Desktop Left Sidebar */}
        <ToolsSidebar
          tools={allTools}
          currentTool="/tools/pdf-generator"
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Mobile Floating Sidebar */}
        <ToolsFloatingSidebar tools={allTools} currentTool="/tools/pdf-generator" />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />

            <div className={`${isSidebarCollapsed ? 'max-w-6xl' : 'max-w-5xl'} mx-auto`}>
              <PDFGenerator />
              <OtherTools currentTool="/tools/pdf-generator" />
            </div>
          </div>

          <Footer />
        </div>
      </div>

      {/* Floating Tools Navigation */}
      <FloatingToolsNav currentTool="/tools/pdf-generator" />
    </div>
  );
};

export default PDFGeneratorPage;