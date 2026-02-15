import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link
          href="/"
          className="text-sm text-[var(--muted-3)] hover:text-[var(--muted-2)]"
        >
          ← Retour
        </Link>

        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h1 className="text-2xl font-semibold">À propos</h1>
          <p className="mt-3 text-[var(--muted-2)]">
            Vitrine GitHub simple : profil, dépôts, et pages détail.
            Ajoute ici ton texte (présentation, techno, liens).
          </p>

          <ul className="mt-4 list-disc pl-5 text-[var(--muted)]">
            <li>Met en avant 3–6 projets “phares” (pins)</li>
            <li>Ajoute une section &quot;RGIE / WebElec&quot; si tu veux</li>
            <li>Ajoute CV PDF + contact</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
