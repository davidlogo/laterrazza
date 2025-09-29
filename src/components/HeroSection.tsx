import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, Phone } from 'lucide-react';
import heroImage from '@/assets/restaurant-hero.jpg';

interface RestaurantInfo {
  name?: string;
  rating?: number;
  phone?: string;
  address?: string;
  website?: string;
  isOpen?: boolean;
  reviews?: Array<{
    author: string;
    rating: number;
    text: string;
    time: string;
  }>;
  totalReviews?: number;
}

interface HeroSectionProps {
  translations: {
    hero: {
      title: string;
      subtitle: string;
      cta1: string;
      cta2: string;
      reviews: string;
      location: string;
      hours: string;
      premiumExperience: {
        title: string;
        freshIngredients: string;
        panoramicViews: string;
        romanticAmbiance: string;
      };
    };
  };
  restaurantInfo?: RestaurantInfo;
}

export const HeroSection = ({ translations, restaurantInfo }: HeroSectionProps) => {
  const handleReservation = () => {
    window.location.href = 'tel:+50222537922';
  };

  console.log("hero section", restaurantInfo);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-6xl mx-auto section-padding text-white relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => {
                    // Use API rating if available, otherwise use mockup rating of 4.5
                    const rating = restaurantInfo?.rating || 4.5;
                    return (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-current' : 'fill-none'}`} 
                      />
                    );
                  })}
                </div>
                <span className="text-white/80 text-sm">
                  {restaurantInfo?.rating && restaurantInfo?.totalReviews ? (
                    <>
                      {restaurantInfo.rating.toFixed(1)} ({restaurantInfo.totalReviews.toLocaleString()} reviews)
                    </>
                  ) : (
                    // Fallback mockup data when API fails
                    "4.5 (1,247 reviews)"
                  )}
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-in fade-in duration-1000 font-playfair">
                {translations.hero.title}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-xl animate-in fade-in duration-1000 delay-300 leading-relaxed">
                {translations.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in duration-1000 delay-500 mb-8">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300"
              >
                {translations.hero.cta1}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300"
                onClick={handleReservation}
              >
                <Phone className="w-5 h-5 mr-2" />
                {translations.hero.cta2}
              </Button>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{restaurantInfo?.address || translations.hero.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Lun-Sáb: 12:00-22:00, Dom: 12:00-18:00</span>
              </div>
            </div>
          </div>

          {/* Feature Card */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 animate-in fade-in duration-1000 delay-700">
              <h3 className="text-2xl font-bold mb-4 font-playfair">{translations.hero.premiumExperience.title}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{translations.hero.premiumExperience.freshIngredients}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{translations.hero.premiumExperience.panoramicViews}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{translations.hero.premiumExperience.romanticAmbiance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};