export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
        form {
            width: 300px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
  
        input[type="text"], input[type="password"] {
            width: calc(100% - 20px);
            margin-bottom: 10px;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
  
        input[type="submit"] {
            width: 100%;
            padding: 10px;
            font-size: 18px;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
  
        input[type="submit"]:hover {
            background-color: #0056b3;
        }
  
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `
  }
  
  export function loginUi() {
    return layout('Login', `
    <h1>登入</h1>
    <form action="/login" method="post">
      <p><input type="text" placeholder="用戶名稱" name="username"></p>
      <p><input type="password" placeholder="密碼" name="password"></p>
      <p><input type="submit" value="登入"></p>
      <p>新用戶？ <a href="/signup">建立新帳戶</p>
    </form>
    `)
  }
  
  export function signupUi() {
    return layout('Signup', `
    <h1>註冊</h1>
    <form action="/signup" method="post">
      <p><input type="text" placeholder="username" name="username"></p>
      <p><input type="password" placeholder="password" name="password"></p>
      <p><input type="text" placeholder="email" name="email"></p>
      <p><input type="submit" value="註冊"></p>
    </form>
    `)
  }
  
  export function success() {
    return layout('Success', `
    <h1>註冊成功!</h1>
    You may <a href="/">查看所有聯絡人</a> / <a href="/login">再次登入</a> again !
    `)
  }
  
  export function fail() {
    return layout('Fail', `
    <h1>Fail!</h1>
    You may <a href="/">查看所有聯絡人</a> or <a href="JavaScript:window.history.back()">go back</a> !
    `)
  }
  
  export function list(posts, user) {
    console.log('list: user=', user)
    let list = []
    for (let post of posts) {
      list.push(`
      <li>
        <h2>${ post.title } -- by ${post.username}</h2>
        <p><a href="/post/${post.id}">查看貼文</a></p>
      </li>
      `)
    }
    let content = `
    <head>
      <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        padding: 20px;
      }
  
      h1 {
        color: #333;
      }
  
      p {
        margin-bottom: 15px;
      }
  
      form {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      input[type="text"],
      textarea {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
      }
  
      input[type="submit"] {
        background-color: #4caf50;
        color: #fff;
        border: none;
        padding: 15px 20px;
        font-size: 18px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
  
      input[type="submit"]:hover {
        background-color: #45a049;
      }
  
      </style>
    </head>
    <h1>貼文串</h1>
    <p>${(user==null)?'<a href="/login">登入</a> 創建新貼文！':'歡迎 '+user.username+'　　　　　　　<a href="/logout">登出</a>'}</p>
    <p>這裡有 <strong>${posts.length}</strong> 篇貼文</p>
    <ul id="posts">
      ${list.join('\n')}
    </ul>
    `
    return layout('Posts', content)
  }
  
  export function newPost() {
    return layout('New Post', `
    <h1>New Post</h1>
    <p>Create a new post.</p>
    <form action="/post" method="post">
      <p><input type="text" placeholder="Title" name="title"></p>
      <p><textarea placeholder="Contents" name="body"></textarea></p>
      <p><input type="submit" value="Create"></p>
    </form>
    `)
  }
  
  export function show(post) {
    return layout(post.title, `
      <h1>${post.title} -- by ${post.username}</h1>
      <p>${post.body}</p>
    `)
  }