import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface NavigationProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  translations: any;
}

export const Navigation = ({ currentLanguage, onLanguageChange, translations }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'menu', href: '#menu' },
    { key: 'drinks', href: '#drinks' },
    { key: 'reservations', href: '#reservations' },
    { key: 'contact', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/20">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="font-playfair text-2xl font-bold text-white bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            La Terraza Italiana
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-white bg-black/20 px-3 py-2 rounded-md hover:bg-primary/80 transition-smooth font-medium backdrop-blur-sm"
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
                className="block py-2 text-white hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
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