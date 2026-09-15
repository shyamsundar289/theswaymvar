import https from "https";

https
  .get("https://theswaymvar-eweb.vercel.app/", (res) => {
    let body = Buffer.alloc(0);
    res.on("data", (d) => {
      body = Buffer.concat([body, d]);
    });
    res.on("end", () => {
      const html = body.toString("utf8");
      const matches = html.match(/videocover[^\"]+/g);
      console.log("Matches:", matches ? [...new Set(matches)] : "None");
    });
  })
  .on("error", (e) => {
    console.error(e);
  });
