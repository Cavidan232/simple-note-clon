import React, { useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Notes() {
  const api = "https://irradiated-silicon-antler.glitch.me/user"
  const [user, setUser] = useState(localStorage.getItem('currentUser2') ? JSON.parse(localStorage.getItem('currentUser2')) : null);
  const [notes, setNotes] = useState(user ? user.notes : []);
  const [deleteNotes, setDelete] = useState(user ? user.delete : []);
  const [favNotes, setFav] = useState(user ? user.fav : []);
  const [note, setNote] = useState('');
  const [view, setView] = useState('all');
  const navigate = useNavigate();
  if (!user) {
    navigate('/login'); 
  }

  useEffect(() => {
    if (user) {
      const updatedUser = { ...user, notes, delete: deleteNotes, fav: favNotes };
      localStorage.setItem('currentUser2', JSON.stringify(updatedUser));
    }
  }, [notes, deleteNotes, favNotes, user]);

  const addNote = () => {
    if (note.trim()) {
      const newNote = { id: Date.now(), content: note };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      axios.patch(`${api}/${user.id}`, { notes: updatedNotes })
        .then(response => {
          toast.success('Note added successfully!');
        })
        .catch(error => {
          toast.error('There was an error adding the note.');
        });
      setNote('');
    }
  };

  const deleteNote = (id) => {
    const noteToDelete = notes.find(note => note.id === id);
    const updatedNotes = notes.filter(note => note.id !== id);
    const updatedDeleteNotes = [...deleteNotes, noteToDelete];
    setNotes(updatedNotes);
    setDelete(updatedDeleteNotes);
    axios.patch(`${api}/${user.id}`, { notes: updatedNotes, delete: updatedDeleteNotes })
      .then(response => {
        toast.success('Note moved to deleted notes.');
      })
      .catch(error => {
        toast.error('There was an error deleting the note.');
      });
  };

  const addFav = (id) => {
    const favNote = notes.find(note => note.id === id);
    if (!favNotes.find(note => note.id === id)) {
      const updatedFavNotes = [...favNotes, favNote];
      setFav(updatedFavNotes);
      axios.patch(`${api}/${user.id}`, { fav: updatedFavNotes })
        .then(response => {
          toast.success("Note added to Favorites");
        })
        .catch(error => {
          toast.error("Error occurred while adding to Favorites");
        });
    } else {
      toast.info("Note is already in Favorites");
    }
  };

  const removeFav = (id) => {
    const updatedFavNotes = favNotes.filter(note => note.id !== id);
    setFav(updatedFavNotes);
    axios.patch(`${api}/${user.id}`, { fav: updatedFavNotes })
      .then(response => {
        toast.success('Note removed from Favorites.');
      })
      .catch(error => {
        toast.error('There was an error removing the note from Favorites.');
      });
  };

  const berpaNote = (id) => {
    const noteToUpdate = deleteNotes.find(note => note.id === id);
    const updatedDeleteNotes = deleteNotes.filter(note => note.id !== id);
    const updatedNotes = [...notes, noteToUpdate];
    setNotes(updatedNotes);
    setDelete(updatedDeleteNotes);
    axios.patch(`${api}/${user.id}`, { notes: updatedNotes, delete: updatedDeleteNotes })
      .then(response => {
        toast.success('Note restored successfully.');
      })
      .catch(error => {
        toast.error('There was an error restoring the note.');
      });
  };

  const deleteNotes2 = (id) => {
    const updatedDeleteNotes = deleteNotes.filter(note => note.id !== id);
    setDelete(updatedDeleteNotes);
    axios.patch(`${api}/${user.id}`, { delete: updatedDeleteNotes })
      .then(response => {
        toast.success('Note permanently deleted.');
      })
      .catch(error => {
        toast.error('There was an error permanently deleting the note.');
      });
  };


  const handleViewChange = (viewType) => {
    setView(viewType);
  };

  const filteredNotes = view === 'all' ? notes : view === 'fav' ? favNotes : deleteNotes;

  return (
    <div className="container flex flex-col md:flex-row p-6 bg-custom-dark min-h-screen">
      <ToastContainer />
      <div className="left w-full md:w-1/3 border-r border-gray-300 p-4">
        <h2 className="text-2xl font-semibold mb-4">Notes</h2>
        <div className="mb-4 flex flex-col items-center">
          <ReactQuill
            value={note}
            onChange={(value) => setNote(value)}
            placeholder="Add a new note..."
            className="react-quill-container flex-1 mb-2 text-white w-full"
            modules={{ toolbar: true }}
          />
          <button
            onClick={addNote}
            className="bg-blue-500 text-white p-2 rounded-md flex items-center"
          >
            <AiOutlinePlus className="mr-1" />
            Add Note
          </button>
        </div>
        <div className="mb-4 flex justify-around">
          <button
            onClick={() => handleViewChange('all')}
            className={`p-2 ${view === 'all' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-md`}
          >
            All Notes
          </button>
          <button
            onClick={() => handleViewChange('fav')}
            className={`p-2 ${view === 'fav' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-md`}
          >
            Favorite Notes
          </button>
          <button
            onClick={() => handleViewChange('deleted')}
            className={`p-2 ${view === 'deleted' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-md`}
          >
            Deleted Notes
          </button>
        </div>
        <ul className="list-none p-0">
          {filteredNotes.map(note => (
            <li key={note.id} className="p-2 mb-2 bg-gray-800 flex justify-between text-white rounded-md">
              <div className="note-content" dangerouslySetInnerHTML={{ __html: note.content }} />
              <div className='flex gap-3'>
                {view === 'all' && (
                  <>
                    <button onClick={() => deleteNote(note.id)} >
                      <FaTrash />
                    </button>
                    <button onClick={() => addFav(note.id)} >
                      <FaHeart />
                    </button>
                  </>
                )}
                {view === 'fav' && (
                  <button onClick={() => removeFav(note.id)} >
                    <FaTrash />
                  </button>
                )}
                {view === 'deleted' && (
                  <>
                    <button onClick={() => deleteNotes2(note.id)} >
                      <FaTrash />
                    </button>
                    <button onClick={() => berpaNote(note.id)} >
                      <GrUpdate />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="right w-full md:w-2/3 p-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Note Details</h2>
          <ReactQuill
            value={note}
            onChange={(value) => setNote(value)}
            className="react-quill-container w-full mb-4"
            modules={{ toolbar: true }}
          />
          <div className="flex mt-4">
            <button className="bg-green-500 text-white p-2 rounded-md mr-2 flex items-center">
              <AiOutlineEdit className="mr-1" />
              Edit
            </button>
            <button className="bg-red-500 text-white p-2 rounded-md flex items-center">
              <AiOutlineDelete className="mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
