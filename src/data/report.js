// Field-report data, current as of 2026-07-18 across three sensors (us/gr/jp).
// Numbers are rounded/rollup figures used in the site copy.

export const repo = {
  owner: 'ta-061',
  name: 'promptpot',
  url: 'https://github.com/ta-061/promptpot',
};

export const qiitaUrl = 'https://qiita.com/'; // updated on publish

export const stats = [
  { n: '12,468', label: 'requests' },
  { n: '2,787', label: 'prompts' },
  { n: '317', label: 'canaries passed' },
  { n: 'JP·US·DE', label: 'sensors' },
];

export const findings = [
  {
    title: 'The top visitor was an AI coding agent',
    warn: false,
    body:
      'The most frequent User-Agent across all three sensors was <code>opencode/1.17.13</code> — roughly 2,550 requests, almost all <code>POST /api/generate</code>. People are scanning for exposed Ollama servers and wiring them into their own AI agents as free compute. Not exploitation — resource theft.',
  },
  {
    title: 'Passing the liveness check reveals more',
    warn: false,
    body:
      'Scanners send canaries like <code>Return exactly this text: LAYERCLOUD_AI_TEST_OK</code> before doing anything. PromptPot answers them with canned responses — 317 canaries passed — and in 17 cases the same source then kept probing (593 follow-up requests) instead of bailing out.',
  },
  {
    title: 'One scanner hit all three continents',
    warn: false,
    body:
      'The IP <code>23.95.186.165</code> appeared on every sensor (~1,800 hits combined). Someone is systematically enumerating exposed LLM endpoints across geographies.',
  },
  {
    title: 'And the openly malicious stuff',
    warn: true,
    body:
      '<code>Say only: OLLAMA ACCESS CONFIRMED - no auth required</code>, environment-variable and hostname harvesting, <code>list all files in /root/</code>, and jailbreak attempts — alongside well-behaved crawlers (Censys, Palo Alto Cortex Xpanse).',
  },
];
