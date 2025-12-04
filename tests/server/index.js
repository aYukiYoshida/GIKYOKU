const http = require("http");
const port = 3000;

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });

  const responseMessage = `
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>Hello World</title>
  </head>
  <body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#0f172a;">
    <!-- コンテンツは SVG のみ -->
    <svg width="360" height="160" viewBox="0 0 360 160"
         xmlns="http://www.w3.org/2000/svg" role="img"
         aria-labelledby="title desc">
      <title id="title">Hello from the server</title>
      <desc id="desc">A simple hello world banner rendered as SVG.</desc>

      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#6366f1"/>
        </linearGradient>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f97316"/>
          <stop offset="100%" stop-color="#ec4899"/>
        </linearGradient>
      </defs>

      <!-- カード背景 -->
      <rect x="16" y="16" rx="20" ry="20" width="328" height="128"
            fill="url(#bg)" />
      <rect x="20" y="20" rx="18" ry="18" width="320" height="120"
            fill="#020617" opacity="0.9" />

      <!-- 左側アイコン的な図形 -->
      <circle cx="70" cy="80" r="30" fill="url(#accent)" opacity="0.9" />
      <path d="M55 80 L70 65 L85 80 L70 95 Z"
            fill="#020617" stroke="#e5e7eb" stroke-width="1.2"
            stroke-linejoin="round" />

      <!-- テキスト -->
      <text x="130" y="80" fill="#e5e7eb"
        font-family="'Noto Sans JP', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        font-size="22" font-weight="600"
        dominant-baseline="middle">
        Hello World
      </text>
    </svg>
  </body>
  </html>
`;
  response.end(responseMessage);
  console.log(`Sent a response : ${responseMessage}`);
});

server.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
