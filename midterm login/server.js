const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json());

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'user' && password === 'password') {
        res.json({ success: true, message: '登入成功' });
    } else {
        res.json({ success: false, message: '登入失敗' });
    }
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    res.json({ success: true, message: '註冊成功' });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
