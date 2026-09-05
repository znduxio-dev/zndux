import { Menu } from 'lucide-react';

type SiteHeaderProps = {
  active: 'app' | 'services' | 'about' | 'provider';
};

const links = [
  { key: 'app', label: 'App', href: '/' },
  { key: 'services', label: 'Services', href: '/services' },
  { key: 'about', label: 'About', href: '/about' },
] as const;

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="relative z-50 flex h-[84px] items-center justify-between px-5 sm:px-8 lg:px-12">
      <a href="/" className="flex items-center gap-3" aria-label="Zndux home">
        <img src="/zndux-brand-logo.jpeg" alt="Zndux" className="zndux-brand-mark" />
      </a>

      <nav aria-label="Primary navigation" className="nav-pill hidden items-center sm:flex">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            aria-current={active === link.key ? 'page' : undefined}
            className={active === link.key ? 'nav-link nav-link-active' : 'nav-link'}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a href="/provider" className="provider-button hidden sm:inline-flex">
        Provider access
        <ArrowUpRightIcon />
      </a>

      <details className="mobile-menu sm:hidden">
        <summary aria-label="Open navigation">
          <Menu className="size-5" />
        </summary>
        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <a key={link.key} href={link.href} aria-current={active === link.key ? 'page' : undefined}>
              {link.label}
            </a>
          ))}
          <a href="/provider" aria-current={active === 'provider' ? 'page' : undefined}>Provider access</a>
        </nav>
      </details>
    </header>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 fill-none stroke-current stroke-[1.7]">
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  );
}
