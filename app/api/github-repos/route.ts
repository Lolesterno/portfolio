import { NextResponse } from "next/server";

const GITHUB_USERNAME = 'Lolesterno'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN


export async function GET() {
    const headers: HeadersInit = {
        Accept: 'application/vnd.github+json',
    };

    if (GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
    }

    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12&type=public`,
        { headers, next: { revalidate: 3600 } }
    )

    if (!res.ok) return NextResponse.json({ error: 'Github API Error' }, { status: res.status });

    const repos = await res.json();

    const filtered = repos.filter((r: any) => !r.fork)
        .map((r: any) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            url: r.html_url,
            updatedAt: r.updated_at,
            language: r.language,
            stars: r.stargazers_count,
        }));

    return NextResponse.json(filtered);
}