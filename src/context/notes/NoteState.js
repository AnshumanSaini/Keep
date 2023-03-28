import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "6420b0832c9da07f3d90b223",
          "user": "641f2f5c3159ac1490938353",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "Personal",
          "date": "2023-03-26T20:52:19.942Z",
          "__v": 0
        },
        {
          "_id": "64236590e27e803b47fdaaf5",
          "user": "641f2f5c3159ac1490938353",
          "title": "My title 2",
          "description": "Please wake up early 2",
          "tag": "Personal",
          "date": "2023-03-28T22:09:20.920Z",
          "__v": 0
        },
        {
            "_id": "6420b0832c9da07f3d90b223",
            "user": "641f2f5c3159ac1490938353",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2023-03-26T20:52:19.942Z",
            "__v": 0
        },
        {
            "_id": "64236590e27e803b47fdaaf5",
            "user": "641f2f5c3159ac1490938353",
            "title": "My title 2",
            "description": "Please wake up early 2",
            "tag": "Personal",
            "date": "2023-03-28T22:09:20.920Z",
            "__v": 0
        },
        {
            "_id": "6420b0832c9da07f3d90b223",
            "user": "641f2f5c3159ac1490938353",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2023-03-26T20:52:19.942Z",
            "__v": 0
        },
        {
            "_id": "64236590e27e803b47fdaaf5",
            "user": "641f2f5c3159ac1490938353",
            "title": "My title 2",
            "description": "Please wake up early 2",
            "tag": "Personal",
            "date": "2023-03-28T22:09:20.920Z",
            "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)
    return (
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;