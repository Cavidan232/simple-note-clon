import React from 'react';

function Note({ note, onDelete, onEdit }) {
  return (
    <div className="bg-custom-light p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{note.title}</h2>
        <div>
          <button
            onClick={() => onEdit(note)}
            className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm hover:bg-blue-700 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="bg-red-600 text-white px-2 py-1 rounded-md text-sm hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="mt-2">{note.content}</p>
    </div>
  );
}

export default Note;
