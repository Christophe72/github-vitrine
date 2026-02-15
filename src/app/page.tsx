import Image from "next/image";
import Link from "next/link";
import { getRepos, getUser } from "@/lib/github";
import RepoGrid from "@/components/RepoGrid";

export default async function Home() {
  const username = process.env.GITHUB_USERNAME || "octocat";

  const [user, repos] = await Promise.all([
    getUser(username),
    getRepos(username),
  ]);

  // petites règles “traditionnelles” : on masque forks et on met les plus utiles
  const filtered = repos.filter((r: any) => !r.fork).slice(0, 60);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="flex flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={user.avatar_url}
              alt={user.login}
              width={80}
              height={80}
              className="rounded-2xl border border-[var(--border)]"
              priority
            />
            <div>
              <h1 className="text-2xl font-semibold">{user.name ?? user.login}</h1>
              <p className="text-[var(--muted)]">@{user.login}</p>
              {user.bio && (
                <p className="mt-2 text-[var(--muted-2)]">{user.bio}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                <span>Repos: {user.public_repos}</span>
                <span>Followers: {user.followers}</span>
                <span>Following: {user.following}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)]"
            >
              Ouvrir GitHub
            </a>
            <Link
              href="/about"
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-hover)]"
            >
              À propos
            </Link>
          </div>
        </header>

        <section className="mt-8">
          <RepoGrid initialRepos={filtered} username={username} />
        </section>

        <footer className="mt-10 text-center text-xs text-[var(--muted-3)]">
          Fait avec Next.js • Sans chichis, sans poudre aux yeux.
        </footer>
      </div>
    </main>
  );
}
