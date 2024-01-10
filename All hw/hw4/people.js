import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const peoples = new Map();
peoples.set("john", {
  name: "john",
  psw: "082-313345",
});
peoples.set("mary", {
  name: "mary",
  psw: "082-313543",
});

const router = new Router();
router
  .get("/", (ctx) => {
    ctx.response.redirect('http://127.0.0.1:8000/public/index.html')
  })
  .get("/people", (ctx) => {
    ctx.response.body = Array.from(peoples.values());
  })
  .post("/people/add", async (ctx) => {
    const body = ctx.request.body()
    if (body.type === "form") {
      const pairs = await body.value
      console.log('pairs=', pairs)
      const params = {}
      for (const [key, value] of pairs) {
        params[key] = value
      }
      console.log('params=', params)
      let name = params['name']
      let psw = params['psw']
      console.log(`name=${name} psw=${psw}`)
      if (peoples.get(name)) {
        ctx.response.type = 'text/html'
        ctx.response.body = `<p>此帳號已存在</p>`
      } else {
        peoples.set(name, {name, psw})
        ctx.response.type = 'text/html'
        ctx.response.body = `<p>註冊成功</p><p><a href="http://127.0.0.1:8000/public/index.html">返回登入介面</a></p>`
      }
    }

  })
  .post("/people/find", async (ctx) => {
    const body = ctx.request.body()
    if (body.type === "form") {
      const pairs = await body.value
      console.log('pairs=', pairs)
      const params = {}
      for (const [key, value] of pairs) {
        params[key] = value
      }
      console.log('params=', params)
      let name = params['name']
      let psw = params['psw']
      console.log(`name=${name} psw=${psw}`)
      if (peoples.get(name)&&psw==peoples.get(name).psw) {
        ctx.response.type = 'text/html'
        ctx.response.body = `<p>登入成功</p>`
      } else {
        ctx.response.type = 'text/html'
        ctx.response.body = `<p>登入失敗</p><p><a href="http://127.0.0.1:8000/public/find.html">重新登入</a></p>`
      }
      console.log("key:",peoples.get(name).psw)
    }
  })
  .get("/public/(.*)", async (ctx) => {
    let wpath = ctx.params[0]
    console.log('wpath=', wpath)
    await send(ctx, wpath, {
      root: Deno.cwd()+"/public/",
      index: "index.html",
    })
  })

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000')

await app.listen({ port: 8000 });