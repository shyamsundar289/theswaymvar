import https from "https";

const options = {
  hostname: "api.github.com",
  path: "/repos/shyamsundar289/theswaymvar/releases",
  headers: { "User-Agent": "Node.js" },
};

https
  .get(options, (res) => {
    let body = Buffer.alloc(0);
    res.on("data", (d) => {
      body = Buffer.concat([body, d]);
    });
    res.on("end", () => {
      console.log(body.toString("utf8"));
    });
  })
  .on("error", (e) => {
    console.error(e);
  });
