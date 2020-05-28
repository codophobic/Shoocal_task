const express = require("express");
const router = express.Router();
const Commentmodel= require('../models/commentModel');

router.post('/add', async(req,res)=>{
    const cdata={
        title:req.body.title,
        description:req.body.description,
        upvotes:0,
        downvotes:0
    };
    const comment = new Commentmodel(cdata);

    try{
        await comment.save();
        res.status(200).json({
            message:'comment posted'
        });
    }
    catch{
         res.status(500).json({
             message:'comment was not able to be posted',
             data:cdata,
         })
    }
});

router.get('/commentdata',async(req,res)=>{
  const allcomments=  await Commentmodel.find({});
  try {
    res.send(allcomments);
  } catch (err) {
    res.status(500).send(err);
  }
})


module.exports= router;