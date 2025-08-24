import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

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

interface TestimonialsSectionProps {
  translations: {
    testimonials: {
      title: string;
      subtitle: string;
      overallRating: {
        excellent: string;
        basedOn: string;
      };
      reviews: Array<{
        name: string;
        rating: number;
        comment: string;
        date: string;
      }>;
    };
  };
  restaurantInfo?: RestaurantInfo;
}

export const TestimonialsSection = ({ translations, restaurantInfo }: TestimonialsSectionProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-primary fill-current' : 'text-muted-foreground'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-playfair">
            {translations.testimonials.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translations.testimonials.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {(restaurantInfo?.reviews || translations.testimonials.reviews).map((review, index: number) => {
            // Handle both Google reviews and fallback translation reviews
            const isGoogleReview = 'author' in review;
            const reviewData = isGoogleReview ? {
              name: review.author,
              rating: review.rating,
              comment: review.text,
              date: review.time
            } : review;

            return (
              <Card key={index} className="elegant-shadow hover:shadow-xl transition-smooth border-0 relative overflow-hidden">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="w-12 h-12 text-primary" />
                  </div>

                  {/* Stars */}
                  <div className="mb-4">
                    {renderStars(reviewData.rating)}
                  </div>

                  {/* Comment */}
                  <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4">
                    "{reviewData.comment}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{reviewData.name}</h4>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">
                        {reviewData.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Overall Rating */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 elegant-shadow">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">
                {restaurantInfo?.rating ? restaurantInfo.rating.toFixed(1) : '4.9'}
              </span>
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => {
                  const rating = restaurantInfo?.rating || 4.9;
                  return (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-current' : 'fill-none'}`} 
                    />
                  );
                })}
              </div>
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">{translations.testimonials.overallRating.excellent}</p>
              <p className="text-sm text-muted-foreground">
                {restaurantInfo?.totalReviews
                  ? `${translations.testimonials.overallRating.basedOn} ${restaurantInfo.totalReviews.toLocaleString()} reviews`
                  : translations.testimonials.overallRating.basedOn
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};