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

//get methode 
router.get('/', async (req,res)=>{
     const result = await cluster.execute('SELECT * FROM todo_items');
    res.json(result.rows);

})

//post methode
router.post('/', async (req,res)=>{
    const id = cassandra.types.Uuid.random();
    const {name}=res.body;
    const query = "INSERT INTO todo_items(id, name, completed) VALUES (?, ?, ?)";
    const result = await cluster.execute(query,[id,name,false]);
    res.status(200).send(result);
}) 

//update methode 
router.upadte('/', async (req,res)=>{
    const {id} = req.params;
    const {completed} = req.body;
    const query = "UPDATE FROM items SET completed=?  WHERE id=?";
    const result = await cluster.execute(query, [id,completed]);
    res.status(200).send();
}) 

//delete methode
router.delete('/', async (req,res)=>{
    const {id} = req.params;
    const query = "DELETE FROM items WHERE id=?";
    const result = await cluster.execute(query, [id]);
    res.status(200).send();
}) 


module.exports = router;
