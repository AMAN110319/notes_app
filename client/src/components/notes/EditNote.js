import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
// import {format} from 'timeago.js';
const EditNote = () => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    id: ''
  });

  const { id } = useParams(); // Using useParams to access route parameters
  const navigate = useNavigate();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem('Token');
      if (id) {
        const res = await axios.get(`/api/notes/${id}`, {
          headers: { Authorization: token }
        });
        // console.log(res);
        setNote({
          title:res.data.title,
          content:res.data.content,
          date:new Date(res.data.date).toLocaleDateString(),
          id:res.data._id
        }); // Assuming the response contains data for the note
      }
    };
    getNote();
  }, [id]); // Adding id as a dependency to useEffect

  const onChangeInput = e => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const updateNote = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('Token');
      if (token) {
        const { title, content, date,id} = note;
        const updatedNote = { title, content, date };
        await axios.put(`/api/notes/${id}`, updatedNote, {
          headers: { Authorization: token }
        });
        return navigate('/');
      }
    } catch (error) {
      console.error(error);
      window.location.href = '/';
    }
  };

  return (
    <div className='create-note'>
      <h2>Edit Note</h2>
      <form onSubmit={updateNote} autoComplete='off'>
        <div className='row'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            value={note.title}
            id='title'
            name='title'
            required
            onChange={onChangeInput}
          />
        </div>
        <div className='row'>
          <label htmlFor='content'>Content</label>
          <textarea
            type='text'
            value={note.content}
            id='content'
            name='content'
            required
            rows='10'
            onChange={onChangeInput}
          />
        </div>
        <label htmlFor='date'>Date: {note.date}</label>
        <div className='row'>
          <input
            type='date'
            id='date'
            name='date'
            value={note.date}
            onChange={onChangeInput}
          />
        </div>
        <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default EditNote;
