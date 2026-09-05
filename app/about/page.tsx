import { ArrowRight, Globe2, MapPin, MessageCircleMore, ShieldCheck, UsersRound } from 'lucide-react';
import Image from 'next/image';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader active="about" />

      <section className="px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="section-kicker">Built for everyday access</span>
            <h1 className="page-heading mt-6">
              Local opportunity should be <span className="gradient-text">easy to reach.</span>
            </h1>
            <p className="page-intro mt-7 max-w-2xl">
              Zndux closes the gap between someone who needs help and the capable person nearby who can provide it.
            </p>
            <a href="/" className="primary-cta mt-9 inline-flex">Find a service <ArrowRight className="size-4" /></a>
          </div>

          <figure className="about-hero-visual">
            <Image
              src="/about-find-service.jpg"
              alt="A customer looking for help connected to nearby service providers through Zndux"
              width={1400}
              height={1400}
              sizes="(min-width: 1024px) 44vw, 100vw"
              priority
            />
            <figcaption>
              <span>Made for real needs</span>
              Find the right person, right around you.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-violet-100 bg-[#fbf8fe] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">Our mission</span>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">Make proximity useful.</h2>
            </div>
            <p className="max-w-3xl text-pretty text-2xl font-medium leading-[1.45] tracking-[-0.025em] text-slate-700 sm:text-3xl">
              We’re creating a trusted layer for local commerce—helping people discover nearby skills, services and products while helping small businesses reach the customers already around them.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {[
              [MapPin, 'Close to you', 'Location helps surface useful, relevant options instead of sending you across town.'],
              [ShieldCheck, 'Built on trust', 'Community feedback and provider verification help people choose with confidence.'],
              [MessageCircleMore, 'On your channel', 'Web, familiar social platforms and accessible channels keep the experience inclusive.'],
            ].map(([Icon, title, copy]) => {
              const FeatureIcon = Icon as typeof MapPin;
              return (
                <article key={title as string} className="value-card">
                  <FeatureIcon className="size-6 text-violet-700" />
                  <h3>{title as string}</h3>
                  <p>{copy as string}</p>
                </article>
              );
            })}
          </div>

          <div className="about-service-gallery" aria-label="Local services connected by Zndux">
            {[
              ['/about-local-food.jpg', 'Food & hospitality', 'Discover something good nearby.'],
              ['/about-local-delivery.jpg', 'Delivery & errands', 'Get local help moving things.'],
              ['/about-local-tailor.jpg', 'Skilled artisans', 'Find the craft your job needs.'],
            ].map(([src, title, copy]) => (
              <figure key={title} className="about-gallery-card">
                <Image
                  src={src}
                  alt={`${title} provider featured by Zndux`}
                  width={1100}
                  height={1100}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <figcaption>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="about-network-panel">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
              <div className="about-network-image">
                <Image
                  src="/about-connected-channels.jpg"
                  alt="A Zndux user surrounded by familiar social and messaging channels"
                  width={1300}
                  height={1300}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-100"><Globe2 className="size-4" /> The bigger picture</span>
                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">One network. Many ways to connect.</h2>
                <p className="mt-7 text-lg leading-8 text-violet-50">Zndux begins with immediate local needs and grows toward an inclusive network where access is not limited by device, platform or industry.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['Customers', 'Local businesses', 'Artisans', 'Communities'].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold"><UsersRound className="size-4" />{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
