const router = require("express").Router();
const Note = require("../models/Note");

router.get("/", (req, res)=>{
    Note.find({}, (err, results)=>{
        if(err) throw new Error(err);
        res.send(results);
    });
});

router.post("/", (req, res)=>{
    const newNote = req.body;
    Note.create(newNote, (err, result)=>{
        if(err) throw new Error(err);
        res.send(result);
    });
});

router.put("/:id", (req, res)=>{
    Note.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, result)=>{
        if(err) throw new Error(err);
        res.send(result);
    });
});

router.delete("/:id", (req, res)=>{
    Note.findOneAndRemove({_id: req.params.id}, (err, result)=>{
        res.send("Successfully deleted document from database.");
    });
});


module.exports = router;