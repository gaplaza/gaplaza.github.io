import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-subtle py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gaplaz</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            저의 프로젝트, 생각, 도구들을 공유하는 공간입니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/portfolio">
              <Button size="lg" className="w-full sm:w-auto shadow-elegant">
                Explore Portfolio
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link to="/blog">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Read Blog
              </Button>
            </Link>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/gaplaza"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>

            <a
              href="mailto:contact@gaplaz.dev"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;