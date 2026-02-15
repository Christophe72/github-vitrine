export type GhUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

export type GhRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  homepage?: string | null;
};

const API = "https://api.github.com";

function headers() {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export async function getUser(username: string): Promise<GhUser> {
  const r = await fetch(`${API}/users/${username}`, {
    headers: headers(),
    next: { revalidate: 3600 },
  });
  if (!r.ok) throw new Error(`GitHub user fetch failed: ${r.status}`);
  return r.json();
}

export async function getRepos(username: string): Promise<GhRepo[]> {
  // tri par "updated" cote GitHub
  const r = await fetch(
    `${API}/users/${username}/repos?per_page=100&sort=updated`,
    { headers: headers(), next: { revalidate: 3600 } }
  );
  if (!r.ok) throw new Error(`GitHub repos fetch failed: ${r.status}`);
  return r.json();
}

export async function getRepo(username: string, repo: string): Promise<GhRepo> {
  const r = await fetch(`${API}/repos/${username}/${repo}`, {
    headers: headers(),
    next: { revalidate: 3600 },
  });
  if (!r.ok) throw new Error(`GitHub repo fetch failed: ${r.status}`);
  return r.json();
}
