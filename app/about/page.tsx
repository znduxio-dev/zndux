import { ArrowRight, Globe2, MapPin, MessageCircleMore, ShieldCheck, UsersRound } from 'lucide-react';
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

          <div className="brand-story-card">
            <img src="/zndux-brand-story.jpeg" alt="The Zndux symbol combines the letter Z with a connection link" />
          </div>
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
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#6f2da8] via-[#822da0] to-[#c52a76] px-7 py-16 text-white sm:px-14 lg:px-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-100"><Globe2 className="size-4" /> The bigger picture</span>
                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">One network. Many ways to connect.</h2>
              </div>
              <div>
                <p className="text-lg leading-8 text-violet-50">Zndux begins with immediate local needs and grows toward an inclusive network where access is not limited by device, platform or industry.</p>
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
