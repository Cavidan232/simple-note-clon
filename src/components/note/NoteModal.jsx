import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteModal = ({ isOpen, onClose, note, onSave }) => {
  const [content, setContent] = useState(note ? note.content : '');

  useEffect(() => {
    if (note) {
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    onSave(content);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-3/4 md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
        <ReactQuill
          value={content}
          onChange={(value) => setContent(value)}
          placeholder="Edit your note..."
          className="react-quill-container mb-4"
          modules={{ toolbar: true }}
          style={{ backgroundColor: '#fff', color: '#000' }}
        />
        <div className="flex justify-end gap-2">
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded-md">Save</button>
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
