import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  const key = process.env.SCREENSHOTONE_KEY;
  if (!key) {
    return NextResponse.json({ error: 'Server config error' }, { status: 500 });
  }

  const apiUrl = `https://api.screenshotone.com/take?access_key=${key}&url=${encodeURIComponent(url)}&viewport_width=1440&viewport_height=900&format=png&image_quality=80&device_scale_factor=2&block_ads=true&block_banners_by_heuristics=true&block_cookie_banners=true&block_chats=true&block_trackers=true`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return NextResponse.json({ error: 'Screenshot fetch failed' }, { status: 502 });
    }
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': response.headers.get('content-type') || 'image/png',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Screenshot fetch failed' }, { status: 502 });
  }
}
