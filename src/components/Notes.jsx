import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/NoteContext"
import NoteItem from './NoteItem'


const Notes = () => {


    const context = useContext(NoteContext)
    const { notes, getAllNotes, EditNote } = context;
    const refClick = useRef(null)
    const refClose = useRef(null)


    useEffect(() => {
        getAllNotes()
        

    }, [])


   
    const [state, setstate] = useState({id:"",etitle: "",edescription:"",etag:""})

    const onChange = (e)=>{

        setstate({...state,[e.target.name] : e.target.value})
        

    }
    const handleClick=()=>{
        refClose.current.click();
        EditNote(state.id,state.etitle,state.edescription,state.etag)
        // console.log("Updating the note.....",state)
    }




    const UpdateNotes = (currentNote) => {
        
        refClick.current.click();
        setstate({ id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        // setNote({etitle:currentNote.title,edescription:currentNote.description})
        // console.log(state)

    }

    return (
        <div>


            <button type="button" ref={refClick} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">

            </button>


            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label"  >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        value={state.etitle}
                                        aria-describedby="emailHelp"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        value={state.edescription}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        value={state.etag}
                                        onChange={onChange}
                                    />
                                </div>

                              
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">ADD</button>
                            
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Notes are listed here...</h1>

            <div className="container" >
                <div className="row" >



                    {notes.map((note) => {
                        return (

                            <NoteItem note={note} key={note._id} UpdateNotes={UpdateNotes} />


                        )


                    })}

                </div>
            </div>

        </div>
    )
}

export default Notes
