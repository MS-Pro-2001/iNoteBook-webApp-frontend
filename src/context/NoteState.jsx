import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { Button, message } from 'antd';

const authToken = localStorage.getItem('token')
const NoteState = (props) => {

  const host = "http://localhost:5000"

  const initialnotes = [];


  const [notes, setNotes] = useState(initialnotes)

  const key = 'updatable';

  const openMessage = () => {
    message.loading({ content: 'Deleting...', key });
    setTimeout(() => {
      message.success({ content: 'Note Deleted Successfully !', key, duration: 2 });
    }, 1000);
  };


  // Get all notes
  const getAllNotes = async () => {
    // ToDo: API call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: 'GET',


      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${authToken}`


      }

    });
    const json = await response.json();
     console.log(json) // parses JSON response into native JavaScript objects
    setNotes(json)


  }




  // Add a Note
  const AddNote = async (title, description, tag) => {
    // ToDo: API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',


      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${authToken}`


      },

      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const note = await response.json(); // parses JSON response into native JavaScript objects
  
    setNotes(notes.concat(note))

  }

  const DeleteNote = async (id,title,description,tag) => {
    openMessage();

    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',


      headers: {
        'Content-Type': 'application/json',
        'auth-token':`${authToken}`


      },

      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });


    setNotes(notes.filter((note) => { return note._id !== id }))
    console.log("NOtes Delete successfully",response)
  }


  //EditNote

  const EditNote = async (id, title, description, tag) => {
    // API CALL

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',


      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${authToken}`
        // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlNjcwMmVmYmY4YzBiYWYwZTFlNGRiIn0sImlhdCI6MTY0MjQ5MTk1MH0.FXjxkpr1y0YQTXzNe8Dg0Ovf8dFFmqejofsmLS1eG2c"


      },

      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    // console.log(json)

    //Logic to edit client
    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    
      
    }
    // console.log(newNotes)
    setNotes(newNotes)

  }





  return (
    <NoteContext.Provider value={{ notes, setNotes, AddNote, DeleteNote, getAllNotes,EditNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
