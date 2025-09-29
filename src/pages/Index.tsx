import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { MenuSection } from '@/components/MenuSection';
//import { DrinksSection } from '@/components/DrinksSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ReservationSection } from '@/components/ReservationSection';
import { ContactSection } from '@/components/ContactSection';
import { translations } from '@/data/translations';
import { getRestaurantInfo } from '@/utils/places';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const t = translations[currentLanguage as keyof typeof translations];
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    getRestaurantInfo().then(setRestaurantInfo).catch(console.error);
  }, []);

  console.log(restaurantInfo);
  return (
    <div className="min-h-screen">
      <Navigation
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        translations={t}
      />
      <HeroSection translations={t} restaurantInfo={restaurantInfo}/>
      <MenuSection translations={t} />
      {/*<DrinksSection translations={t} />*/}
      <TestimonialsSection translations={t} restaurantInfo={restaurantInfo} />
      <ReservationSection translations={t} />
      <ContactSection translations={t}/>
    </div>
  );
};

export default Index;
