import { ArrowUpRight } from "lucide-react";
import { getContributions, type ContributionDay } from "../lib/github.ts";
import { Reveal } from "./portfolio-home.tsx";

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
const utc = (date: string) => new Date(`${date}T00:00:00Z`);

function longestStreak(days: ContributionDay[]) {
  let longest = 0, run = 0;
  for (const d of days) { run = d.count > 0 ? run + 1 : 0; longest = Math.max(longest, run); }
  return longest;
}

export async function GithubActivity({ login, profile }: { login: string; profile: string }) {
  const data = await getContributions(login);
  if (!data || data.days.length === 0) return null;

  // Columns are weeks starting on Sunday, like GitHub's own calendar.
  const cells: (ContributionDay | null)[] = [...Array(utc(data.days[0].date).getUTCDay()).fill(null), ...data.days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const labels = weeks.map((week, i) => {
    const first = week.find(Boolean);
    const prev = weeks[i - 1]?.find(Boolean);
    if (!first || (prev && utc(prev.date).getUTCMonth() === utc(first.date).getUTCMonth())) return "";
    return i === 0 && utc(first.date).getUTCDate() > 7 ? "" : monthFmt.format(utc(first.date));
  });

  const active = data.days.filter((d) => d.count > 0).length;
  const best = Math.max(...data.days.map((d) => d.count));
  const stats: [string, string][] = [
    [data.total.toLocaleString("en-GB"), "CONTRIBUTIONS · LAST YEAR"],
    [String(active), "ACTIVE DAYS"],
    [`${longestStreak(data.days)}d`, "LONGEST STREAK"],
    [String(best), "MOST IN A DAY"],
  ];

  return <section className="github frame"><Reveal className="section-head"><p className="eyebrow">06 / ON GITHUB</p><h2>Consistent practice,<br/><em>commit by commit.</em></h2></Reveal><div className="gh-activity">
    <div className="gh-stats">{stats.map(([n, l]) => <div key={l}><span>{n}</span><small>{l}</small></div>)}</div>
    <div className="gh-graph" role="img" aria-label={`${data.total} GitHub contributions in the last year`}>
      {/* Weeks are rendered newest first inside a row-reverse scroller, so narrow screens open on the latest weeks. */}
      <div className="gh-weeks" aria-hidden>
        {weeks.map((week, i) => ({ week, i })).reverse().map(({ week, i }) => <div className="gh-week" key={i}>
          <b>{labels[i]}</b>
          {Array.from({ length: 7 }, (_, d) => week[d]).map((day, d) => day
            ? <i key={d} className={`l${day.level}`} title={`${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} on ${fmt.format(utc(day.date))}`} />
            : <i key={d} className="empty" />)}
        </div>)}
      </div>
    </div>
    <div className="gh-foot">
      <span className="gh-legend">LESS {[0, 1, 2, 3, 4].map((l) => <i key={l} className={`l${l}`} />)} MORE</span>
      <a href={profile} target="_blank" rel="noreferrer">VIEW GITHUB PROFILE <ArrowUpRight size={15} /></a>
    </div>
  </div></section>;
}
