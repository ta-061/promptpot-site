// Workers entry: serve static assets, plus a small /api/views endpoint that
// reads Cloudflare Web Analytics via the GraphQL API using a server-side secret.

const SITE_TAG = '9385fd5fe6d940a0ae9a0e8c1503323c'; // Web Analytics site token
const GRAPHQL = 'https://api.cloudflare.com/client/v4/graphql';

async function getViews(env, debug = false) {
  const wrap = (views, detail) => (debug ? { views, detail } : views);
  if (!env.CF_API_TOKEN || !env.CF_ACCOUNT_ID) return wrap(null, 'missing_secret');
  const end = new Date();
  const start = new Date(end.getTime() - 30 * 24 * 3600 * 1000);
  const iso = (d) => d.toISOString();
  const query = `
    query Views($accountTag: String!, $siteTag: String!, $start: Time!, $end: Time!) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          rumPageloadEventsAdaptiveGroups(
            limit: 1
            filter: { siteTag: $siteTag, datetime_geq: $start, datetime_leq: $end }
          ) {
            count
          }
        }
      }
    }`;
  const body = {
    query,
    variables: {
      accountTag: env.CF_ACCOUNT_ID,
      siteTag: SITE_TAG,
      start: iso(start),
      end: iso(end),
    },
  };
  let r;
  try {
    r = await fetch(GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.CF_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    return wrap(null, 'fetch_failed: ' + e.message);
  }
  if (!r.ok) return wrap(null, 'http_' + r.status);
  const d = await r.json();
  if (d.errors && d.errors.length) {
    return wrap(null, 'graphql_error: ' + d.errors.map((e) => e.message).join('; '));
  }
  const groups =
    d?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups ?? [];
  const total = groups.reduce((sum, g) => sum + (g.count || 0), 0);
  return wrap(total, 'ok');
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/views') {
      const debug = url.searchParams.has('debug');
      const result = await getViews(env, debug);
      const views = debug ? result.views : result;
      const payload = debug
        ? { views, hasToken: !!env.CF_API_TOKEN, hasAccount: !!env.CF_ACCOUNT_ID, detail: result.detail }
        : { views };
      return new Response(JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': debug ? 'no-store' : 'public, max-age=3600',
        },
      });
    }
    // everything else -> static assets
    return env.ASSETS.fetch(request);
  },
};
