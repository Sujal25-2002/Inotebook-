import React, { useState } from 'react'
import {useContext}from 'react'
import noteContext from "../context/notes/noteContext";

const Addnotes = () => {
    const context = useContext(noteContext);
    const{addNote} = context;


    const [note,setNote] = useState({title:"",description:"",tag:"default"})
    const handleclick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }

    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
          <div className="container my-3">
      <div className="my-3">
        <h2>Add you're Note's here</h2>
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label my-4">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name='title'
          placeholder="name@example.com"
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          description
        </label>
        < input type='text'
          className="form-control"
          id="description"
          name='description'
          rows="3"
          onChange={onChange}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleclick}>Add Note</button>
    </div>
    </div>
  )
}

export default Addnotes
