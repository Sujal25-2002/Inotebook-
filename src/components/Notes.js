import React,{useContext}from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitems from './Noteitems';
import Addnotes from './Addnotes';

const Notes = () => {
    
    const context = useContext(noteContext);
    const{notes,addNote} = context;
  return (
    <>
    <Addnotes/>
    <div className="row my-3">
    <h2>You're Note's Here Safe With Us </h2>
    {notes.map((note)=>{
      return <Noteitems key={note._id} note={note}/>
    })}
  </div>
  </>
  )
  
}

export default Notes
