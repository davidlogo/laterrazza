import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface NavigationProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  translations: {
    nav: {
      menu: string;
      reservations: string;
      contact: string;
      location: string;
    };
  };
}

export const Navigation = ({ currentLanguage, onLanguageChange, translations }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'menu', href: '#menu' },
    { key: 'reservations', href: '#reservations' },
    { key: 'contact', href: '#contact' },
    { key: 'location', href: '#contact' }
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar height

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }

    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 w-full z-50 glass-effect border-b border-white/20">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex items-center justify-between h-16 bg-black/20">
          {/* Logo */}
          <div className="font-playfair text-2xl font-bold text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            La Terraza Italiana
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-white px-3 py-2 rounded-md hover:bg-primary/80 transition-smooth font-medium backdrop-blur-sm cursor-pointer"
              >
                {translations.nav[item.key]}
              </a>
            ))}
          </div>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center gap-4">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block py-2 text-white hover:text-primary transition-smooth cursor-pointer"
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {translations.nav[item.key]}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};