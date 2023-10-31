const express = require("express")
const cassandra = require('cassandra-driver'); require('dotenv').config();

const { NODE1, NODE2, NODE3, LOCAL_DATA_CENTER, USERNAME, PASSWORD } =
    process.env;

const cluster = new cassandra.Client({
    contactPoints: [NODE1, NODE2, NODE3],
    localDataCenter: LOCAL_DATA_CENTER,
    credentials: { username: USERNAME, password: PASSWORD },
    keyspace: 'todo',
});


const items = [
    {id:1, name:"fetch schooby snacks", completed:"false"},
    {id:2, name:"finsh assignments", completed:"false"},
    {id:3, name:"attend yoga", completed:"false"},
]

const router = express.Router();

router.get('/',(req,res)=>{
    const result = cluster.execute('SELECT * FROM todo_items');
    res.json(result.rows);

})

module.exports = router;
