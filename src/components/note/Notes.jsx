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
import NoteModal from './NoteModal';

function Notes() {
  const api = "https://agate-fishy-catsup.glitch.me/acounts";
  const [user, setUser] = useState(localStorage.getItem('currentUser2') ? JSON.parse(localStorage.getItem('currentUser2')) : null);
  const [notes, setNotes] = useState(user ? user.notes : []);
  const [deleteNotes, setDelete] = useState(user ? user.delete : []);
  const [favNotes, setFav] = useState(user ? user.fav : []);
  const [note, setNote] = useState('');
  const [view, setView] = useState('all');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const updatedUser = { ...user, notes, delete: deleteNotes, fav: favNotes };
      localStorage.setItem('currentUser2', JSON.stringify(updatedUser));
    }
  }, [notes, deleteNotes, favNotes, user, navigate]);

  const addNote = () => {
    if (note.trim()) {
      const newNote = { id: Date.now(), content: note };
      const updatedNotes = [newNote, ...notes]; // Son eklenen en üstte
      setNotes(updatedNotes);
      axios.patch(`${api}/${user.id}`, { notes: updatedNotes })
        .then(() => toast.success('Note added successfully!'))
        .catch(() => toast.error('There was an error adding the note.'));
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
      .then(() => toast.success('Note moved to deleted notes.'))
      .catch(() => toast.error('There was an error deleting the note.'));
  };

  const addFav = (id) => {
    const favNote = notes.find(note => note.id === id);
    if (!favNotes.find(note => note.id === id)) {
      const updatedFavNotes = [...favNotes, favNote];
      setFav(updatedFavNotes);
      axios.patch(`${api}/${user.id}`, { fav: updatedFavNotes })
        .then(() => toast.success("Note added to Favorites"))
        .catch(() => toast.error("Error occurred while adding to Favorites"));
    } else {
      toast.info("Note is already in Favorites");
    }
  };

  const removeFav = (id) => {
    const updatedFavNotes = favNotes.filter(note => note.id !== id);
    setFav(updatedFavNotes);
    axios.patch(`${api}/${user.id}`, { fav: updatedFavNotes })
      .then(() => toast.success('Note removed from Favorites.'))
      .catch(() => toast.error('There was an error removing the note from Favorites.'));
  };

  const restoreNote = (id) => {
    const noteToRestore = deleteNotes.find(note => note.id === id);
    const updatedDeleteNotes = deleteNotes.filter(note => note.id !== id);
    const updatedNotes = [noteToRestore, ...notes];
    setNotes(updatedNotes);
    setDelete(updatedDeleteNotes);
    axios.patch(`${api}/${user.id}`, { notes: updatedNotes, delete: updatedDeleteNotes })
      .then(() => toast.success('Note restored successfully.'))
      .catch(() => toast.error('There was an error restoring the note.'));
  };

  const deletePermanently = (id) => {
    const updatedDeleteNotes = deleteNotes.filter(note => note.id !== id);
    setDelete(updatedDeleteNotes);
    axios.patch(`${api}/${user.id}`, { delete: updatedDeleteNotes })
      .then(() => toast.success('Note permanently deleted.'))
      .catch(() => toast.error('There was an error permanently deleting the note.'));
  };

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

  const filteredNotes = view === 'all' ? notes : view === 'fav' ? favNotes : deleteNotes;

  const handleEditClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (content) => {
    const updatedNotes = notes.map(n => n.id === selectedNote.id ? { ...n, content } : n);
    setNotes(updatedNotes);
    axios.patch(`${api}/${user.id}`, { notes: updatedNotes })
      .then(() => toast.success('Note updated successfully!'))
      .catch(() => toast.error('There was an error updating the note.'));
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={selectedNote}
        onSave={handleSaveNote}
      />
      <div className="left w-full md:w-1/4 order-2 border-r border-gray-300 p-4">
     
        <div className="flex gap-4 mb-4">
          <button onClick={() => handleViewChange('all')} className="bg-blue-500 text-white p-2 rounded-md">All Notes</button>
          <button onClick={() => handleViewChange('fav')} className="bg-yellow-500 text-white p-2 rounded-md">Favorites</button>
          <button onClick={() => handleViewChange('delete')} className="bg-red-500 text-white p-2 rounded-md">Deleted Notes</button>
        </div>
        <div className="notes-list">
          {filteredNotes.length === 0 ? (
            <p>No notes available.</p>
          ) : (
            filteredNotes.map((note) => (
              <div key={note.id} className="note-item mb-4 p-4 bg-white shadow-md rounded-md border border-gray-200">
                <ReactQuill
                  value={note.content}
                  readOnly
                  theme="bubble"
                  className="mb-2"
                  style={{ backgroundColor: '#f4f4f4', color: '#333' }}
                />
                <div className="flex justify-between items-center">
                  <button onClick={() => handleEditClick(note)} className="text-blue-500">
                    <AiOutlineEdit />
                  </button>
                  {view === 'delete' ? (
                    <>
                      <button onClick={() => restoreNote(note.id)} className="text-green-500">
                        <GrUpdate />
                      </button>
                      <button onClick={() => deletePermanently(note.id)} className="text-red-500">
                        <FaTrash />
                      </button>
                    </>
                  ) : (
                    <>
                      {view === 'fav' ? (
                        <button onClick={() => removeFav(note.id)} className="text-red-500">
                          <FaHeart />
                        </button>
                      ) : (
                        <>
                          <button onClick={() => addFav(note.id)} className="text-yellow-500">
                            <FaHeart />
                          </button>
                          <button onClick={() => deleteNote(note.id)} className="text-red-500">
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="right w-full md:w-3/4 p-4">
      <h2 className="text-2xl font-semibold mb-4">Notes</h2>
        <div className="mb-4 order-1 flex flex-col items-center">
          <ReactQuill
            value={note}
            onChange={(value) => setNote(value)}
            placeholder="Add a new note..."
            className="react-quill-container flex-1 mb-2 text-black w-full bg-gray-100"
            modules={{ toolbar: true }}
            style={{ backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}
          />
          <button
            onClick={addNote}
            className="bg-blue-500 text-white p-2 rounded-md flex items-center"
          >
            <AiOutlinePlus className="mr-1" />
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notes;
