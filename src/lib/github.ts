import { GitHubRepo } from '@/types/github';

const GITHUB_API = 'https://api.github.com';
const GITHUB_USER = 'Doyen04';

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
    const token = process.env.GITHUB_TOKEN;

    const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(
            `${GITHUB_API}/users/${GITHUB_USER}/repos?sort=stars&per_page=100`,
            {
                headers,
                next: { revalidate: 3600 }, // Revalidate every hour
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const repos = await response.json();
        return repos.filter((repo: { fork: boolean }) => !repo.fork);
    } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
        return [];
    }
}

export async function getRepositoryByName(name: string): Promise<GitHubRepo | null> {
    const repos = await getGitHubRepos();
    return repos.find((repo) => repo.name === name) || null;
}
