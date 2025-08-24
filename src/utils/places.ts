// Simple Google Places API utility with caching
const GOOGLE_PLACES_API_KEY = 'AIzaSyCydIEfUdhfO_8g8FDcUkPacW92HnpSHmA';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

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

export async function getPlaceDetails(placeId: string) {
  // Check cache first
  const cachedData = getFromCache(placeId);
  if (cachedData) {
    console.log('Using cached place data');
    return cachedData;
  }

  // If not in cache, fetch from API
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,formatted_phone_number,formatted_address,opening_hours,website,photos,reviews&key=${GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      // Save to cache before returning
      saveToCache(placeId, data.result);
      console.log('Fetched fresh place data from API');
      return data.result;
    } else {
      console.error('Places API error:', data.status);
      return null;
    }
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