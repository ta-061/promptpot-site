// Workers entry: serve the static site. No server-side analytics — page views
// are read from the Cloudflare Web Analytics dashboard, and the only number
// shown on the site (GitHub stars) comes from the public GitHub API client-side.

export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
