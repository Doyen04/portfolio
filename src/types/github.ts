export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

export interface FeaturedProject {
  repoSlug: string;
  displayName: string;
  description: string;
  tags: string[];
}
