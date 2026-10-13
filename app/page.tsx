import { PortfolioHome } from "../components/portfolio-home.tsx";
import { GithubActivity } from "../components/github-activity.tsx";
import { site } from "../content/site.ts";

// Rebuild the page (and refresh the GitHub graph) at most every 6 hours.
export const revalidate = 21600;

export default function Home() {
  return <PortfolioHome activity={<GithubActivity login={site.githubUser} profile={site.github} />} />;
}
