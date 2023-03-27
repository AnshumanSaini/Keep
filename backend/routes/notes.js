const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the notes using: POST "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try
    {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Some error occured");
    }
})

//ROUTE 2: Add a new note using: POST "/api/auth/addnote". Login required
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be alteast 5 characters').isLength({min: 5}),
], async (req, res)=>{
    try
    {
        //If there are errors, return bad request and errors.
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({errors: err.array()});
        }

        const note = new Notes({
            title: req.body.title, 
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id
        })

        const savenotes = await note.save();
        res.json(savenotes);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Some error occured");
    }
})

//ROUTE 3: Update an existing note using: PUT "/api/auth/updatenote". Login required
router.put('/updatenote/:id', fetchuser,[
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be alteast 5 characters').isLength({min: 5}),
], async (req, res)=>{
    try
    {
        const title = req.body.title;
        const description = req.body.description;
        const tag = req.body.tag;
        
        //Create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //find the note to be updated and update it.
        let note = await Notes.findById(req.params.id);
        if(!note)
        {
            return res.status(400).send("Not Found!!!!");
        }
        if(note.user.toString()!==req.user.id)
        {
            return res.status(401).send("Not Allowed!!!!");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json(note);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Some error occured");
    }
});

//ROUTE 4: Delete an existing note using: DELETE "/api/auth/deleetnote". Login required
router.delete('/deletenote/:id', fetchuser,[
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be alteast 5 characters').isLength({min: 5}),
], async (req, res)=>{
    try
    {
        //find the note to be deleted and delete it.
        let note = await Notes.findById(req.params.id);
        if(!note)
        {
            return res.status(400).send("Not Found!!!!");
        }
        //Allow deletion only if the user ownes this Note.
        if(note.user.toString()!==req.user.id)
        {
            return res.status(401).send("Not Allowed!!!!");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Some error occured");
    }
});
module.exports = router