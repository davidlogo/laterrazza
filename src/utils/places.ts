// Google Places API utility with caching using JavaScript SDK
const GOOGLE_PLACES_API_KEY = 'AIzaSyCydIEfUdhfO_8g8FDcUkPacW92HnpSHmA';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

// Declare global google object
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          PlacesService: new (element: HTMLElement) => GooglePlacesService;
          PlacesServiceStatus: {
            OK: string;
          };
        };
      };
    };
    initGooglePlaces: () => void;
  }
}

interface GooglePlace {
  name: string;
  rating?: number;
  user_ratings_total?: number;
  formatted_phone_number?: string;
  formatted_address?: string;
  website?: string;
  opening_hours?: {
    open_now?: boolean;
  };
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    relative_time_description: string;
  }>;
}

interface GooglePlacesService {
  getDetails(
    request: {
      placeId: string;
      fields: string[];
    },
    callback: (place: GooglePlace | null, status: string) => void
  ): void;
}

interface PlaceDetailsResult {
  name: string;
  rating?: number;
  user_ratings_total?: number;
  formatted_phone_number?: string;
  formatted_address?: string;
  website?: string;
  opening_hours?: {
    open_now?: boolean;
  };
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    relative_time_description: string;
  }>;
}

interface CachedData {
  data: PlaceDetailsResult;
  timestamp: number;
}

// Cache utilities
function getCacheKey(placeId: string): string {
  return `places_${placeId}`;
}

function saveToCache(placeId: string, data: PlaceDetailsResult): void {
  const cacheData: CachedData = {
    data,
    timestamp: Date.now()
  };
  try {
    localStorage.setItem(getCacheKey(placeId), JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Failed to save to cache:', error);
  }
}

function getFromCache(placeId: string): PlaceDetailsResult | null {
  try {
    const cached = localStorage.getItem(getCacheKey(placeId));
    if (!cached) return null;

    const cacheData: CachedData = JSON.parse(cached);
    const isExpired = Date.now() - cacheData.timestamp > CACHE_DURATION;
    
    if (isExpired) {
      localStorage.removeItem(getCacheKey(placeId));
      return null;
    }
    
    return cacheData.data;
  } catch (error) {
    console.warn('Failed to read from cache:', error);
    return null;
  }
}

// Load Google Places API script
function loadGooglePlacesScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        resolve();
      } else {
        reject(new Error('Google Places API failed to load'));
      }
    };
    
    script.onerror = () => reject(new Error('Failed to load Google Places API script'));
    
    document.head.appendChild(script);
  });
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetailsResult | null> {
  // Check cache first
  const cachedData = getFromCache(placeId);
  if (cachedData) {
    console.log('Using cached place data');
    return cachedData;
  }

  try {
    // Load Google Places API if not already loaded
    await loadGooglePlacesScript();

    return new Promise((resolve, reject) => {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      
      const request = {
        placeId: placeId,
        fields: [
          'name', 
          'rating', 
          'user_ratings_total', 
          'formatted_phone_number', 
          'formatted_address', 
          'opening_hours', 
          'website', 
          'reviews'
        ]
      };

      service.getDetails(request, (place: GooglePlace | null, status: string) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          const result: PlaceDetailsResult = {
            name: place.name,
            rating: place.rating,
            user_ratings_total: place.user_ratings_total,
            formatted_phone_number: place.formatted_phone_number,
            formatted_address: place.formatted_address,
            website: place.website,
            opening_hours: place.opening_hours ? {
              open_now: place.opening_hours.open_now
            } : undefined,
            reviews: place.reviews?.map((review) => ({
              author_name: review.author_name,
              rating: review.rating,
              text: review.text,
              relative_time_description: review.relative_time_description
            }))
          };

          // Save to cache before returning
          saveToCache(placeId, result);
          console.log('Fetched fresh place data from Google Places API');
          resolve(result);
        } else {
          console.error('Places API error:', status);
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
}

// Example usage:
export async function getRestaurantInfo() {
  const placeId = 'ChIJ7Sh_0YmjiYURMYlyuSWQ2Ms'; // Replace with your restaurant's Place ID
  const details = await getPlaceDetails(placeId);

  console.log("details", details);

  if (details) {
    return {
      name: details.name,
      rating: details.rating,
      phone: details.formatted_phone_number,
      address: details.formatted_address,
      website: details.website,
      isOpen: details.opening_hours?.open_now,
      totalReviews: details.user_ratings_total, // Total number of reviews
      reviews: details.reviews?.slice(0, 5).map((review) => ({
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.relative_time_description
      }))
    };
  }

  return null;
}

// Utility functions for cache management
export function clearPlaceCache(placeId?: string): void {
  if (placeId) {
    // Clear specific place cache
    localStorage.removeItem(getCacheKey(placeId));
  } else {
    // Clear all places cache
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('places_')) {
        localStorage.removeItem(key);
      }
    });
  }
}

export function getCacheInfo(placeId: string): { cached: boolean; age?: number } {
  try {
    const cached = localStorage.getItem(getCacheKey(placeId));
    if (!cached) return { cached: false };

    const cacheData: CachedData = JSON.parse(cached);
    const age = Date.now() - cacheData.timestamp;

    return {
      cached: true, 
      age: Math.floor(age / 1000 / 60) // age in minutes
    };
  } catch {
    return { cached: false };
  }
}