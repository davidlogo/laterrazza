import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';

interface MenuSectionProps {
  translations: any;
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
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-playfair">
            {translations.menu.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descarga nuestro menú que incluye todos nuestros deliciosos platos tradicionales italianos: 
            entradas, pastas, platos fuertes, ensaladas y pizzas
          </p>
        </div>

        <Card className="elegant-shadow hover:shadow-xl transition-smooth border-0 max-w-3xl mx-auto">
          <CardContent className="p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4 text-primary font-playfair">
                Menú Completo
              </h3>
              
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-foreground">Nuestra Carta Incluye:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>🍽️ Entradas</div>
                  <div>🍝 Pastas</div>
                  <div>🥩 Platos Fuertes</div>
                  <div>🥗 Ensaladas</div>
                  <div>🍕 Pizzas</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-4 text-lg rounded-full gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5" />
                Descargar Menú PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};