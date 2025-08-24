import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';

interface MenuSectionProps {
  translations: {
    menu: {
      title: string;
      description: string;
      fullMenuTitle: string;
      fullMenuDescription: string;
      downloadButton: string;
    };
  };
}

export const MenuSection = ({ translations }: MenuSectionProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/carta.pdf';
    link.download = 'carta.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="menu" className="py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto section-padding text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-playfair">
            {translations.menu.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translations.menu.description}
          </p>
        </div>

        <Card className="elegant-shadow hover:shadow-xl transition-smooth border-0 max-w-2xl mx-auto">
          <CardContent className="p-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold mb-6 text-primary font-playfair">
                {translations.menu.fullMenuTitle}
              </h3>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {translations.menu.fullMenuDescription}
              </p>

              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-4 text-lg rounded-full gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5" />
                {translations.menu.downloadButton}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};