"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GhRepo } from "@/lib/github";

export default function RepoGrid({
  initialRepos,
  username,
}: {
  initialRepos: GhRepo[];
  username: string;
}) {
  const [q, setQ] = useState("");
  const [lang, setLang] = useState<string>("");

  const languages = useMemo(() => {
    const s = new Set<string>();
    initialRepos.forEach((r) => r.language && s.add(r.language));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [initialRepos]);

  const repos = useMemo(() => {
    const query = q.trim().toLowerCase();
    return initialRepos
      .filter((r) => (lang ? r.language === lang : true))
      .filter((r) =>
        query
          ? (r.name + " " + (r.description ?? "")).toLowerCase().includes(query)
          : true
      )
      .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
  }, [initialRepos, q, lang]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Dépôts</h2>
          <p className="text-sm text-[var(--muted-3)]">
            Recherche + filtre, comme un bon tableau électrique: clair, rangé.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Chercher un repo…"
            className="w-full md:w-72 rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] px-3 py-2 text-sm text-[var(--fg)] outline-none placeholder:text-[var(--muted-3)] focus:border-[var(--muted-2)]"
          />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full md:w-52 rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] px-3 py-2 text-sm text-[var(--fg)] outline-none focus:border-[var(--muted-2)]"
          >
            <option value="">Toutes les langues</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-4 hover:bg-[var(--surface-hover)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link
                  href={`/repo/${encodeURIComponent(r.name)}`}
                  className="text-base font-semibold hover:underline"
                >
                  {r.name}
                </Link>
                {r.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-[var(--muted)]">
                    {r.description}
                  </p>
                )}
              </div>
              <a
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[var(--muted-3)] hover:text-[var(--muted-2)]"
                title="Ouvrir sur GitHub"
              >
                ↗
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-[var(--muted-3)]">
              {r.language && <span>{r.language}</span>}
              <span>★ {r.stargazers_count}</span>
              <span>⑂ {r.forks_count}</span>
              <span>Maj {new Date(r.updated_at).toLocaleDateString("fr-BE")}</span>
            </div>
          </div>
        ))}
      </div>

      {repos.length === 0 && (
        <p className="mt-6 text-sm text-[var(--muted-3)]">Aucun résultat.</p>
      )}
    </div>
  );
}
