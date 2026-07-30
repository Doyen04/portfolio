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

  const apiUrl = `https://api.screenshotone.com/animate?access_key=${key}&url=${encodeURIComponent(url)}&format=webm&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=false&block_trackers=true&delay=0&timeout=60&scenario=scroll&duration=30&scroll_delay=500&scroll_duration=1500&scroll_by=1000&scroll_start_immediately=true&scroll_back=true&scroll_complete=true&scroll_easing=ease_in_out_quint`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return NextResponse.json({ error: 'Screenshot fetch failed' }, { status: 502 });
    }
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'video/webm',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Screenshot fetch failed' }, { status: 502 });
  }
}
