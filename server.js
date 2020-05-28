const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const compression= require('compression');

const comments= require('./routes/comments');
const app =express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const db= require('./config/keys').mongoUri;
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log("mongo connected"))
.catch(err=>console.log(err));

app.use(compression());

app.use('/comment',comments);

if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
} 

const port=  process.env.PORT||5000;

app.listen(port,()=>console.log(`server running in ${port}`));