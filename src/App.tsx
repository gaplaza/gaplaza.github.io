import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";
import CharacterCounterPage from "./pages/CharacterCounterPage";
import QRGeneratorPage from "./pages/QRGeneratorPage";
import PDFGeneratorPage from "./pages/PDFGeneratorPage";
import MarkdownPreviewPage from "./pages/MarkdownPreviewPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/character-counter" element={<CharacterCounterPage />} />
          <Route path="/tools/qr-generator" element={<QRGeneratorPage />} />
          <Route path="/tools/pdf-generator" element={<PDFGeneratorPage />} />
          <Route path="/tools/markdown-preview" element={<MarkdownPreviewPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
