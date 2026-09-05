const PLACES_TEXT_SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';

type SearchRequest = {
  query?: unknown;
  latitude?: unknown;
  longitude?: unknown;
};

type GooglePlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  primaryTypeDisplayName?: { text?: string };
  regularOpeningHours?: { openNow?: boolean };
};

function isCoordinate(value: unknown, minimum: number, maximum: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= minimum && value <= maximum;
}

function distanceInKilometres(
  latitudeA: number,
  longitudeA: number,
  latitudeB: number,
  longitudeB: number,
) {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const earthRadius = 6371;
  const latitudeDelta = toRadians(latitudeB - latitudeA);
  const longitudeDelta = toRadians(longitudeB - longitudeA);
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(latitudeA)) *
      Math.cos(toRadians(latitudeB)) *
      Math.sin(longitudeDelta / 2) ** 2;

  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'Nearby search is being connected. Please try again shortly.' },
      { status: 503 },
    );
  }

  let body: SearchRequest;

  try {
    body = (await request.json()) as SearchRequest;
  } catch {
    return Response.json({ error: 'Please enter a valid search.' }, { status: 400 });
  }

  const query = typeof body.query === 'string' ? body.query.trim().slice(0, 120) : '';
  const latitude = isCoordinate(body.latitude, -90, 90) ? body.latitude : 9.0765;
  const longitude = isCoordinate(body.longitude, -180, 180) ? body.longitude : 7.3986;

  if (query.length < 2) {
    return Response.json({ error: 'Tell Anaiyah what you need nearby.' }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const googleResponse = await fetch(PLACES_TEXT_SEARCH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': [
          'places.id',
          'places.displayName',
          'places.formattedAddress',
          'places.location',
          'places.rating',
          'places.userRatingCount',
          'places.googleMapsUri',
          'places.primaryTypeDisplayName',
          'places.regularOpeningHours.openNow',
        ].join(','),
      },
      body: JSON.stringify({
        textQuery: query,
        maxResultCount: 20,
        includePureServiceAreaBusinesses: true,
        locationBias: {
          circle: {
            center: { latitude, longitude },
            radius: 25000,
          },
        },
      }),
      signal: controller.signal,
    });

    const googlePayload = (await googleResponse.json()) as {
      places?: GooglePlace[];
      error?: { message?: string };
    };

    if (!googleResponse.ok) {
      console.error('Google Places search failed', googleResponse.status, googlePayload.error?.message);
      return Response.json(
        { error: 'Google nearby results are temporarily unavailable. Please try again.' },
        { status: 502 },
      );
    }

    const places = (googlePayload.places ?? [])
      .filter((place) => place.id && place.displayName?.text && place.googleMapsUri)
      .map((place) => {
        const placeLatitude = place.location?.latitude;
        const placeLongitude = place.location?.longitude;
        const distanceKm =
          typeof placeLatitude === 'number' && typeof placeLongitude === 'number'
            ? distanceInKilometres(latitude, longitude, placeLatitude, placeLongitude)
            : null;

        return {
          id: place.id!,
          name: place.displayName!.text!,
          address: place.formattedAddress ?? 'Nearby',
          category: place.primaryTypeDisplayName?.text ?? 'Local service',
          rating: place.rating ?? null,
          userRatingCount: place.userRatingCount ?? 0,
          googleMapsUri: place.googleMapsUri!,
          openNow: place.regularOpeningHours?.openNow ?? null,
          distanceKm,
        };
      })
      .sort((placeA, placeB) => {
        const distanceA = placeA.distanceKm ?? Number.POSITIVE_INFINITY;
        const distanceB = placeB.distanceKm ?? Number.POSITIVE_INFINITY;
        const reviewStrengthA = Math.log10(placeA.userRatingCount + 10) * (placeA.rating ?? 3.5);
        const reviewStrengthB = Math.log10(placeB.userRatingCount + 10) * (placeB.rating ?? 3.5);
        const scoreA = distanceA / Math.max(reviewStrengthA, 1);
        const scoreB = distanceB / Math.max(reviewStrengthB, 1);
        return scoreA - scoreB;
      });

    return Response.json(
      { places },
      { headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'AbortError';
    return Response.json(
      {
        error: timedOut
          ? 'Nearby search took too long. Please try again.'
          : 'We could not reach Google nearby search. Please try again.',
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
