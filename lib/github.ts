export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Contributions = { total: number; days: ContributionDay[] };

const LEVELS: Record<string, ContributionDay["level"]> = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

const QUERY = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;

// With GITHUB_TOKEN set, read the calendar from GitHub's official GraphQL API.
async function fromGraphQL(login: string, token: string): Promise<Contributions | null> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
  });
  if (!res.ok) return null;
  type Day = { date: string; contributionCount: number; contributionLevel: string };
  type Calendar = { totalContributions: number; weeks: { contributionDays: Day[] }[] };
  const json = (await res.json()) as { data?: { user?: { contributionsCollection?: { contributionCalendar?: Calendar } } } };
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) return null;
  const days: ContributionDay[] = cal.weeks.flatMap((w) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVELS[d.contributionLevel] ?? 0 })),
  );
  return { total: cal.totalContributions, days };
}

// Without a token: GitHub's own public calendar fragment, which includes private
// contributions when "Private contributions" is on in the profile settings.
async function fromProfilePage(login: string): Promise<Contributions | null> {
  const res = await fetch(`https://github.com/users/${encodeURIComponent(login)}/contributions`);
  if (!res.ok) return null;
  const html = await res.text();
  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip[^>]*\sfor="([^"]+)"[^>]*>\s*(No|\d+) contributions?\b/g)) counts.set(m[1], m[2] === "No" ? 0 : Number(m[2]));
  const days: ContributionDay[] = [];
  for (const m of html.matchAll(/<td\b[^>]*>/g)) {
    const tag = m[0];
    const date = /data-date="([^"]+)"/.exec(tag)?.[1], id = /\bid="([^"]+)"/.exec(tag)?.[1], level = Number(/data-level="(\d)"/.exec(tag)?.[1]);
    if (date && id && counts.has(id) && level >= 0 && level <= 4) days.push({ date, count: counts.get(id)!, level: level as ContributionDay["level"] });
  }
  if (days.length === 0) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));
  return { total: days.reduce((n, d) => n + d.count, 0), days };
}

// Last resort: a public mirror of the profile calendar. Private work is counted only
// when "Private contributions" is switched on in the GitHub profile settings.
async function fromPublic(login: string): Promise<Contributions | null> {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(login)}?y=last`);
  if (!res.ok) return null;
  const json = (await res.json()) as { total?: { lastYear?: number }; contributions?: ContributionDay[] };
  if (!Array.isArray(json?.contributions)) return null;
  return { total: json.total?.lastYear ?? 0, days: json.contributions! };
}

const safe = (p: Promise<Contributions | null>) => p.catch(() => null);

export async function getContributions(login: string): Promise<Contributions | null> {
  const token = process.env.GITHUB_TOKEN;
  return (token && (await safe(fromGraphQL(login, token)))) || (await safe(fromProfilePage(login))) || (await safe(fromPublic(login)));
}
