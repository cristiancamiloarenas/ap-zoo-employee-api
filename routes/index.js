var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const fs = require('fs');
const {Client} = require('pg');

const connectionData = {
    user: 'postgres',
    host: 'database-1.c19z1eoho6zx.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
}

const client = new Client(connectionData)
client.connect();

/* GET home page. */
router.get('/readEmployees', (req, res) => {
    client.query('select * FROM Empleado', (err, clientResponse) => {
        console.log(err, clientResponse);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            error: err,
            n_rows: clientResponse.rows.length,
            rows: clientResponse.rows
        })
    })
})

router.post("/createEmployee", (req, res) => {
    const query = 'INSERT INTO Empleado (id,nombre,apellido,edad,sexo) VALUES($1, $2, $3, $4, $5)';
    const values = [req.body.id,req.body.nombre,req.body.apellido,req.body.edad,req.body.sexo];

    client.query(query,values, (err, clientResponse) => {
        console.log(err, clientResponse);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            error: err
        })
    })
})

router.put("/updateEmployee", (req, res) => {
    const query = 'UPDATE Empleado SET nombre=$2,apellido=$3,edad=$4, sexo=$5 WHERE id = $1';
    const values = [req.body.id,req.body.nombre,req.body.apellido,req.body.edad,req.body.sexo];

    client.query(query,values, (err, clientResponse) => {
        console.log(err, clientResponse);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            error: err
        })
    })
})

router.delete("/deleteEmployee", (req, res) => {
    const query = 'DELETE FROM Empleado WHERE id= $1';
    const values = [req.body.id];

    client.query(query,values, (err, clientResponse) => {
        console.log(err, clientResponse);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            error: err
        })
    })
})
module.exports = router;
