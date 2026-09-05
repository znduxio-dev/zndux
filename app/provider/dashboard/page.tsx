'use client';

import { useState } from 'react';
import {
  BadgeCheck,
  Bell,
  CalendarClock,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  Inbox,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Save,
  Sparkles,
  Star,
  TrendingUp,
  UserRoundPen,
} from 'lucide-react';

type DashboardView = 'overview' | 'requests' | 'profile' | 'availability' | 'reviews';

const navigation = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'requests', label: 'Requests', icon: Inbox, badge: '3' },
  { id: 'profile', label: 'Edit profile', icon: UserRoundPen },
  { id: 'availability', label: 'Availability', icon: CalendarClock },
  { id: 'reviews', label: 'Reviews', icon: Star },
] as const;

const requests = [
  { id: 1, customer: 'Amaka O.', need: 'Kitchen sink leaking', area: 'Wuse 2', distance: '0.8 km', time: '4 mins ago', urgent: true },
  { id: 2, customer: 'David A.', need: 'Install two bathroom taps', area: 'Maitama', distance: '2.1 km', time: '18 mins ago', urgent: false },
  { id: 3, customer: 'Nneka C.', need: 'Check low water pressure', area: 'Jabi', distance: '4.6 km', time: '42 mins ago', urgent: false },
];

export default function ProviderDashboardPage() {
  const [view, setView] = useState<DashboardView>('overview');
  const [available, setAvailable] = useState(true);
  const [saved, setSaved] = useState(false);
  const [accepted, setAccepted] = useState<number[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  function chooseView(next: DashboardView) {
    setView(next);
    setMobileMenu(false);
  }

  return (
    <main className="provider-dashboard-shell">
      <aside className={`provider-dashboard-nav ${mobileMenu ? 'is-open' : ''}`}>
        <a href="/" className="provider-dashboard-logo" aria-label="Zndux home"><img src="/zndux-brand-logo.jpeg" alt="Zndux" /></a>
        <div className="provider-dashboard-account">
          <span>MI</span>
          <div><strong>Musa QuickFix <BadgeCheck className="size-3.5" /></strong><small>Verified provider</small></div>
        </div>
        <nav aria-label="Provider dashboard navigation">
          {navigation.map(({ id, label, icon: Icon, ...item }) => (
            <button key={id} type="button" className={view === id ? 'is-active' : ''} onClick={() => chooseView(id)}>
              <Icon className="size-4" /><span>{label}</span>{'badge' in item ? <b>{item.badge}</b> : null}
            </button>
          ))}
        </nav>
        <div className="provider-dashboard-nav-bottom">
          <a href="/providers/musa-quickfix"><Eye className="size-4" /> View public profile</a>
          <a href="/provider"><LogOut className="size-4" /> Sign out</a>
        </div>
      </aside>

      {mobileMenu ? <button type="button" className="provider-dashboard-scrim" aria-label="Close menu" onClick={() => setMobileMenu(false)} /> : null}

      <section className="provider-dashboard-main">
        <header className="provider-dashboard-topbar">
          <button type="button" className="provider-mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="Open dashboard menu"><Menu className="size-5" /></button>
          <div><span>Provider workspace</span><strong>{navigation.find((item) => item.id === view)?.label}</strong></div>
          <div className="provider-dashboard-top-actions">
            <button type="button" aria-label="Notifications"><Bell className="size-4" /><i /></button>
            <div>MI</div>
          </div>
        </header>

        <div className="provider-dashboard-content">
          {view === 'overview' ? (
            <>
              <div className="provider-dashboard-welcome">
                <div><span className="provider-step-kicker">Saturday, 5 September</span><h1>Good afternoon, Musa.</h1><p>Here’s what is happening around your business today.</p></div>
                <label className="provider-availability-toggle"><span><i className={available ? 'online' : ''} />{available ? 'Available now' : 'Not available'}</span><input type="checkbox" checked={available} onChange={(event) => setAvailable(event.target.checked)} /><b /></label>
              </div>

              <div className="provider-dashboard-stats">
                <article><span className="tone-plum"><Inbox className="size-5" /></span><div><small>New requests</small><strong>3</strong><p><TrendingUp className="size-3" /> 2 since yesterday</p></div></article>
                <article><span className="tone-orange"><Eye className="size-5" /></span><div><small>Profile views</small><strong>148</strong><p><TrendingUp className="size-3" /> 18% this week</p></div></article>
                <article><span className="tone-green"><Check className="size-5" /></span><div><small>Jobs completed</small><strong>126</strong><p>8 this month</p></div></article>
                <article><span className="tone-gold"><Star className="size-5" /></span><div><small>Customer rating</small><strong>4.9</strong><p>From 82 reviews</p></div></article>
              </div>

              <div className="provider-dashboard-grid">
                <section className="provider-dashboard-card provider-requests-card">
                  <div className="provider-dashboard-card-title"><div><h2>New customer requests</h2><p>People nearby who need your service.</p></div><button type="button" onClick={() => setView('requests')}>View all <ChevronRight className="size-4" /></button></div>
                  <div className="provider-request-list">
                    {requests.slice(0, 2).map((request) => (
                      <article key={request.id}>
                        <span className="provider-request-avatar">{request.customer.slice(0, 1)}</span>
                        <div><div><strong>{request.customer}</strong>{request.urgent ? <b>Urgent</b> : null}</div><h3>{request.need}</h3><p><MapPin className="size-3" /> {request.area} · {request.distance}<span>·</span><Clock3 className="size-3" /> {request.time}</p></div>
                        <button type="button" aria-label={`Open request from ${request.customer}`} onClick={() => setView('requests')}><ChevronRight className="size-4" /></button>
                      </article>
                    ))}
                  </div>
                </section>

                <aside className="provider-dashboard-card provider-profile-strength">
                  <div className="provider-strength-ring"><span>92%</span></div>
                  <h2>Your profile looks strong.</h2>
                  <p>Add two more work photos to help customers choose you with confidence.</p>
                  <div><span><i style={{ width: '92%' }} /></span><small>Profile completeness</small></div>
                  <button type="button" onClick={() => setView('profile')}>Complete profile <ChevronRight className="size-4" /></button>
                </aside>
              </div>

              <section className="provider-dashboard-card provider-anaiyah-tip">
                <div className="provider-tip-avatar"><img src="/zndux-logo.jpeg" alt="Anaiyah" /></div>
                <div><span>Anaiyah’s tip</span><h2>Fast replies help you appear higher in nearby results.</h2><p>You currently reply in about five minutes—customers love that.</p></div>
                <Sparkles className="size-5" />
              </section>
            </>
          ) : null}

          {view === 'requests' ? (
            <section className="provider-dashboard-page">
              <div className="provider-dashboard-page-heading"><div><span className="provider-step-kicker">Customer requests</span><h1>People nearby need your help.</h1><p>Review each request before accepting. You control which jobs you take.</p></div><span className="provider-page-count">3 new</span></div>
              <div className="provider-full-request-list">
                {requests.map((request) => (
                  <article key={request.id} className={accepted.includes(request.id) ? 'is-accepted' : ''}>
                    <div className="provider-full-request-top"><span className="provider-request-avatar">{request.customer.slice(0, 1)}</span><div><strong>{request.customer}</strong><small>{request.time}</small></div>{request.urgent ? <b>Urgent request</b> : null}</div>
                    <h2>{request.need}</h2><p className="provider-request-description">Customer would like an assessment and price before work begins.</p>
                    <div className="provider-full-request-meta"><span><MapPin className="size-4" /> {request.area}</span><span>{request.distance} away</span><span>Preferred: WhatsApp</span></div>
                    <div className="provider-full-request-actions">{accepted.includes(request.id) ? <span><Check className="size-4" /> Request accepted</span> : <><button type="button" className="provider-secondary-cta">Not available</button><button type="button" className="primary-cta" onClick={() => setAccepted((current) => [...current, request.id])}>Accept request <MessageCircle className="size-4" /></button></>}</div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {view === 'profile' ? (
            <section className="provider-dashboard-page">
              <div className="provider-dashboard-page-heading"><div><span className="provider-step-kicker">Public information</span><h1>Edit your provider profile.</h1><p>Changes appear on the profile customers see after you save them.</p></div><a href="/providers/musa-quickfix"><Eye className="size-4" /> Preview profile</a></div>
              <form className="provider-edit-card" onSubmit={(event) => { event.preventDefault(); setSaved(true); window.setTimeout(() => setSaved(false), 2500); }}>
                <div className="provider-edit-cover"><img src="/services-artisan.jpg" alt="Musa QuickFix cover" /><button type="button">Change cover photo</button><span>MI</span></div>
                <div className="provider-edit-grid">
                  <label><span>Full name</span><input defaultValue="Musa Ibrahim" /></label><label><span>Business name</span><input defaultValue="Musa QuickFix" /></label>
                  <label><span>Service category</span><select defaultValue="Home repairs"><option>Home repairs</option><option>Food & catering</option><option>Beauty & grooming</option></select></label><label><span>Years of experience</span><select defaultValue="5–10 years"><option>2–5 years</option><option>5–10 years</option><option>10+ years</option></select></label>
                  <label className="provider-field-wide"><span>About your service</span><textarea defaultValue="Reliable plumbing and general home repairs across Wuse, Maitama and nearby areas. I handle scheduled installations and urgent call-outs with clear pricing before work begins." /></label>
                  <label><span>Phone number</span><input defaultValue="+234 803 555 0198" /></label><label><span>Email address</span><input defaultValue="musa@example.com" /></label>
                  <label className="provider-field-wide"><span>Service area</span><input defaultValue="Wuse, Maitama and Central Abuja" /></label>
                </div>
                <div className="provider-edit-actions"><span>{saved ? <><Check className="size-4" /> Changes saved</> : 'Your verified name may require review if changed.'}</span><button type="submit" className="primary-cta"><Save className="size-4" /> Save changes</button></div>
              </form>
            </section>
          ) : null}

          {view === 'availability' ? (
            <section className="provider-dashboard-page">
              <div className="provider-dashboard-page-heading"><div><span className="provider-step-kicker">Your schedule</span><h1>Decide when customers can find you.</h1><p>Your availability is shown clearly in nearby search results.</p></div></div>
              <div className="provider-availability-layout">
                <section className="provider-dashboard-card provider-status-control"><div><span className={available ? 'online' : ''}><i /></span><div><h2>{available ? 'You’re available now' : 'You’re currently unavailable'}</h2><p>{available ? 'Anaiyah can send new requests your way.' : 'New requests are paused until you return.'}</p></div><label><input type="checkbox" checked={available} onChange={(event) => setAvailable(event.target.checked)} /><b /></label></div></section>
                <section className="provider-dashboard-card provider-weekly-hours"><div className="provider-dashboard-card-title"><div><h2>Weekly working hours</h2><p>Set the times you usually accept requests.</p></div></div>{['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day, index) => <div key={day} className={index === 6 ? 'is-off' : ''}><strong>{day}</strong><span>{index === 6 ? 'Unavailable' : index === 5 ? '9:00 AM — 3:00 PM' : '8:00 AM — 6:00 PM'}</span><button type="button">Edit</button></div>)}</section>
              </div>
            </section>
          ) : null}

          {view === 'reviews' ? (
            <section className="provider-dashboard-page">
              <div className="provider-dashboard-page-heading"><div><span className="provider-step-kicker">Reputation</span><h1>Your customer reviews.</h1><p>Feedback helps nearby customers choose with confidence.</p></div><div className="provider-rating-summary"><Star className="size-5 fill-amber-400 text-amber-400" /><strong>4.9</strong><span>82 reviews</span></div></div>
              <div className="provider-dashboard-reviews">{[['Amaka O.','Fast, tidy and very professional. Musa fixed the leak on the first visit and explained everything clearly.','2 days ago'],['David A.','Arrived on time, charged exactly what we agreed and left the space clean.','1 week ago'],['Nneka C.','Great communication and a neat installation. I would gladly recommend him.','2 weeks ago']].map(([name,copy,date]) => <article key={name}><div><span>{name.slice(0,1)}</span><div><strong>{name}</strong><small>{date}</small></div><b>★★★★★</b></div><p>{copy}</p><button type="button">Reply to review</button></article>)}</div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}
