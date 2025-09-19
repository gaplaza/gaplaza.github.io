import { Card, CardContent } from "@/components/ui/card";
import { Code, BookOpen, Wrench } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: Code,
      title: "Portfolio Showcase",
      description: "Explore my latest development projects, from web applications to mobile solutions and everything in between.",
    },
    {
      icon: BookOpen,
      title: "Personal Blog",
      description: "Thoughts, experiences, and insights from my journey in technology and development.",
    },
    {
      icon: Wrench,
      title: "Useful Tools",
      description: "A collection of handy utilities for both everyday use and development work.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Main Features */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            What You'll Find Here
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            이 곳에서 만나실 수 있는 컨텐츠는 아래와 같습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="shadow-card border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;