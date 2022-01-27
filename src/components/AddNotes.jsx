import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'
import { Button, message } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const AddItem = () => {
  

  const context = useContext(NoteContext)
  const {AddNote} = context;

    const [state, setstate] = useState({title: "",description:"",tag:""})

    const onChange = (e)=>{

        setstate({...state,[e.target.name] : e.target.value})
        

    }

    const handleClick = (e)=>{
      e.preventDefault()
      
      AddNote(state.title,state.description,state.tag)
      document.getElementById('title').value = "";
      document.getElementById('description').value = "";
      document.getElementById('tag').value = "";
      setstate({title: "",description:"",tag:""})

      openMessage()

    }

    const key = 'updatable';

const openMessage = () => {
  message.loading({ content: 'Adding...', key });
  setTimeout(() => {
    message.success({ content: 'Note Added Successfully !', key, duration: 2 });
  }, 1000);
};
const UserName = JSON.parse(localStorage.getItem('credentials')).name


 

    return (
        <div className="container">
  
          
        <h2>Welcome {UserName}</h2>
      <form className="my-5">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label"  >
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
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
            id="description"
            name="description"
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
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>
      
     
        <Button disabled={state.title.length < 5 || state.description.length < 5 || state.tag.length < 5} onClick={handleClick} type='primary'>ADD</Button>
      </form>
      
    </div>
    )
}

export default AddItem
