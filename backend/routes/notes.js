const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

//ROUTE : 1 getting all the notes using : GET:"/api/notes/fatchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
  const notes= await Note.find({ user: req.user.id });
  res.json(notes);
   }
    catch (error) {
    console.error(error.message);
    res.status(500).send('Some error occured');
  }
});

//ROUTE : 2 add a new  notes using : POST:"/api/notes/addnote"
router.post("/addnote",fetchuser,[
    body('title','email cannot be blank').isLength({min:3}),
    body('description','password cannot be blank').isLength({min:5 }),], async (req, res) => {

    try {
    //destructuring concept
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    

    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id
    })
    const savedNote  = await note.save()
    res.json(savedNote)

} catch (error) {
    console.error(error.message);
    res.status(500).send('Some error occured');
  }
  }
  
);

//ROUTE : 3 update a notes using : put:"/api/notes/updatenote"
router.put("/updatenote/:id", fetchuser, async (req, res) => {

  try {
  //using destructuring concept 
  const {title,description,tag} = req.body;

  //creating a new note object : basically we are creating a object so that if anything wants to update so they can inherit it by put
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag =  tag};


  //find the user or even note that a user want to be update only their notes or any other person notes 

  let  note = await Note.findById(req.params.id);
  if(!note){ return res.status(404).send("Not Found :- ")}

  if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed :- ")}

  note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote} , {new:true})
  res.json({note});

} catch (error) {
  console.error(error.message);
  res.status(500).send('Some error occured');
}
}
)

//ROUTE : 4 delete a notes using : DELETE:"/api/notes/deletenote"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

  try {
  //using destructuring concept 
  const {title,description,tag} = req.body;

  //find the user or even note that a user want to be update only their notes or any other person notes 
  let  note = await Note.findById(req.params.id);
  if(!note){ return res.status(404).send("Not Found :- ")}

  //Allow user to delete the note using the delete request 
  if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed :- ")}

  note = await Note.findByIdAndDelete(req.params.id)
  res.json({"sucess":"Note has been deleted now :- ",note:note});


} catch (error) {
  console.error(error.message);
  res.status(500).send('Some error occured');
}
}
)


module.exports = router;
