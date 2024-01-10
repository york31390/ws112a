import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

const nquHandler = (ctx) => {
  ctx.response.body = `<a href="https://www.nqu.edu.tw/">金門大學</a>`;
};

const nquCsieHandler = (ctx) => {
  ctx.response.body = `<a href="https://www.nqu.edu.tw/csie/">金門大學資工系</a>`;
};

const redirectNquHandler = (ctx) => {
  ctx.redirect("https://www.nqu.edu.tw/");
};

const redirectNquCsieHandler = (ctx) => {
  ctx.redirect("https://www.nqu.edu.tw/csie/");
};

app.use("/nqu", nquHandler);
app.use("/nqu/csie", nquCsieHandler);
app.use("/to/nqu", redirectNquHandler);
app.use("/to/nqu/csie", redirectNquCsieHandler);

console.log("start at : http://127.0.0.1:8000");
await app.listen({ port: 8000 });

