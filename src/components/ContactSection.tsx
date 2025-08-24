import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';

interface ContactSectionProps {
  translations: {
    contact: {
      title: string;
      subtitle: string;
      address: {
        title: string;
        content: string;
      };
      phone: {
        title: string;
        content: string;
      };
      email: {
        title: string;
        content: string;
      };
      hours: {
        title: string;
        content: string;
      };
      social: {
        title: string;
      };
      map: string;
    };
  };
}

export const ContactSection = ({ translations }: ContactSectionProps) => {
  const contactInfo = [
    {
      icon: MapPin,
      title: translations.contact.address.title,
      content: translations.contact.address.content
    },
    {
      icon: Phone,
      title: translations.contact.phone.title,
      content: translations.contact.phone.content
    },
    {
      icon: Mail,
      title: translations.contact.email.title,
      content: translations.contact.email.content
    },
    {
      icon: Clock,
      title: translations.contact.hours.title,
      content: translations.contact.hours.content
    }
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/laterrazzaitaly.gt?igsh=c3QwdHpzb3p5cmJy", 
      name: "Instagram" 
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {translations.contact.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translations.contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {contactInfo.map((item, index) => (
            <Card key={index} className="text-center elegant-shadow hover:shadow-xl transition-smooth border-0">
              <CardContent className="p-6">
                <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm whitespace-pre-line">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            {translations.contact.social.title}
          </h3>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center transition-smooth hover:scale-110"
                aria-label={social.name}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <Card className="elegant-shadow border-0 overflow-hidden">
            <div className="h-80 bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.1983093675276!2d-90.52060230000001!3d14.587773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a389d17f28ed%3A0xcbd89025b9728931!2sLa%20Terrazza%20Italiana!5e0!3m2!1ses-419!2sco!4v1756071144891!5m2!1ses-419!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={translations.contact.map}
              ></iframe>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};