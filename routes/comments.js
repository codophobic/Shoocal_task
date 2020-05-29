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
});

router.post('/upvote',async(req,res)=>{
  let id= req.body.id;

  await Commentmodel.findOne({_id:id}).then(doc=>{
    let x= doc.upvotes;
    x++;
    doc.upvotes=x;
     doc.save();
  })
});

router.post('/downvote',async(req,res)=>{
  let id= req.body.id;

  await Commentmodel.findOne({_id:id}).then(doc=>{
    let x= doc.downvotes;
    x++;
    doc.downvotes=x;
    doc.save();
  })
});


module.exports= router;