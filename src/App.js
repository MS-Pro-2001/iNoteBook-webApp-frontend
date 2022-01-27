import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/NoteState";
import { Spin} from 'antd';
import { useEffect, useState } from "react";




function App() {

  const [loading, setloading] = useState(true);


  useEffect(() => {
    setTimeout(() => {

      setloading(false)
      // console.log(loading)

      
    }, 3000);

  
  }, []);




  return (
    <NoteState>
      <Router>
      
        {loading?
        <>
        <div className="text-center my-5">
        <Spin tip="Loading..." size="large"/>
        </div>
       

        </>
          :
          <>
            <NavBar />
            <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signup" element={<SignUp/>} />
            <Route exact path="/login" element={<Login/>} />
          </Routes>
        </div>
          </>}
      
      </Router>
    </NoteState>
  );
}

export default App;
