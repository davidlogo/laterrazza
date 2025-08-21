import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Wine } from 'lucide-react';

interface DrinksSectionProps {
  translations: any;
}

export const DrinksSection = ({ translations }: DrinksSectionProps) => {
  return (
    <section id="drinks" className="py-20">
      <div className="max-w-4xl mx-auto section-padding text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-playfair">
            {translations.drinks.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translations.drinks.subtitle}
          </p>
        </div>

        <Card className="elegant-shadow hover:shadow-xl transition-smooth border-0 max-w-2xl mx-auto">
          <CardContent className="p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wine className="w-10 h-10 text-primary" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4 text-primary font-playfair">
                Carta de Bebidas
              </h3>
              
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Explora nuestra cuidada selección de vinos italianos, cafés aromáticos y cócteles artesanales. 
                Cada bebida está elegida para complementar perfectamente nuestros platos.
              </p>

              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-4 text-lg rounded-full gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled
              >
                <Download className="w-5 h-5" />
                {translations.drinks.downloadText}
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                {translations.drinks.comingSoon}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};