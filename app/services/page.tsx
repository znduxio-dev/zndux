'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  Clock3,
  FileCheck2,
  HeartPulse,
  House,
  MapPin,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Utensils,
  Wrench,
} from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const services = [
  { name: 'Food & catering', description: 'Restaurants, home chefs, bakers and caterers.', icon: Utensils, tone: 'service-plum' },
  { name: 'Home repairs', description: 'Plumbers, electricians, AC technicians and more.', icon: Wrench, tone: 'service-orange' },
  { name: 'Delivery & logistics', description: 'Fast local dispatch, pickup and delivery.', icon: Bike, tone: 'service-blue' },
  { name: 'Beauty & grooming', description: 'Barbers, stylists, makeup artists and spas.', icon: Scissors, tone: 'service-pink' },
  { name: 'Cleaning', description: 'Home, office and specialist cleaning services.', icon: House, tone: 'service-green' },
  { name: 'Professional help', description: 'Consultants, technicians and skilled specialists.', icon: BriefcaseBusiness, tone: 'service-indigo' },
  { name: 'Health & wellness', description: 'Pharmacies, therapists and wellness providers.', icon: HeartPulse, tone: 'service-red' },
  { name: 'Shops & essentials', description: 'Everyday products from businesses close to you.', icon: ShoppingBag, tone: 'service-gold' },
];

export default function ServicesPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-[#fcfbfe]">
      <SiteHeader active="services" />

      <section className="px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="section-kicker">
                <Sparkles className="size-4" />
                Explore services
              </div>
              <h1 className="page-heading mt-6">
                The right help, <span className="gradient-text">right around you.</span>
              </h1>
              <p className="page-intro mt-6">
                From lunch to an urgent repair, Zndux helps you discover trusted local providers without the usual runaround.
              </p>
            </div>

            <figure className="services-hero-visual">
              <Image
                src="/services-hero.jpg"
                alt="A colourful selection of food, fashion, repair, technology and shopping services available through Zndux"
                width={1400}
                height={1400}
                sizes="(min-width: 1024px) 44vw, 100vw"
                priority
              />
            </figure>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ name, description, icon: Icon, tone }) => (
              <a key={name} href={`/?service=${encodeURIComponent(name)}`} className="service-card group">
                <span className={`service-icon ${tone}`}><Icon className="size-6" /></span>
                <h2>{name}</h2>
                <p>{description}</p>
                <span className="service-card-link">
                  Find providers <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>

          <div className="services-showcase-heading">
            <span>Everyday requests, made simpler</span>
            <p>Ask through a familiar channel and connect with the local service you need.</p>
          </div>

          <div className="services-showcase" aria-label="Examples of services available through Zndux">
            {[
              ['/services-food.jpg', 'Order from a local food vendor'],
              ['/services-delivery.jpg', 'Arrange pickup and delivery'],
              ['/services-artisan.jpg', 'Reach a skilled artisan nearby'],
            ].map(([src, caption]) => (
              <figure key={caption} className="services-showcase-card">
                <Image
                  src={src}
                  alt={caption}
                  width={1100}
                  height={1100}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17121d] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">How it works</span>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A shorter path from need to done.</h2>
              <figure className="services-channel-visual">
                <Image
                  src="/zndux-how-it-works-banner.jpg"
                  alt="Zndux banner featuring local shoppers and the Zndux brand"
                  width={3000}
                  height={1000}
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />
              </figure>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {[
                ['01', 'Tell us what you need', 'Search in plain language—just like asking someone nearby.'],
                ['02', 'See trusted options', 'Compare relevant providers closest to your location.'],
                ['03', 'Connect your way', 'Reach the provider through the channel that works for you.'],
              ].map(([number, title, copy]) => (
                <li key={number} className="process-card">
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="provider-profile" className="provider-journey-section px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="provider-journey-heading">
            <div>
              <span className="section-kicker"><BadgeCheck className="size-4" /> Zndux provider profile</span>
              <h2>From local talent to a profile people trust.</h2>
            </div>
            <p>A provider gives Zndux the details customers need to decide confidently. Anaiyah turns those details into a clear, searchable profile.</p>
          </div>

          <div className="provider-journey-grid">
            <ol className="provider-profile-steps">
              {[
                ['01', 'Create your identity', 'Add your name, service category, contact details and a friendly profile photo.', Camera],
                ['02', 'Set your service area', 'Choose where you work, how far you travel and when customers can reach you.', MapPin],
                ['03', 'Show your work', 'Add services, starting prices, work photos and the way you prefer to receive requests.', FileCheck2],
                ['04', 'Verify and go live', 'Zndux reviews your details, adds your trust badge and makes you discoverable nearby.', ShieldCheck],
              ].map(([number, title, copy, Icon]) => (
                <li key={number as string}>
                  <span className="provider-step-number">{number as string}</span>
                  <span className="provider-step-icon"><Icon className="size-5" /></span>
                  <div><h3>{title as string}</h3><p>{copy as string}</p></div>
                </li>
              ))}
            </ol>

            <div className="provider-profile-demo">
              <div className="provider-demo-topline">
                <span>Customer view</span>
                <span className="provider-live-pill"><span /> Profile live</span>
              </div>
              <div className="provider-demo-cover">
                <img src="/services-artisan.jpg" alt="Musa from QuickFix Home Services" />
                <div className="provider-demo-avatar">MQ</div>
              </div>
              <div className="provider-demo-body">
                <div className="provider-demo-title">
                  <div><h3>Musa QuickFix <BadgeCheck className="size-5" /></h3><p>Plumbing and home repairs</p></div>
                  <span>0.8 km</span>
                </div>
                <div className="provider-demo-stats">
                  <span><Star className="size-4 fill-amber-400 text-amber-400" /><strong>4.9</strong><small>82 reviews</small></span>
                  <span><Clock3 className="size-4 text-violet-600" /><strong>~5 min</strong><small>response time</small></span>
                  <span><CheckCircle2 className="size-4 text-emerald-600" /><strong>126</strong><small>jobs completed</small></span>
                </div>
                <p className="provider-demo-bio">Reliable plumbing and general home repairs across Wuse, Maitama and nearby areas. Available for scheduled and urgent call-outs.</p>
                <div className="provider-demo-tags"><span>Leak repairs</span><span>Installations</span><span>Emergency visits</span></div>
                <button type="button" className="primary-cta provider-demo-cta">
                  Zend Musa
                  <span className="search-button-avatar"><img src="/zndux-logo.jpeg" alt="" /></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="provider-panel mx-auto grid max-w-7xl gap-12 p-7 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
          <div>
            <span className="section-kicker">For service providers</span>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Be found when your neighbourhood needs you.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">
              Join Zndux to reach nearby customers, build your reputation and grow your business through verified local demand.
            </p>
            <ul className="mt-8 grid gap-4 text-sm font-semibold text-slate-700">
              {['Get discovered by customers nearby', 'Showcase your services and availability', 'Build trust through community reviews'].map((item) => (
                <li key={item} className="flex items-center gap-3"><CheckCircle2 className="size-5 text-violet-600" />{item}</li>
              ))}
            </ul>
          </div>

          {submitted ? (
            <div className="flex min-h-96 flex-col items-center justify-center rounded-[1.5rem] border border-violet-100 bg-white p-8 text-center shadow-sm">
              <span className="grid size-14 place-items-center rounded-full bg-violet-100 text-violet-700"><CheckCircle2 className="size-7" /></span>
              <h3 className="mt-5 text-2xl font-semibold text-slate-950">You’re on the early provider list.</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">We’ll contact you when provider onboarding opens in your area.</p>
              <button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-bold text-violet-700">Submit another service</button>
              <a href="/provider" className="primary-cta mt-5">Start profile setup <ArrowRight className="size-4" /></a>
            </div>
          ) : (
            <form
              className="provider-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label htmlFor="provider-name">Your name</label>
                <input id="provider-name" required placeholder="Full name" />
              </div>
              <div>
                <label htmlFor="business-name">Business or service name</label>
                <input id="business-name" required placeholder="e.g. Musa Electricals" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="provider-service">Service category</label>
                  <select id="provider-service" required defaultValue="">
                    <option value="" disabled>Select a category</option>
                    {services.map((service) => <option key={service.name}>{service.name}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="provider-location">Location</label>
                  <input id="provider-location" required placeholder="City or area" />
                </div>
              </div>
              <div>
                <label htmlFor="provider-contact">Phone or email</label>
                <input id="provider-contact" required placeholder="How should we reach you?" />
              </div>
              <button type="submit" className="primary-cta">Join as a provider <ArrowRight className="size-4" /></button>
              <a href="/provider" className="provider-setup-link">Already invited? Access provider setup <ArrowRight className="size-4" /></a>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
