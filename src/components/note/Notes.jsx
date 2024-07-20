import React, { useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import axios from 'axios';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    if (newNote.trim()) {
      try {
        const response = await axios.post('http://localhost:3000/notes', { content: newNote });
        setNotes([...notes, response.data]);
        setNewNote('');
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
      setSelectedNote(null);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const updateNote = async (id, content) => {
    try {
      const response = await axios.put(`http://localhost:3000/notes/${id}`, { content });
      setNotes(notes.map(note => (note.id === id ? response.data : note)));
      setSelectedNote({ id, content });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  return (
    <div className="container flex flex-col md:flex-row p-6 bg-black-100 min-h-screen">
      <div className="left w-full md:w-1/3 border-r border-gray-300 p-4">
        <h2 className="text-2xl font-semibold mb-4">Notes</h2>
        <div className="mb-4 flex items-center">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note..."
            className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
          />
          <button
            onClick={addNote}
            className="bg-blue-500 text-white p-2 rounded-md flex items-center"
          >
            <AiOutlinePlus className="mr-1" />
            Add Note
          </button>
        </div>
        <ul className="list-none p-0">
          {notes.map(note => (
            <li
              key={note.id}
              onClick={() => handleNoteClick(note)}
              className="cursor-pointer p-2 mb-2 bg-white border border-gray-200 rounded-md flex justify-between items-center hover:bg-gray-50"
            >
              <span>{note.content.split('\n')[0]}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedNote(note)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <BiEdit />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="right w-full md:w-2/3 p-4">
        {selectedNote ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Note Details</h2>
            <textarea
              value={selectedNote.content}
              onChange={(e) => setSelectedNote({
                ...selectedNote,
                content: e.target.value
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="10"
            />
            <div className="flex mt-4">
              <button
                onClick={() => updateNote(selectedNote.id, selectedNote.content)}
                className="bg-green-500 text-white p-2 rounded-md mr-2 flex items-center"
              >
                <AiOutlineEdit className="mr-1" />
                {isEditing ? 'Save' : 'Edit'}
              </button>
              <button
                onClick={() => deleteNote(selectedNote.id)}
                className="bg-red-500 text-white p-2 rounded-md flex items-center"
              >
                <AiOutlineDelete className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-xl">Select a note to view or edit</div>
        )}
      </div>
    </div>
  );
}

export default Notes;
