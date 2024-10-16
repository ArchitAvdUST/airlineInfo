const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');

const app = express();
app.PORT = 3002;

app.use(express.json());

app.listen(app.PORT, () => {
    console.log(`Server is running on port ${app.PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass@word1',
    database: 'airlineInfo'
});

app.get('/flights', (req,res) => {
    const sql = "SELECT * FROM flight;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/flights', (req,res) => {
    const { id, airlineId, flightType, model , source, destination} = req.body;
    const sql = "INSERT INTO flight values( ?, ?,?,?,?,?);";
    db.query(sql,[req.body.id, req.body.airlineId, req.body.flightType, req.body.model, req.body.source, req.body.destination], (err, result) => {
        if(err)
        {
            res.status(500).json({error: "Error creating flights"});
        }
        else{
            res.status(200).json({message: "Flight created successfully"});
        }
    });
});

app.get('/flights/:id', (req, res) => {
    const sql = "SELECT * FROM flight WHERE id = ?;";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
