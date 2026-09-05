'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  Check,
  Clock3,
  FileCheck2,
  LockKeyhole,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';

const steps = [
  { label: 'Your profile', icon: Camera },
  { label: 'Your service', icon: BriefcaseBusiness },
  { label: 'Availability', icon: Clock3 },
  { label: 'Review', icon: ShieldCheck },
];

export default function ProviderSetupPage() {
  const [screen, setScreen] = useState<'access' | 'setup' | 'complete'>('access');
  const [step, setStep] = useState(0);
  const [name, setName] = useState('Musa Ibrahim');
  const [business, setBusiness] = useState('Musa QuickFix');

  const next = () => {
    if (step === steps.length - 1) setScreen('complete');
    else setStep((current) => current + 1);
  };

  if (screen === 'access') {
    return (
      <main className="provider-portal min-h-screen">
        <SiteHeader active="provider" />
        <section className="provider-access-shell">
          <div className="provider-access-copy">
            <span className="section-kicker"><Sparkles className="size-4" /> Zndux for providers</span>
            <h1>Turn what you do into what people <span className="gradient-text">find nearby.</span></h1>
            <p>Create a trusted local profile, receive customer requests and grow your reputation—without needing a website of your own.</p>
            <div className="provider-access-points">
              <span><BadgeCheck className="size-5" /> A verified profile customers can trust</span>
              <span><MapPin className="size-5" /> Discovery by service area and proximity</span>
              <span><Phone className="size-5" /> Direct requests through your preferred channel</span>
            </div>
          </div>

          <form className="provider-access-card" onSubmit={(event) => { event.preventDefault(); window.location.href = '/provider/dashboard'; }}>
            <div className="provider-access-avatar"><img src="/zndux-logo.jpeg" alt="Anaiyah" /></div>
            <span className="provider-access-overline">Provider access</span>
            <h2>Welcome back to your Zndux space.</h2>
            <p>Sign in to manage customer requests, availability, reviews and your public profile.</p>
            <label htmlFor="provider-access-contact">Phone number or email</label>
            <input id="provider-access-contact" type="text" defaultValue="musa@example.com" required />
            <label htmlFor="provider-access-code">Access code</label>
            <div className="provider-code-input"><LockKeyhole className="size-4" /><input id="provider-access-code" type="password" defaultValue="123456" required /></div>
            <button type="submit" className="primary-cta provider-access-cta">Sign in to provider dashboard <ArrowRight className="size-4" /></button>
            <button type="button" className="provider-text-button" onClick={() => setScreen('setup')}>I’m new — create my provider profile</button>
            <small>Demo sign-in is pre-filled. New providers can begin setup using the link above.</small>
          </form>
        </section>
      </main>
    );
  }

  if (screen === 'complete') {
    return (
      <main className="provider-portal min-h-screen">
        <SiteHeader active="provider" />
        <section className="provider-complete-shell">
          <div className="provider-complete-card">
            <span className="provider-complete-mark"><Check className="size-8" /></span>
            <span className="provider-access-overline">Setup complete</span>
            <h1>Your profile is ready for review.</h1>
            <p>Anaiyah has saved your information. Once Zndux verifies your details, nearby customers can discover and Zend you directly.</p>
            <div className="provider-review-state"><Clock3 className="size-5" /><div><strong>Verification in progress</strong><span>Usually completed within 24 hours</span></div></div>
            <a href="/provider/dashboard" className="primary-cta">Open provider dashboard <ArrowRight className="size-4" /></a>
            <a href="/providers/musa-quickfix" className="provider-public-preview-link">Preview customer-facing profile</a>
            <button type="button" className="provider-text-button" onClick={() => { setScreen('setup'); setStep(0); }}>Edit profile details</button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="provider-portal min-h-screen">
      <header className="provider-setup-topbar">
        <a href="/" aria-label="Zndux home"><img src="/zndux-brand-logo.jpeg" alt="Zndux" className="zndux-brand-mark" /></a>
        <span>Provider profile setup</span>
      </header>
      <section className="provider-setup-shell">
        <aside className="provider-setup-sidebar">
          <a href="/provider" onClick={(event) => { event.preventDefault(); setScreen('access'); }} className="provider-back-link"><ArrowLeft className="size-4" /> Exit setup</a>
          <div>
            <span className="provider-access-overline">Profile setup</span>
            <h1>Let’s build something customers can trust.</h1>
            <p>Complete each section. You can return and edit anything before submitting.</p>
          </div>
          <ol>
            {steps.map(({ label, icon: Icon }, index) => (
              <li key={label} className={index === step ? 'is-active' : index < step ? 'is-complete' : ''}>
                <span>{index < step ? <Check className="size-4" /> : <Icon className="size-4" />}</span>
                <div><small>Step {index + 1}</small><strong>{label}</strong></div>
              </li>
            ))}
          </ol>
          <div className="provider-progress"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
        </aside>

        <div className="provider-setup-workspace">
          <div className="provider-mobile-progress">Step {step + 1} of {steps.length}<span><i style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></span></div>

          {step === 0 && (
            <div className="provider-step-panel">
              <span className="provider-step-kicker">01 · Your profile</span>
              <h2>Who will customers be meeting?</h2>
              <p>Use a clear name and photo so people recognise the person or business behind the service.</p>
              <div className="provider-photo-field"><div className="provider-photo-preview">MI</div><button type="button"><Camera className="size-4" /> Add profile photo</button><span>JPG or PNG · up to 5MB</span></div>
              <div className="provider-form-grid">
                <label><span>Your full name</span><input value={name} onChange={(event) => setName(event.target.value)} /></label>
                <label><span>Business or service name</span><input value={business} onChange={(event) => setBusiness(event.target.value)} /></label>
                <label className="provider-field-wide"><span>Short introduction</span><textarea defaultValue="Reliable plumbing and general home repairs across Abuja. Available for scheduled and urgent call-outs." /></label>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="provider-step-panel">
              <span className="provider-step-kicker">02 · Your service</span>
              <h2>What should customers find you for?</h2>
              <p>Be specific. These details help Anaiyah match your profile to the right local requests.</p>
              <div className="provider-form-grid">
                <label><span>Primary category</span><select defaultValue="Home repairs"><option>Home repairs</option><option>Food & catering</option><option>Beauty & grooming</option><option>Delivery & logistics</option></select></label>
                <label><span>Years of experience</span><select defaultValue="5–10 years"><option>Less than 2 years</option><option>2–5 years</option><option>5–10 years</option><option>10+ years</option></select></label>
                <label><span>Service area</span><input defaultValue="Wuse, Maitama and Central Abuja" /></label>
                <label><span>Travel distance</span><select defaultValue="Up to 10 km"><option>Up to 5 km</option><option>Up to 10 km</option><option>Up to 25 km</option></select></label>
                <label className="provider-field-wide"><span>Services and starting prices</span><div className="provider-service-row"><input defaultValue="Leak repairs" /><input defaultValue="₦8,000" /><button type="button">Remove</button></div><div className="provider-service-row"><input defaultValue="Tap installation" /><input defaultValue="₦12,000" /><button type="button">Remove</button></div><button type="button" className="provider-add-service">+ Add another service</button></label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="provider-step-panel">
              <span className="provider-step-kicker">03 · Availability</span>
              <h2>How should customers reach you?</h2>
              <p>Set expectations clearly—where you work, when you are available and the channel you respond to fastest.</p>
              <div className="provider-form-grid">
                <label><span>Preferred contact</span><select defaultValue="WhatsApp"><option>WhatsApp</option><option>Phone call</option><option>Email</option></select></label>
                <label><span>Contact number</span><input defaultValue="+234 803 555 0198" /></label>
                <label><span>Typical response time</span><select defaultValue="Within 5 minutes"><option>Within 5 minutes</option><option>Within 30 minutes</option><option>Within 2 hours</option></select></label>
                <label><span>Current status</span><select defaultValue="Available now"><option>Available now</option><option>Available today</option><option>Bookings only</option></select></label>
              </div>
              <div className="provider-days"><strong>Working days</strong>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, index) => <button key={day} type="button" className={index < 6 ? 'selected' : ''}>{day}</button>)}</div>
            </div>
          )}

          {step === 3 && (
            <div className="provider-step-panel">
              <span className="provider-step-kicker">04 · Review and verify</span>
              <h2>One final look before you go live.</h2>
              <p>Confirm that your details are accurate. Zndux will review your identity and service information before adding the verified badge.</p>
              <div className="provider-review-profile">
                <div className="provider-review-cover"><img src="/services-artisan.jpg" alt="Service provider at work" /></div>
                <div className="provider-review-info"><span className="provider-review-avatar">MI</span><div><h3>{business} <BadgeCheck className="size-5" /></h3><p>Home repairs · Wuse, Maitama and Central Abuja</p></div><button type="button" onClick={() => setStep(0)}>Edit</button></div>
              </div>
              <div className="provider-verification-list">
                <span><FileCheck2 className="size-5" /><div><strong>Identity document</strong><small>National ID uploaded</small></div><Check className="size-4" /></span>
                <span><Phone className="size-5" /><div><strong>Contact verification</strong><small>Phone number confirmed</small></div><Check className="size-4" /></span>
                <span><MapPin className="size-5" /><div><strong>Service area</strong><small>Location details confirmed</small></div><Check className="size-4" /></span>
              </div>
              <label className="provider-consent"><input type="checkbox" defaultChecked /><span>I confirm these details are correct and agree to the Zndux provider standards.</span></label>
            </div>
          )}

          <div className="provider-step-actions">
            <button type="button" className="provider-secondary-cta" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}><ArrowLeft className="size-4" /> Back</button>
            <button type="button" className="primary-cta" onClick={next}>{step === steps.length - 1 ? 'Submit for verification' : 'Save and continue'} <ArrowRight className="size-4" /></button>
          </div>
        </div>
      </section>
    </main>
  );
}
