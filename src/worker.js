// Workers entry: serve static assets, plus a small /api/views endpoint that
// reads Cloudflare Web Analytics via the GraphQL API using a server-side secret.

const SITE_TAG = '9385fd5fe6d940a0ae9a0e8c1503323c'; // Web Analytics site token
const GRAPHQL = 'https://api.cloudflare.com/client/v4/graphql';

async function getViews(env) {
  if (!env.CF_API_TOKEN || !env.CF_ACCOUNT_ID) return null;
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
  const r = await fetch(GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.CF_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) return null;
  const d = await r.json();
  const groups =
    d?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups ?? [];
  return groups.reduce((sum, g) => sum + (g.count || 0), 0);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/views') {
      const views = await getViews(env);
      return new Response(JSON.stringify({ views }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }
    // everything else -> static assets
    return env.ASSETS.fetch(request);
  },
};
