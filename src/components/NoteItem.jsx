import React, { useContext } from 'react'
import { DeleteOutlined, EditFilled } from '@ant-design/icons'
import NoteContext from '../context/NoteContext';


const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const { DeleteNote } = context;
    const { note, UpdateNotes } = props;


    return (
        <>




            <div className="col">



                <div className="card text-white bg-primary mb-3" style={{ "maxWidth": "18rem" }}>
                    <div className="card-header">{note.title}</div>
                    <div className="card-body">

                        <p className="card-text">{note.description}</p>
                        <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => { DeleteNote(note._id) }} />
                        <EditFilled className='mx-4' style={{ cursor: 'pointer' }} onClick={()=>{UpdateNotes(note)}} />
                    </div>
                </div>
            </div>

        </>








    )
}

export default NoteItem
