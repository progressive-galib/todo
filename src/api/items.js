const express = require("express")

const items = [
    {id:1, name:"fetch schooby snacks", completed:"false"},
    {id:2, name:"finsh assignments", completed:"false"},
    {id:3, name:"attend yoga", completed:"false"},
]

const router = express.Router();

router.get('/',(req,res)=>{
    res.json({items})
})

module.exports = router;