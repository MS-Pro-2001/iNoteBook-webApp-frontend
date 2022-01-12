import React from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const notes = [
        {
          "_id": "61dd2c902810fbe5cf053f55",
          "user": "61dc7ab4ef3d82e934a58da1",
          "title": "Note 2",
          "description": "Dont wake up early",
          "tag": "personal",
          "date": "2022-01-11T07:06:56.700Z",
          "__v": 0
        },
        {
          "_id": "61debdae69ddfdece48af822",
          "user": "61dc7ab4ef3d82e934a58da1",
          "title": "Note 3",
          "description": "Dont wake up early yay",
          "tag": "personal",
          "date": "2022-01-12T11:38:22.446Z",
          "__v": 0
        }
      ]



  return (
    <NoteContext.Provider value={{notes}}>
        {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
