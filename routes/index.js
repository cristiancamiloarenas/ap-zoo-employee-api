var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const fs = require('fs');
const {Client} = require('pg');

const config = {
    connectionString: 'postgresql://doadmin:AVNS_bqJr3p5s5vkC7YV@db-postgresql-nyc3-07925-do-user-11579649-0.b.db.ondigitalocean.com:25060/defaultdb',
    // Beware! The ssl object is overwritten when parsing the connectionString
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync('routes/ca-certificate.crt.txt').toString(),
    },
}
const client = new Client(config)
client.connect();

/* GET home page. */
router.get('/readEmployees', (req, res) => {

    client.query('SELECT * FROM Empleados', (err, clientResponse) => {
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
    const query = 'INSERT INTO Empleados (id,nombre,apellido,edad,sexo) VALUES($1, $2, $3, $4, $5)';
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
    const query = 'UPDATE Empleados SET nombre=$2,apellido=$3,edad=$4, sexo=$5 WHERE id = $1';
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
    const query = 'DELETE FROM Empleados WHERE id= $1';
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
