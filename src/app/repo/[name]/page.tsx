import Link from "next/link";
import { getRepo } from "@/lib/github";

export default async function RepoPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const username = process.env.GITHUB_USERNAME || "octocat";
  const { name } = await params;
  const repo = await getRepo(username, name);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link
          href="/"
          className="text-sm text-[var(--muted-3)] hover:text-[var(--muted-2)]"
        >
          ← Retour
        </Link>

        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h1 className="text-2xl font-semibold">{repo.full_name}</h1>
          {repo.description && (
            <p className="mt-3 text-[var(--muted-2)]">{repo.description}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
            {repo.language && <span>{repo.language}</span>}
            <span>★ {repo.stargazers_count}</span>
            <span>⑂ {repo.forks_count}</span>
            <span>Maj {new Date(repo.updated_at).toLocaleDateString("fr-BE")}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)]"
            >
              Voir sur GitHub
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-hover)]"
              >
                Démo / site
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
