import React, { useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Notes() {

const [notes,setNotes]=useState([]);
const [note,setNote]=useState()
const addNote = () => {
  if (note.trim()) {
    setNotes(prevNotes => [...prevNotes, { id: Date.now(), content: note }]);
    setNote(''); // Notu ekledikten sonra temizleyin
  }
};
console.log(notes)
  return (
    <div className="container flex flex-col md:flex-row p-6 bg-custom-dark min-h-screen">
      <div className="left w-full md:w-1/3 border-r border-gray-300 p-4">
        <h2 className="text-2xl font-semibold mb-4">Notes</h2>
        <div className="mb-4 flex items-center">
          <ReactQuill
            value={note}
            onChange={(value) => setNote(value)}
            placeholder="Add a new note.."
            className="flex-1 mb-2 text-white"
          />
          <button
              onClick={addNote}
            className="bg-blue-500 text-white p-2 rounded-md flex items-center"
          >
            <AiOutlinePlus className="mr-1"  />
            Add Note
          </button>
        </div>
        <ul className="list-none p-0">
         
        </ul>
      </div>
      <div className="right w-full md:w-2/3 p-4">
     
          <div>
            <h2 className="text-2xl font-semibold mb-4">Note Details</h2>
            <ReactQuill
                     value={note}
                     onChange={(value) => setNote(value)}
              className="w-full mb-4"
            />
            <div className="flex mt-4">
              <button
                className="bg-green-500 text-white p-2 rounded-md mr-2 flex items-center"
              >
                <AiOutlineEdit className="mr-1" />
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-md flex items-center"
              >
                <AiOutlineDelete className="mr-1" />
                delete
              </button>
            </div>
          </div>

      </div>
    </div>
  );
}

export default Notes;
