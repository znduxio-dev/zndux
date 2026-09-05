'use client';

import { useState } from 'react';
import {
  BadgeCheck,
  Bike,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  LoaderCircle,
  MapPin,
  Navigation,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Utensils,
  Wrench,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';

const quickServices = [
  { label: 'Food', icon: Utensils },
  { label: 'Artisans', icon: Wrench },
  { label: 'Logistics', icon: Bike },
  { label: 'Professionals', icon: BriefcaseBusiness },
];

type NearbyPlace = {
  id: string;
  name: string;
  address: string;
  category: string;
  rating: number | null;
  userRatingCount: number;
  googleMapsUri: string;
  openNow: boolean | null;
  distanceKm: number | null;
};

const defaultCoordinates = { latitude: 9.0765, longitude: 7.3986 };

function resultImage(place: NearbyPlace) {
  const description = `${place.category} ${place.name}`.toLowerCase();
  if (/restaurant|food|cater|bakery|meal|kitchen/.test(description)) return '/services-food.jpg';
  if (/delivery|courier|logistics|transport/.test(description)) return '/services-delivery.jpg';
  if (/repair|plumb|electric|artisan|mechanic|technician/.test(description)) return '/services-artisan.jpg';
  return '/about-find-service.jpg';
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('Abuja, Nigeria');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [resultPage, setResultPage] = useState(0);

  const hasZnduxMatch = /plumb|repair|artisan|handyman|home service/i.test(submittedQuery);
  const totalResults = places.length + (hasZnduxMatch ? 1 : 0);
  const totalPages = Math.max(1, Math.ceil(totalResults / 10));
  const resultStart = resultPage * 10;
  const showZnduxProvider = hasZnduxMatch && resultPage === 0;
  const googleStart = hasZnduxMatch ? Math.max(0, resultStart - 1) : resultStart;
  const visiblePlaces = places.slice(googleStart, googleStart + 10 - (showZnduxProvider ? 1 : 0));

  async function submitSearch(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const need = query.trim();
    if (!need) {
      setMessage('Tell us what you need and we’ll find the closest trusted provider.');
      return;
    }

    setSubmittedQuery(need);
    setResultPage(0);
    setMessage(`Finding trusted ${need.toLowerCase()} near ${location}…`);
    setSearchError('');
    setIsSearching(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: need, ...coordinates }),
      });
      const payload = (await response.json()) as { places?: NearbyPlace[]; error?: string };

      if (!response.ok) throw new Error(payload.error ?? 'Search is unavailable right now.');

      setPlaces(payload.places ?? []);
      const resultCount = (payload.places?.length ?? 0) + (/plumb|repair|artisan|handyman|home service/i.test(need) ? 1 : 0);
      setMessage(
        resultCount
          ? `Found ${resultCount} nearby result${resultCount === 1 ? '' : 's'}.`
          : `No Google listings matched “${need}” nearby. Try a broader search.`,
      );
    } catch (error) {
      setPlaces([]);
      const errorMessage = error instanceof Error ? error.message : 'Search is unavailable right now.';
      setSearchError(errorMessage);
      setMessage('');
    } finally {
      setIsSearching(false);
    }
  }

  function useLocation() {
    if (!navigator.geolocation) {
      setMessage('Location is unavailable on this device.');
      return;
    }

    setMessage('Getting your location…');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocation('Current location');
        setMessage('Location found. What can we help you find?');
      },
      () => setMessage('We could not access your location. You can still search nearby.'),
    );
  }

  return (
    <main className="app-shell min-h-screen overflow-hidden">
      <SiteHeader active="app" />

      <section className={`relative flex min-h-[calc(100vh-84px)] flex-col items-center px-5 pb-10 text-center ${submittedQuery ? 'pt-14 sm:pt-20' : 'pt-[clamp(4.5rem,14vh,9.5rem)]'}`}>
        <div aria-hidden="true" className="ambient ambient-one" />
        <div aria-hidden="true" className="ambient ambient-two" />

        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center">
          <div className="mb-7 flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/80 px-3.5 py-2 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur">
            <Sparkles className="size-3.5" />
            Your neighbourhood, one request away
          </div>

          <div className="relative mb-14 sm:mb-9">
            <div className="anayah-avatar-ring size-40 sm:size-48">
              <div className="size-full overflow-hidden rounded-full bg-white">
                <img
                  src="/zndux-logo.jpeg"
                  alt="Anaiyah, your Zndux assistant"
                  className="size-full scale-[1.65] translate-y-[4%] object-cover"
                />
              </div>
            </div>
            <div className="anayah-chat-cluster" role="status">
              <div className="anayah-bubble">
                <span className="anayah-bubble-message">
                  Hi, I’m <strong>Anaiyah.</strong> Zend me.
                </span>
              </div>
              <span className="anayah-thinking" aria-label="Anaiyah is thinking">
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <i aria-hidden="true" />
              </span>
            </div>
          </div>

          <h1 className="text-balance text-[clamp(2.35rem,7vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950">
            What do you need <span className="gradient-text">nearby?</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
            Find trusted food vendors, artisans, logistics and professional services around you.
          </p>

          <form onSubmit={submitSearch} className="search-surface mt-9 w-full max-w-3xl p-2 sm:p-2.5">
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-4">
              <Search className="size-5 shrink-0 text-slate-400" />
              <label htmlFor="service-search" className="sr-only">
                Search for a nearby service
              </label>
              <input
                id="service-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try ‘plumber’, ‘jollof rice’ or ‘delivery’"
                className="h-12 min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
            <button type="submit" className="search-button" aria-label="Zend me" disabled={isSearching}>
              <span className="hidden sm:inline">{isSearching ? 'Searching…' : 'Zend me'}</span>
              <span aria-hidden="true" className="search-button-avatar">
                {isSearching ? <LoaderCircle className="size-4 animate-spin text-violet-700" /> : <img src="/zndux-logo.jpeg" alt="" />}
              </span>
            </button>
          </form>

          <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-3 text-sm">
            <button onClick={useLocation} className="location-chip" type="button">
              <MapPin className="size-4 text-violet-600" />
              {location}
            </button>
            <span className="hidden text-slate-300 sm:inline">•</span>
            <span className="text-slate-500">Available through web, social and USSD</span>
          </div>

          <p aria-live="polite" className="mt-3 min-h-6 text-sm font-medium text-violet-700">
            {message}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {quickServices.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => setQuery(label)}
                className="quick-service"
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>

          {submittedQuery ? (
            <section className="results-preview mt-12 w-full text-left" aria-label={`Search results for ${submittedQuery}`}>
              <div className="results-toolbar">
                <div>
                  <span className="results-eyebrow">Suggestions for you</span>
                  <h2>Closest matches near {location}</h2>
                  <p>Showing the best mix of proximity, trust and reviews for “{submittedQuery}”.</p>
                </div>
                <button type="button" className="results-filter"><SlidersHorizontal className="size-4" /> Filters</button>
              </div>

              {searchError ? (
                <div className="results-error" role="alert">
                  <strong>Anaiyah couldn’t complete that search.</strong>
                  <span>{searchError}</span>
                </div>
              ) : null}

              <div className="results-grid" aria-busy={isSearching}>
                {isSearching
                  ? Array.from({ length: 4 }, (_, index) => (
                      <div className="result-card result-card-loading" key={index} aria-hidden="true">
                        <span />
                        <div><i /><i /><i /></div>
                      </div>
                    ))
                  : null}

                {!isSearching && showZnduxProvider ? <article className="result-card result-card-featured">
                  <div className="result-image-wrap">
                    <img src="/services-artisan.jpg" alt="Musa from QuickFix Home Services at work" />
                    <span className="result-distance"><Navigation className="size-3" /> 0.8 km</span>
                  </div>
                  <div className="result-card-content">
                    <div className="result-source result-source-zndux"><BadgeCheck className="size-3.5" /> Verified on Zndux</div>
                    <div className="result-title-row">
                      <div>
                        <h3>Musa QuickFix</h3>
                        <p>Plumbing · Repairs · Emergency call-outs</p>
                      </div>
                      <span className="available-dot">Available now</span>
                    </div>
                    <div className="result-meta">
                      <span><Star className="size-4 fill-amber-400 text-amber-400" /> <strong>4.9</strong> (82)</span>
                      <span><Clock3 className="size-4" /> Replies in about 5 mins</span>
                    </div>
                    <p className="result-note">“Fast, tidy and very professional. Fixed the leak on the first visit.”</p>
                    <div className="result-actions">
                      <a href="/providers/musa-quickfix" className="result-secondary-action">View profile</a>
                      <button type="button" className="primary-cta result-primary-action">
                        Zend me
                        <span className="search-button-avatar"><img src="/zndux-logo.jpeg" alt="" /></span>
                      </button>
                    </div>
                  </div>
                </article> : null}

                {!isSearching ? visiblePlaces.map((place) => (
                  <article className="result-card" key={place.id}>
                    <div className="result-image-wrap">
                      <img src={resultImage(place)} alt="" />
                      {place.distanceKm !== null ? (
                        <span className="result-distance"><Navigation className="size-3" /> {place.distanceKm < 1 ? `${Math.round(place.distanceKm * 1000)} m` : `${place.distanceKm.toFixed(1)} km`}</span>
                      ) : null}
                    </div>
                    <div className="result-card-content">
                      <div className="result-source result-source-google"><span className="google-g">G</span> Listed on Google Maps</div>
                      <div className="result-title-row">
                        <div>
                          <h3>{place.name}</h3>
                          <p>{place.category} · {place.address}</p>
                        </div>
                        {place.openNow !== null ? <span className={place.openNow ? 'open-dot' : 'closed-dot'}>{place.openNow ? 'Open now' : 'Closed'}</span> : null}
                      </div>
                      <div className="result-meta">
                        {place.rating !== null ? <span><Star className="size-4 fill-amber-400 text-amber-400" /> <strong>{place.rating.toFixed(1)}</strong> ({place.userRatingCount.toLocaleString()} Google reviews)</span> : <span>New Google listing</span>}
                      </div>
                      <p className="result-note">Business details, hours and reviews are supplied by Google.</p>
                      <div className="result-actions result-actions-google">
                        <a href={place.googleMapsUri} target="_blank" rel="noreferrer" className="primary-cta result-primary-action">
                          Open in Google Maps <ExternalLink className="size-4" />
                        </a>
                      </div>
                    </div>
                  </article>
                )) : null}
              </div>

              {!isSearching && !searchError && totalResults === 0 ? (
                <div className="results-empty">Try a service name such as “plumber”, “restaurant”, “tailor” or “delivery”.</div>
              ) : null}

              {!isSearching && !searchError && totalResults > 10 ? (
                <nav className="results-pagination" aria-label="Search result pages">
                  <button type="button" disabled={resultPage === 0} onClick={() => setResultPage((page) => Math.max(0, page - 1))}>
                    <ChevronLeft className="size-4" /> Previous
                  </button>
                  <span>Page {resultPage + 1} of {totalPages} · {totalResults} results</span>
                  <button type="button" disabled={resultPage >= totalPages - 1} onClick={() => setResultPage((page) => Math.min(totalPages - 1, page + 1))}>
                    Next <ChevronRight className="size-4" />
                  </button>
                </nav>
              ) : null}

              <div className="results-legend">
                <span><BadgeCheck className="size-4 text-violet-600" /> Zndux providers can receive requests directly.</span>
                <span><span className="google-g">G</span> Google Maps listings open directly in Google Maps.</span>
              </div>
            </section>
          ) : null}
        </div>

        <div className="relative z-10 mt-auto pt-16 text-xs text-slate-400">
          Connecting people to trusted local services.
        </div>
      </section>
    </main>
  );
}
