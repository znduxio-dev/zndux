const PLACES_AUTOCOMPLETE_URL = 'https://places.googleapis.com/v1/places:autocomplete';

type LocationRequest = {
  action?: unknown;
  input?: unknown;
  placeId?: unknown;
  latitude?: unknown;
  longitude?: unknown;
};

function isCoordinate(value: unknown, minimum: number, maximum: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= minimum && value <= maximum;
}

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return Response.json({ error: 'Location search is unavailable right now.' }, { status: 503 });
  }

  let body: LocationRequest;
  try {
    body = (await request.json()) as LocationRequest;
  } catch {
    return Response.json({ error: 'Enter a valid location.' }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    if (body.action === 'suggest') {
      const input = typeof body.input === 'string' ? body.input.trim().slice(0, 100) : '';
      if (input.length < 2) return Response.json({ suggestions: [] });

      const latitude = isCoordinate(body.latitude, -90, 90) ? body.latitude : 9.0765;
      const longitude = isCoordinate(body.longitude, -180, 180) ? body.longitude : 7.3986;
      const response = await fetch(PLACES_AUTOCOMPLETE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'suggestions.placePrediction.placeId,suggestions.placePrediction.text',
        },
        body: JSON.stringify({
          input,
          includedRegionCodes: ['ng'],
          locationBias: {
            circle: {
              center: { latitude, longitude },
              radius: 50000,
            },
          },
        }),
        signal: controller.signal,
      });
      const payload = (await response.json()) as {
        suggestions?: Array<{ placePrediction?: { placeId?: string; text?: { text?: string } } }>;
      };

      if (!response.ok) {
        return Response.json({ error: 'Location suggestions are temporarily unavailable.' }, { status: 502 });
      }

      const suggestions = (payload.suggestions ?? [])
        .map((suggestion) => suggestion.placePrediction)
        .filter((prediction) => prediction?.placeId && prediction.text?.text)
        .slice(0, 6)
        .map((prediction) => ({ id: prediction!.placeId!, label: prediction!.text!.text! }));

      return Response.json({ suggestions }, { headers: { 'Cache-Control': 'private, no-store' } });
    }

    if (body.action === 'resolve') {
      const placeId = typeof body.placeId === 'string' ? body.placeId : '';
      if (!/^[A-Za-z0-9_-]+$/.test(placeId)) {
        return Response.json({ error: 'Choose a valid suggested location.' }, { status: 400 });
      }

      const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'id,displayName,formattedAddress,location',
        },
        signal: controller.signal,
      });
      const place = (await response.json()) as {
        displayName?: { text?: string };
        formattedAddress?: string;
        location?: { latitude?: number; longitude?: number };
      };

      if (
        !response.ok ||
        typeof place.location?.latitude !== 'number' ||
        typeof place.location.longitude !== 'number'
      ) {
        return Response.json({ error: 'We could not use that location.' }, { status: 502 });
      }

      return Response.json(
        {
          location: {
            label: place.displayName?.text ?? place.formattedAddress ?? 'Selected location',
            address: place.formattedAddress ?? null,
            latitude: place.location.latitude,
            longitude: place.location.longitude,
          },
        },
        { headers: { 'Cache-Control': 'private, no-store' } },
      );
    }

    return Response.json({ error: 'Invalid location request.' }, { status: 400 });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'AbortError';
    return Response.json(
      { error: timedOut ? 'Location search took too long. Try again.' : 'Location search is unavailable.' },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
