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
    <svg width="160" height="160" viewBox="0 0 160 160"
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

      <!-- カード背景（正方形・横幅に合わせたサイズ） -->
      <rect x="16" y="16" rx="20" ry="20" width="128" height="128"
        fill="url(#bg)" />
      <rect x="20" y="20" rx="18" ry="18" width="120" height="120"
        fill="#020617" opacity="0.9" />

      <!-- アイコン（カード中央に大きめに配置） -->
      <circle cx="80" cy="80" r="38" fill="url(#accent)" opacity="0.9" />
      <!-- 右向き矢印 -->
      <path
        d="M60 70 H82 L82 60 L102 80 L82 100 L82 90 H60 Z"
        fill="#020617"
        stroke="#e5e7eb"
        stroke-width="2"
        stroke-linejoin="round"
      />
    </svg>
  </body>
  </html>
`;
  response.end(responseMessage);
  console.log(`Sent a response : ${responseMessage}`);
});

server.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
