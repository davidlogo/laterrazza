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
  translations: {
    reservations: {
      title: string;
      subtitle: string;
      form: {
        title: string;
        name: string;
        namePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        phone: string;
        phonePlaceholder: string;
        guests: string;
        date: string;
        time: string;
        message: string;
        messagePlaceholder: string;
        submit: string;
      };
      success: {
        title: string;
        message: string;
      };
      error: {
        title: string;
        message: string;
      };
      sending: string;
      schedule: {
        mondayToSaturday: string;
        sunday: string;
        timeUpdated: string;
        timeUpdatedMessage: string;
        timeNotAvailable: string;
        weekdaysSchedule: string;
        sundaySchedule: string;
      };
    };
  };
}

export const ReservationSection = ({ translations }: ReservationSectionProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Helper function to replace placeholders in translation strings
  const replacePlaceholders = (text: string, placeholders: Record<string, string>) => {
    return Object.entries(placeholders).reduce((acc, [key, value]) => {
      return acc.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }, text);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: getTodayDate(),
    time: '',
    guests: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate time before submission
    if (!isValidTime(formData.time, formData.date)) {
      const constraints = getTimeConstraints(formData.date);
      const date = new Date(formData.date);
      const isSunday = date.getDay() === 0;
      
      const scheduleMessage = isSunday 
        ? replacePlaceholders(translations.reservations.schedule.sundaySchedule, {
            min: constraints.min,
            max: constraints.max
          })
        : replacePlaceholders(translations.reservations.schedule.weekdaysSchedule, {
            min: constraints.min,
            max: constraints.max
          });
      
      toast({
        title: translations.reservations.schedule.timeNotAvailable,
        description: scheduleMessage,
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // Configuración de EmailJS
      const templateParams = {
        client_name: formData.name,
        client_email: formData.email,
        client_booking_date: formData.date,
        client_booking_time: formData.time,
        client_phone: formData.phone,
        client_guests: formData.guests,
        client_message: formData.message,
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
        date: getTodayDate(),
        time: '',
        guests: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: translations.reservations.error.title,
        description: translations.reservations.error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get min and max time based on selected date
  const getTimeConstraints = (selectedDate: string) => {
    if (!selectedDate) return { min: '12:00', max: '22:00' };
    
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    if (dayOfWeek === 0) { // Sunday
      return { min: '12:00', max: '18:00' };
    } else { // Monday to Saturday
      return { min: '12:00', max: '22:00' };
    }
  };

  // Function to validate time selection
  const isValidTime = (time: string, date: string) => {
    if (!time || !date) return true; // Allow empty values during input
    
    const constraints = getTimeConstraints(date);
    return time >= constraints.min && time <= constraints.max;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // If changing date, validate and potentially clear time
    if (name === 'date') {
      const newFormData = { ...formData, [name]: value };
      
      // Check if current time is still valid for new date
      if (formData.time && !isValidTime(formData.time, value)) {
        newFormData.time = ''; // Clear invalid time
        toast({
          title: translations.reservations.schedule.timeUpdated,
          description: translations.reservations.schedule.timeUpdatedMessage,
          variant: "destructive"
        });
      }
      
      setFormData(newFormData);
    } else if (name === 'time') {
      // Validate time selection
      if (value && formData.date && !isValidTime(value, formData.date)) {
        const constraints = getTimeConstraints(formData.date);
        const date = new Date(formData.date);
        const isSunday = date.getDay() === 0;
        
        const scheduleMessage = isSunday 
          ? replacePlaceholders(translations.reservations.schedule.sundaySchedule, {
              min: constraints.min,
              max: constraints.max
            })
          : replacePlaceholders(translations.reservations.schedule.weekdaysSchedule, {
              min: constraints.min,
              max: constraints.max
            });
        
        toast({
          title: translations.reservations.schedule.timeNotAvailable,
          description: scheduleMessage,
          variant: "destructive"
        });
        return; // Don't update the form data with invalid time
      }
      
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
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
                    min={getTodayDate()}
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
                    min={formData.date ? getTimeConstraints(formData.date).min : '12:00'}
                    max={formData.date ? getTimeConstraints(formData.date).max : '22:00'}
                    required
                  />
                  {formData.date && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(formData.date).getDay() === 0 
                        ? replacePlaceholders(translations.reservations.schedule.sunday, { hours: '12:00 - 18:00' })
                        : replacePlaceholders(translations.reservations.schedule.mondayToSaturday, { hours: '12:00 - 22:00' })
                      }
                    </p>
                  )}
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
                    {translations.reservations.sending}
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