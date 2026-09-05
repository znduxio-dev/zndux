import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function MusaQuickFixProfile() {
  return (
    <main className="min-h-screen bg-[#fbf9fd]">
      <SiteHeader active="services" />
      <section className="public-profile-shell">
        <a href="/" className="public-profile-back"><ArrowLeft className="size-4" /> Back to results</a>
        <div className="public-profile-cover"><img src="/services-artisan.jpg" alt="Musa QuickFix completing a home repair" /><span><BadgeCheck className="size-4" /> Verified Zndux provider</span></div>
        <div className="public-profile-layout">
          <div className="public-profile-main">
            <header className="public-profile-header">
              <div className="public-profile-avatar">MI</div>
              <div><h1>Musa QuickFix <BadgeCheck className="size-6" /></h1><p>Plumbing and home repairs · Abuja</p><span className="public-profile-available"><i /> Available now</span></div>
            </header>
            <div className="public-profile-trustbar">
              <span><Star className="size-5 fill-amber-400 text-amber-400" /><strong>4.9</strong><small>82 reviews</small></span>
              <span><CheckCircle2 className="size-5 text-emerald-600" /><strong>126</strong><small>jobs completed</small></span>
              <span><Clock3 className="size-5 text-violet-600" /><strong>~5 min</strong><small>response time</small></span>
              <span><Navigation className="size-5 text-fuchsia-600" /><strong>0.8 km</strong><small>from you</small></span>
            </div>
            <section className="public-profile-section"><h2>About Musa</h2><p>Reliable plumbing and general home repairs across Wuse, Maitama and nearby areas. I handle scheduled installations and urgent call-outs with clear pricing before work begins.</p></section>
            <section className="public-profile-section"><div className="public-profile-section-title"><h2>Services</h2><span>Starting prices</span></div><div className="public-service-list"><span><div><strong>Leak diagnosis and repair</strong><small>Inspection, pipe and fitting repair</small></div><b>From ₦8,000</b></span><span><div><strong>Tap and fixture installation</strong><small>Kitchen and bathroom fittings</small></div><b>From ₦12,000</b></span><span><div><strong>Emergency home visit</strong><small>Same-day urgent call-out</small></div><b>From ₦15,000</b></span></div></section>
            <section className="public-profile-section"><div className="public-profile-section-title"><h2>What customers say</h2><span>4.9 average</span></div><div className="public-review-grid"><blockquote><div>★★★★★</div><p>Fast, tidy and very professional. Musa fixed the leak on the first visit and explained everything clearly.</p><footer>— Amaka, Wuse 2</footer></blockquote><blockquote><div>★★★★★</div><p>Arrived on time, charged exactly what we agreed and left the space clean.</p><footer>— David, Maitama</footer></blockquote></div></section>
          </div>
          <aside className="public-profile-contact-card">
            <span className="provider-access-overline">Ready when you are</span>
            <h2>Zend Musa your request.</h2>
            <p>Describe what you need. Anaiyah will package the details and connect you directly.</p>
            <label><span>What needs fixing?</span><textarea placeholder="e.g. My kitchen tap has been leaking since yesterday…" /></label>
            <button type="button" className="primary-cta public-profile-zend">Zend request <span className="search-button-avatar"><img src="/zndux-logo.jpeg" alt="" /></span></button>
            <div className="public-profile-contact-options"><button type="button"><Phone className="size-4" /> Call provider</button><button type="button"><MessageCircle className="size-4" /> WhatsApp</button></div>
            <div className="public-profile-safety"><ShieldCheck className="size-5" /><p><strong>Zndux trust reminder</strong><span>Confirm the scope and price before work begins. Keep important communication in writing.</span></p></div>
            <div className="public-profile-area"><MapPin className="size-4" /> Serves Wuse, Maitama and Central Abuja</div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
