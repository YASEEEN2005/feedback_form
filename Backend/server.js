const express = require('express');
const connectDb = require('./Config/db');
const router = require('./Router/formRouter');
const cors = require('cors')
const app = express()
const port = 'https://feedbackformback.vercel.app/';
require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDb();
app.get('/',(req,res)=>{
    res.send("Welcome")
})

app.use('/form',router)

app.listen(port,()=>{
    console.log(`${port}`);
    
})