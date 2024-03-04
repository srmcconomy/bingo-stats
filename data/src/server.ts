Bun.serve({
  port: 3001,
  async fetch(req) {
    const path = new URL(req.url).pathname;
    const file = Bun.file("./out/" + path);
    const res = new Response(file);
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    return res;
  },
});
