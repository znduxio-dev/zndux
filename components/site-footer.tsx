import { ArrowUpRight } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-violet-100 bg-white px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a href="/" className="inline-flex items-center gap-3" aria-label="Zndux home">
            <img src="/zndux-brand-logo.jpeg" alt="Zndux" className="zndux-brand-mark zndux-brand-mark-footer" />
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
            Connecting people to trusted products and services around them, through the channels they already use.
          </p>
        </div>
        <div className="flex flex-col gap-5 text-sm sm:items-end">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-5 font-semibold text-slate-600">
            <a href="/">App</a>
            <a href="/services">Services</a>
            <a href="/about">About</a>
            <a href="https://sirfitech.gitbook.io/zndux" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
              Documentation <ArrowUpRight className="size-3.5" />
            </a>
          </nav>
          <p className="text-xs text-slate-400">© 2026 Zndux. Built around real local needs.</p>
        </div>
      </div>
    </footer>
  );
}
