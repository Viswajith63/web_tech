const express = require('express');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

// MySQL Connection
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todoapp'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});

// Routes
app.get('/', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) throw err;
        console.log(results)
        return res.render("index.ejs",{data:results})
    });
});

app.post('/todos', (req, res) => {
    var data=req.body;
    db.query('INSERT INTO todos (task, completed) VALUES (?, 0)', [data.task], (err, result) => {
        if (err) throw err;
        res.redirect("/");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
