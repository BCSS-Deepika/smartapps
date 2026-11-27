import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ModuleItem, ModuleGroup } from '@/types/product';

interface Props {
  modules: ModuleItem[];
  /** Group order as shown on the filter chips; an object adds the group's one-line description. */
  groups: (string | ModuleGroup)[];
  productName: string;
}

const norm = (s: string) => s.toLowerCase();

/**
 * Module explorer. Behaviour carried over from the live site:
 * filter chips per group, text search, one module open at a time, the URL hash follows the
 * open module (#m-…), a deep link opens its module with filters reset, and every module has
 * "Copy link to this module". The full text is rendered into the HTML on the server, so search engines and deep links get every module.
 */
const strip = (s: string) => s.replace(/<[^>]+>/g, '');
const matColor = {
  established: 'var(--color-established)',
  integration: 'var(--color-integration)',
  proposed: 'var(--color-proposed)',
};

export default function ModuleExplorer({ modules, groups: groupList, productName }: Props) {
  const groupInfo = groupList.map((g) => (typeof g === 'string' ? { name: g } : g));
  const groups = groupInfo.map((g) => g.name);
  const [group, setGroup] = useState<string>('*');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const index = useMemo(
    () =>
      new Map(
        modules.map((m) => [
          m.id,
          norm(
            strip(
              [
                m.name,
                m.tag,
                m.summary,
                ...(m.more ?? []),
                ...(m.details?.flatMap((d) => [d.label, d.text]) ?? []),
              ].join(' '),
            ),
          ),
        ]),
      ),
    [modules],
  );
  const q = norm(query.trim());
  const visible = (m: ModuleItem) =>
    (group === '*' || m.group === group) && (!q || index.get(m.id)!.includes(q));
  const shown = modules.filter(visible);

  const fromHash = useCallback(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!/^m-/.test(id) || !modules.some((m) => m.id === id)) return;
    setGroup('*');
    setQuery('');
    setOpenId(id);
    setFlash(id);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
    setTimeout(() => setFlash(null), 1700);
  }, [modules]);

  useEffect(() => {
    fromHash();
    addEventListener('hashchange', fromHash);
    return () => removeEventListener('hashchange', fromHash);
  }, [fromHash]);

  const toggle = (id: string) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    try {
      history.replaceState(null, '', next ? `#${next}` : location.pathname + location.search);
    } catch {}
    if (next) {
      const el = document.getElementById(id);
      const r = el?.getBoundingClientRect();
      if (r && (r.top < 80 || r.top > innerHeight * 0.6))
        el!.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copy = async (id: string) => {
    const url = `${location.origin}${location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt('Copy this link', url);
    }
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const count = (g: string) => modules.filter((m) => m.group === g).length;
  const chip = (key: string, label: string, n: number) => (
    <button
      key={key}
      type="button"
      aria-pressed={group === key}
      onClick={() => setGroup(key)}
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-small font-medium text-ink-2 transition-colors hover:border-ink-3 hover:text-white aria-pressed:border-[var(--accent)] aria-pressed:bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] aria-pressed:text-white"
    >
      {label}
      <span className="font-mono text-label text-ink-3">{n}</span>
    </button>
  );

  return (
    <div ref={rootRef} id="modules-explorer">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={`Filter ${productName} modules by group`}
        >
          {chip('*', 'All', modules.length)}
          {groups.map((g) => chip(g, g, count(g)))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Search modules</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search modules"
            className="min-h-11 w-full rounded-btn border border-line bg-bg-alt pl-9 pr-3 text-small text-white placeholder:text-ink-3 focus:border-[var(--accent)] focus:outline-none"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} of {modules.length} modules shown
      </p>

      {groupInfo.map(({ name: g, sub, id: gid }) => {
        const items = modules.filter((m) => m.group === g && visible(m));
        if (!items.length) return null;
        return (
          <section key={g} id={gid} className="mb-8 scroll-mt-[calc(var(--nav-h)+16px)] last:mb-0">
            <h3 className="mb-3 flex items-baseline gap-3 font-mono font-medium text-label uppercase tracking-[0.12em] text-[var(--accent-text)]">
              {g}
              <span className="text-ink-3">{items.length}</span>
              {sub && (
                <span className="font-sans text-small normal-case tracking-normal text-ink-3">
                  {sub}
                </span>
              )}
            </h3>
            <div className="grid gap-2.5">
              {items.map((m) => {
                const open = openId === m.id;
                const n = m.n || String(modules.indexOf(m) + 1).padStart(2, '0');
                return (
                  <article
                    key={m.id}
                    id={m.id}
                    className={`scroll-mt-[calc(var(--nav-h)+16px)] rounded-card border bg-surface transition-[border-color,box-shadow] duration-200 ${open ? 'border-[var(--accent)] shadow-card' : 'border-line hover:border-ink-3/50'} ${flash === m.id ? 'ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-bg' : ''}`}
                  >
                    <h4 className="font-sans font-normal">
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`mb-${m.id.slice(2)}`}
                        onClick={() => toggle(m.id)}
                        className="flex w-full items-center gap-3 rounded-card px-4 py-3.5 text-left md:px-5"
                      >
                        <span className="font-mono text-small text-ink-3">{n}</span>
                        <span className="min-w-0 flex-1">
                          <b className="block font-sans text-[1rem] font-semibold text-white">
                            {m.name}
                          </b>
                          {m.tag && (
                            <em className="block text-small not-italic text-ink-3">{m.tag}</em>
                          )}
                        </span>
                        {m.maturity && (
                          <span
                            className="hidden shrink-0 items-center gap-1.5 rounded-[5px] px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] sm:inline-flex"
                            style={{
                              color: matColor[m.maturity.kind],
                              background: `color-mix(in oklab, ${matColor[m.maturity.kind]} 15%, transparent)`,
                            }}
                          >
                            <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                            {m.maturity.label}
                          </span>
                        )}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className={`size-5 shrink-0 text-ink-3 transition-transform duration-200 ${open ? 'rotate-45 text-[var(--accent-text)]' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>
                    </h4>
                    <div
                      id={`mb-${m.id.slice(2)}`}
                      hidden={!open}
                      className="px-4 pb-5 md:px-5 md:pl-[3.25rem]"
                    >
                      <p
                        className="rich max-w-[78ch] text-[0.9375rem] leading-relaxed text-ink-2"
                        dangerouslySetInnerHTML={{ __html: m.summary }}
                      />
                      {m.more?.map((p, i) => (
                        <p
                          key={i}
                          className="rich mt-3 max-w-[78ch] text-[0.9375rem] leading-relaxed text-ink-2"
                          dangerouslySetInnerHTML={{ __html: p }}
                        />
                      ))}
                      {m.maturity && (
                        <p className="mt-3 sm:hidden">
                          <span
                            className="inline-flex items-center gap-1.5 rounded-[5px] px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em]"
                            style={{
                              color: matColor[m.maturity.kind],
                              background: `color-mix(in oklab, ${matColor[m.maturity.kind]} 15%, transparent)`,
                            }}
                          >
                            <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                            {m.maturity.label}
                          </span>
                        </p>
                      )}
                      {m.details && (
                        <dl className="mt-4 grid gap-2.5 md:grid-cols-2">
                          {m.details.map((d, i) => (
                            <div key={i} className="rounded-[10px] bg-bg-alt p-3.5">
                              <dt className="font-mono text-label uppercase tracking-[0.12em] text-[var(--accent-text)]">
                                {d.label}
                              </dt>
                              <dd
                                className="rich mt-1.5 text-small text-ink-2"
                                dangerouslySetInnerHTML={{ __html: d.text }}
                              />
                            </div>
                          ))}
                        </dl>
                      )}
                      {m.go && (
                        <a
                          href={m.go.href}
                          className="mt-4 mr-3 inline-flex min-h-9 items-center font-semibold text-[var(--accent-text)] no-underline hover:text-white"
                        >
                          {m.go.label}
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => copy(m.id)}
                        className="mt-4 inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-small text-ink-2 transition-colors hover:border-ink-3 hover:text-white"
                      >
                        {copied === m.id ? 'Link copied' : 'Copy link to this module'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
      {!shown.length && (
        <p className="rounded-card border border-dashed border-line p-6 text-center text-ink-3">
          No modules match “{query}”.
        </p>
      )}
    </div>
  );
}
