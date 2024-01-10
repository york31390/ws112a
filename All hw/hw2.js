import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const rooms = new Map();
rooms.set("e320", "多媒體教室");
rooms.set("e319", "嵌入式實驗室");

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = `<a href="https://www.nqu.edu.tw/">金門大學</a>`;
  })
  .get("/book", (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  })
  .get("/room/:id", (context) => {
    if (context.params && context.params.id && rooms.has(context.params.id)) {
      context.response.body = rooms.get(context.params.id);
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000');
await app.listen({ port: 8000 });