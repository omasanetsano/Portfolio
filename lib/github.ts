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

// Without a token: a public mirror of the profile calendar. Private work is counted only
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
  return (token && (await safe(fromGraphQL(login, token)))) || (await safe(fromPublic(login)));
}
