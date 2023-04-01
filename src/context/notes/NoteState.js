import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);


    //Get all Notes
    const getNote = async () => {
      //TODO: API Call
      const response = await fetch(host+"/api/notes/fetchallnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZjJmNWMzMTU5YWMxNDkwOTM4MzUzIn0sImlhdCI6MTY3OTc3MTU4N30.fs64U80D04UhVInr5NvMVKsepv3rZ6DEM2ThSwo8XgU",
        },
      });

      const json = await response.json();
  
      console.log(json);
      setNotes(json);
    };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //TODO: API Call
    const response = await fetch(host+"/api/notes/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZjJmNWMzMTU5YWMxNDkwOTM4MzUzIn0sImlhdCI6MTY3OTc3MTU4N30.fs64U80D04UhVInr5NvMVKsepv3rZ6DEM2ThSwo8XgU",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json);



    const note = {
      _id: "6420b0832cfdsdfs9da07f3d90b223",
      user: "641f2f5c3159ac1490938353",
      title: title,
      description: description,
      tag: tag,
      date: "2023-03-26T20:52:19.942Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {

    //TODO: API Call
    const response = await fetch(host+"/api/notes/deletenote/"+id, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZjJmNWMzMTU5YWMxNDkwOTM4MzUzIn0sImlhdCI6MTY3OTc3MTU4N30.fs64U80D04UhVInr5NvMVKsepv3rZ6DEM2ThSwo8XgU",
      },
    });

      const json = await response.json();
      console.log(json);

    console.log(id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(host+"/api/notes/updatenote/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZjJmNWMzMTU5YWMxNDkwOTM4MzUzIn0sImlhdCI6MTY3OTc3MTU4N30.fs64U80D04UhVInr5NvMVKsepv3rZ6DEM2ThSwo8XgU",
      },
      body: JSON.stringify({title, description, tag}),
    });
    
    const json = await response.json();
    console.log(json);
    let newNote = JSON.parse(JSON.stringify(notes))

    //Logic to edit in Client
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNote);
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </noteContext.Provider>
  );
}
export default NoteState;
