const PHOTO_NAME_PATTERN = /^places\/[^/]+\/photos\/[^/]+$/;

export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return new Response('Photo service unavailable', { status: 503 });
  }

  const photoName = new URL(request.url).searchParams.get('name') ?? '';

  if (!PHOTO_NAME_PATTERN.test(photoName)) {
    return new Response('Invalid photo', { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const mediaUrl = new URL(`https://places.googleapis.com/v1/${photoName}/media`);
    mediaUrl.searchParams.set('maxWidthPx', '900');
    mediaUrl.searchParams.set('maxHeightPx', '600');
    mediaUrl.searchParams.set('skipHttpRedirect', 'true');

    const response = await fetch(mediaUrl, {
      headers: { 'X-Goog-Api-Key': apiKey },
      signal: controller.signal,
    });
    const payload = (await response.json()) as { photoUri?: string };

    if (!response.ok || !payload.photoUri?.startsWith('https://')) {
      return new Response('Photo unavailable', { status: 404 });
    }

    return Response.redirect(payload.photoUri, 302);
  } catch {
    return new Response('Photo unavailable', { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
