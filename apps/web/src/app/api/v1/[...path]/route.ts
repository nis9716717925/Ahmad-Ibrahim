import { NextRequest, NextResponse } from 'next/server';

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'transfer-encoding',
  'te',
  'trailer',
  'upgrade',
  'host',
  'content-length',
]);

function getBackendBaseUrl(): string | null {
  const raw = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  if (!raw) return null;
  return raw.replace(/\/$/, '').replace(/\/api\/v1$/, '');
}

async function proxy(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const backend = getBackendBaseUrl();
  if (!backend) {
    return NextResponse.json(
      {
        message:
          'API is not configured. Add API_URL in Vercel (your deployed backend URL, e.g. https://your-api.onrender.com) and redeploy.',
      },
      { status: 503 },
    );
  }

  const { path } = await context.params;
  const target = new URL(`/api/v1/${path.join('/')}${req.nextUrl.search}`, backend);

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (!HOP_BY_HOP.has(lower)) {
      headers.set(key, value);
    }
  });

  const init: RequestInit = {
    method: req.method,
    headers,
    redirect: 'manual',
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = await req.arrayBuffer();
  }

  let res: Response;
  try {
    res = await fetch(target, init);
  } catch {
    return NextResponse.json(
      {
        message: `Cannot reach the API at ${backend}. Check that the backend is running and API_URL is correct.`,
      },
      { status: 502 },
    );
  }

  const responseHeaders = new Headers();
  res.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  return new NextResponse(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
