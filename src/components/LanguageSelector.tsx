import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export interface Language {
  code: 'es' | 'it';
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
];

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const LanguageSelector = ({ currentLanguage, onLanguageChange }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 text-white hover:bg-white/10"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{current.flag} {current.name}</span>
        <span className="sm:hidden">{current.flag}</span>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 glass-effect border border-white/20 rounded-lg shadow-lg z-50 min-w-32">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg transition-colors flex items-center gap-2 text-white"
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};