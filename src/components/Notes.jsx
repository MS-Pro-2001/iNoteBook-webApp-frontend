import React, { useContext } from 'react'
import NoteContext from "../context/NoteContext"

const Notes = () => {
    

    const context = useContext(NoteContext)
    const {notes} = context

    return (
        <div>
            <h1>Your Notes are listed here...</h1>
            {notes.map((item)=>{
                return item.title

            })}
            
        </div>
    )
}

export default Notes
