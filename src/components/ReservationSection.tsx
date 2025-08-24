import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, Phone, Mail, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '@/config/emailjs';

interface ReservationSectionProps {
  translations: any;
}

export const ReservationSection = ({ translations }: ReservationSectionProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Configuración de EmailJS
      const templateParams = {
        to_email: 'davidlogo9525@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        guests: formData.guests,
        date: formData.date,
        time: formData.time,
        message: formData.message,
        reply_to: formData.email
      };

      // Enviar email usando EmailJS
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );

      toast({
        title: translations.reservations.success.title,
        description: translations.reservations.success.message,
      });
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error al enviar",
        description: "Hubo un problema al enviar la reserva. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="reservations" className="py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {translations.reservations.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translations.reservations.subtitle}
          </p>
        </div>

        <Card className="elegant-shadow border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">
              {translations.reservations.form.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Users size={16} />
                    {translations.reservations.form.name}
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={translations.reservations.form.namePlaceholder}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail size={16} />
                    {translations.reservations.form.email}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={translations.reservations.form.emailPlaceholder}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Phone size={16} />
                    {translations.reservations.form.phone}
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={translations.reservations.form.phonePlaceholder}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Users size={16} />
                    {translations.reservations.form.guests}
                  </label>
                  <Input
                    name="guests"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.guests}
                    onChange={handleInputChange}
                    placeholder="2"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar size={16} />
                    {translations.reservations.form.date}
                  </label>
                  <Input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock size={16} />
                    {translations.reservations.form.time}
                  </label>
                  <Input
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {translations.reservations.form.message}
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={translations.reservations.form.messagePlaceholder}
                  rows={4}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  translations.reservations.form.submit
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};