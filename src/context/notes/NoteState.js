import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props)=>{

  const host = "http://localhost:5000"

const notesInitial = [
    {
        "_id": "6363f63cdb6124100d44618d",
        "user": "635a994fbe2da6b29fd6e241",
        "title": "My Title 2 ",
        "description": "Please wake up early aur thoda pad liya karo  ",
        "tag": "offensive",
        "date": "2022-11-03T17:11:24.012Z",
        "__v": 0
      },
      {
        "_id": "6363f63edb6124100d44618f",
        "user": "635a994fbe2da6b29fd6e241",
        "title": "My Title 2 ",
        "description": "Please wake up early aur thoda pad liya karo  ",
        "tag": "offensive",
        "date": "2022-11-03T17:11:26.070Z",
        "__v": 0
      }
    ]
    //we are using this just because we have to learn that how the context api works 
    // const s1={
    //     "name":"Sujal Sharma",
    //     "class":"Information Technology"
    // }

    // const[state, setstate] = useState(s1);

    // const update = ()=>{
    //     setInterval(() => {
    //         setstate({
    //             "name":"Sujal Sharma and this is upadted imformation",
    //             "class":"Information Technology"
    //         })
    //     }, 1000);
    // }

    const [notes,setNotes] = useState(notesInitial);


    //Add a note -->

    //Logic to addnote 
    const addNote = async(title,description,tag)=>{

    //Api Calls USing Fetch Api -->
    const response = await fetch(`${host}api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
   

      const note ={
        "_id": "6363f63cdb6124100d44618d",
        "user": "635a994fbe2da6b29fd6e241",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2022-11-03T17:11:24.012Z",
        "__v": 0
      }
      setNotes(notes.concat(note))
    }

    //Delete A note -->

    const deleteNote = (id)=>{

      console.log("Deleting Note With Id -" + id)
      const newNotes  = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes)
    }

    //Edit a note -->
   

  
    //Code For Client Side Tio Edit THE Data
    const editNote = (id,title,description,tag)=>{

          //Api Calls USing Fetch Api -->
    const response = fetch(`${host}api/notes/updatenote/${id}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    const json =  response.json(); // parses JSON response into native JavaScript objects

      //Logic to update in client side 
      for (let index = 0; index < notes.length; index++) {
        const element = array[index];
        if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
    }


return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
      {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;