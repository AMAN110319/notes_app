import React from 'react';
import Navbar from './notes/Nav';
import Home from './notes/Home';
import CreateNote from './notes/CreateNote';
import EditNote from './notes/EditNote';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './notes/style.css'

const Notes = ({setIsLogin}) => {
    return (
        <Router>
            <div className='notes-page'>
                <Navbar  setIsLogin={setIsLogin}/>
                <section>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/create' element={<CreateNote />} />
                        <Route exact path='/edit/:id' element={<EditNote />} />
                    </Routes>
                </section>
            </div>
        </Router>
    );
};

export default Notes;
