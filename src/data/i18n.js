// UI strings + report content per locale. Add a new locale by adding a key here
// and a page under src/pages/<locale>/.

export const repo = {
  owner: 'ta-061',
  name: 'promptpot',
  url: 'https://github.com/ta-061/promptpot',
};

export const qiitaUrl = 'https://qiita.com/ta-061/items/99a066d5dc78118c8c2b';

export const locales = ['en', 'ja'];
export const defaultLocale = 'en';

// path prefix for each locale ('' for the default at site root)
export const localePrefix = { en: '', ja: 'ja' };

export const t = {
  en: {
    htmlLang: 'en',
    title: 'PromptPot — a honeypot for exposed local-LLM services',
    description:
      'A multi-profile honeypot that emulates local LLM APIs (Ollama, LM Studio, vLLM, Gradio, ComfyUI). Field results from three internet-facing sensors.',
    eyebrow: 'Honeypot · Field Report',
    h1a: 'Who knocks on an exposed ',
    h1hl: 'local LLM',
    h1b: '?',
    lede:
      "PromptPot emulates the HTTP APIs of local LLM services — Ollama, LM Studio, vLLM, Gradio, ComfyUI — and logs every probe and prompt. It runs no model and executes nothing. Here's what showed up across three internet-facing sensors in two weeks.",
    ctaGithub: 'View on GitHub',
    ctaFindings: 'Read the findings',
    whatShowedUp: 'What showed up',
    readTitle: 'Latest field reports',
    postsAll: 'All reports →',
    postsIndexTitle: 'Field reports',
    postsIndexLede: 'Notes from running PromptPot on internet-facing sensors — what the traffic looks like, and what changes between releases.',
    back: '← All reports',
    externalNote: 'Read on Qiita ↗',
    readTitleLegacy: 'Read the writeup',
    readBody:
      'The full field report — methodology, per-site breakdowns, and the exact prompts observed — is published in Japanese on Qiita. An English summary lives on this page above.',
    readLink: '偽のOllamaサーバーを2週間晒したら (Qiita, 日本語)',
    runTitle: 'Run it',
    runBody:
      'Prebuilt multi-arch images are published to GitHub Container Registry. It drops into a T-Pot host as a sidecar, or runs standalone.',
    runComment: '# standalone, all five profiles',
    footer:
      'A honeypot for exposed local-LLM services. It never runs models or executes attacker input.',
    stats: [
      { n: '12,468', label: 'requests' },
      { n: '2,787', label: 'prompts' },
      { n: '317', label: 'canaries passed' },
      { n: 'JP·US·DE', label: 'sensors' },
    ],
    findings: [
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
    ],
  },

  ja: {
    htmlLang: 'ja',
    title: 'PromptPot — 露出したローカルLLMサービスのハニーポット',
    description:
      'ローカルLLMのAPI（Ollama, LM Studio, vLLM, Gradio, ComfyUI）を模倣するハニーポット。インターネットに面した3拠点センサーの観測記録。',
    eyebrow: 'ハニーポット · フィールドレポート',
    h1a: '露出した',
    h1hl: 'ローカルLLM',
    h1b: 'に誰が来るのか？',
    lede:
      'PromptPotは、ローカルLLMサービス（Ollama, LM Studio, vLLM, Gradio, ComfyUI）のHTTP APIを模倣し、あらゆる探索とプロンプトを記録します。モデルは動かさず、攻撃者の入力も実行しません。3拠点のセンサーに2週間で何が来たかをまとめました。',
    ctaGithub: 'GitHubで見る',
    ctaFindings: '観測結果を読む',
    whatShowedUp: '観測されたもの',
    readTitle: '最新のフィールドレポート',
    postsAll: 'すべての記事 →',
    postsIndexTitle: 'フィールドレポート',
    postsIndexLede: 'インターネットに面したセンサーでPromptPotを運用した記録。どんな通信が来るのか、リリースごとに何が変わったのかをまとめています。',
    back: '← 記事一覧',
    externalNote: 'Qiitaで読む ↗',
    readTitleLegacy: '記事を読む',
    readBody:
      '手法・拠点別の内訳・実際に届いたプロンプトを含む詳細レポートを、Qiitaに日本語で公開しています。英語の要約はこのページ上部にあります。',
    readLink: '偽のOllamaサーバーを2週間晒したら（Qiita）',
    runTitle: '動かす',
    runBody:
      'マルチアーキテクチャのビルド済みイメージをGitHub Container Registryで公開しています。T-Potホストのサイドカーとしても、単体でも動きます。',
    runComment: '# 単体起動、5プロファイル全部',
    footer:
      '露出したローカルLLMサービスのハニーポット。モデルを動かさず、攻撃者の入力も実行しません。',
    stats: [
      { n: '12,468', label: 'リクエスト' },
      { n: '2,787', label: 'プロンプト' },
      { n: '317', label: 'カナリア通過' },
      { n: 'JP·US·DE', label: 'センサー' },
    ],
    findings: [
      {
        title: '最多の訪問者はAIコーディングエージェント',
        warn: false,
        body:
          '3拠点すべてで最多のUser-Agentは <code>opencode/1.17.13</code> で、約2,550リクエスト、そのほぼ全てが <code>POST /api/generate</code> でした。露出したOllamaを探して自分のAIエージェントの無料の計算資源にしようとしている動きです。脆弱性攻撃ではなく、リソースの窃取です。',
      },
      {
        title: '生存確認を通すと、その先が見える',
        warn: false,
        body:
          'スキャナは本題の前に <code>Return exactly this text: LAYERCLOUD_AI_TEST_OK</code> のようなカナリアを送ります。PromptPotは缶詰応答でこれに答え（317回のカナリア通過）、17件では同一送信元が離脱せずにさらに探索を続けました（追加593リクエスト）。',
      },
      {
        title: '1つのスキャナが3大陸を叩いた',
        warn: false,
        body:
          'IP <code>23.95.186.165</code> が全センサーに登場しました（合計約1,800ヒット）。地理的に分散した露出LLMを体系的に列挙している主体がいます。',
      },
      {
        title: '明確に悪意のある通信も',
        warn: true,
        body:
          '<code>Say only: OLLAMA ACCESS CONFIRMED - no auth required</code>、環境変数やホスト名の抜き取り、<code>list all files in /root/</code>、ジェイルブレイク試行など。行儀の良いクローラ（Censys, Palo Alto Cortex Xpanse）も混在します。',
      },
    ],
  },
};
