'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Bike,
  BriefcaseBusiness,
  MapPin,
  Search,
  Sparkles,
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

export default function Home() {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('Abuja, Nigeria');

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const need = query.trim();
    setMessage(
      need
        ? `Finding trusted ${need.toLowerCase()} near ${location}…`
        : 'Tell us what you need and we’ll find the closest trusted provider.',
    );
  }

  function useLocation() {
    if (!navigator.geolocation) {
      setMessage('Location is unavailable on this device.');
      return;
    }

    setMessage('Getting your location…');
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocation('Current location');
        setMessage('Location found. What can we help you find?');
      },
      () => setMessage('We could not access your location. You can still search nearby.'),
    );
  }

  return (
    <main className="app-shell min-h-screen overflow-hidden">
      <SiteHeader active="app" />

      <section className="relative flex min-h-[calc(100vh-84px)] flex-col items-center px-5 pb-10 pt-[clamp(4.5rem,14vh,9.5rem)] text-center">
        <div aria-hidden="true" className="ambient ambient-one" />
        <div aria-hidden="true" className="ambient ambient-two" />

        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
          <div className="mb-7 flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/80 px-3.5 py-2 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur">
            <Sparkles className="size-3.5" />
            Your neighbourhood, one request away
          </div>

          <div className="relative mb-14 sm:mb-9">
            <div className="anayah-avatar-ring size-40 sm:size-48">
              <div className="size-full overflow-hidden rounded-full bg-white">
                <img
                  src="/zndux-logo.jpeg"
                  alt="Anayah, your Zndux assistant"
                  className="size-full scale-[1.65] translate-y-[4%] object-cover"
                />
              </div>
            </div>
            <div className="anayah-bubble" role="status">
              Hi, I’m <strong>Anayah.</strong> Zend me.
            </div>
          </div>

          <h1 className="text-balance text-[clamp(2.35rem,7vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950">
            What do you need <span className="gradient-text">nearby?</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
            Find trusted food vendors, artisans, logistics and professional services around you.
          </p>

          <form onSubmit={submitSearch} className="search-surface mt-9 w-full p-2 sm:p-2.5">
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
            <button type="submit" className="search-button" aria-label="Find service">
              <span className="hidden sm:inline">Find service</span>
              <ArrowRight className="size-5" />
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
        </div>

        <div className="relative z-10 mt-auto pt-16 text-xs text-slate-400">
          Connecting people to trusted local services.
        </div>
      </section>
    </main>
  );
}
