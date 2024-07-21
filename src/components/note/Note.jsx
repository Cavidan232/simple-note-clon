// components/NoteModal.js
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteModal = ({ isOpen, onClose, note, onSave }) => {
  const [content, setContent] = useState(note ? note.content : '');

  const handleSave = () => {
    onSave(content);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md text-gray-950 w-full md:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Note</h2>
          <button onClick={onClose} className="text-gray-500">
            <AiOutlineClose />
          </button>
        </div>
        <ReactQuill
          value={content}
          onChange={setContent}
          className="w-full mb-4"
        />
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded-md mr-2">
            Save
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
